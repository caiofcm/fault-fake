// import { observer } from 'mobx-react';
import { observable, computed, decorate, autorun } from "mobx"
// import mobx from "mobx"
import { constantFault, processData, computeTableData, getHigherId, createConstantSignal, randn_bm, UUIDgeneration } from "../utils/utils";
import { action, toJS } from "mobx"
import axios from 'axios';

const LEN = 50
const randomArray = (length, max) => [...new Array(length)]
  .map(() => (Math.random() * max));

const dataInitial = [
  { tag: 'tag1', values: randomArray(LEN, 10.0), id: 1, faultAdded: false },
  { tag: 'tag2', values: randomArray(LEN, 3.0), id: 2, faultAdded: false },
  { tag: 'tag3', values: randomArray(LEN, 1.0), id: 3, faultAdded: false },
]

class GBNStore {
  low_value = -1
  upp_value = 10
  prob_change = 0.95
  min_constant = 5

  handleModifyValue = (e) => {
    let val
    if (e.target.name === 'min_constant') {
      val = parseInt(e.target.value)
    }
    else {
      val = parseFloat(e.target.value)
    }
    this[e.target.name] = val
  }

}

decorate(GBNStore, {
  low_value: observable,
  upp_value: observable,
  prob_change: observable,
  min_constant: observable,
  handleModifyValue: action,
})

// The idea was to add a small Store for each type of fault, such that its state can be represented accordingly
// Thus, todo is to create a list of store, check if this is ok... they would be the possible ones
// Also faultConfig would refer to it...

class DataStore {
  series = dataInitial
  appendImportedSeries = false
  faultType = ''
  faultConfig = { value: 0 }
  numberPointsCreation = 50
  tagCreation = ''
  noiseStd = 0
  currFaultConfig = {}
  faultStores = { gbn: new GBNStore() }


  constructor() {
    autorun(() => console.log('AutoRun called'))
  }

  //--------------------
  // Import Data
  //--------------------
  importSeriesFromFile = (e) => {
    console.log(e)
    const content = e.currentTarget.result
    const dataLoaded = processData(content)
    if (this.appendImportedSeries) {
      const last_id = this.series[this.series.length - 1].id
      const dataMod = dataLoaded.map((v, idx) => {
        let mod_v = v
        mod_v.id = last_id + idx + 1
        return mod_v
      })
      this.series = this.series.concat(dataMod)
    }
    else {
      this.series = dataLoaded
    }
  }

  handleAppendImportedSeries = (e) => {
    this.appendImportedSeries = e.target.checked
  }

  //--------------------
  // Table
  //--------------------
  get formattedTableData() {
    return this.series.map((v) => computeTableData(v))
  }
  handleDeleteTableClick = (selected) => {
    selected.forEach(el => {
      const idx_rm = this.series.findIndex(v => v.id === el)
      this.series.splice(idx_rm, 1)
    })
    console.log(selected)
    // selected should be a observable
  }

  //--------------------
  // Edit Form
  //--------------------
  handleEditFaultWithBounds = (id, bounds) => {
    const index = this.series.findIndex(v => v.id === id)
    let signal
    switch (this.faultType) {
      case 'constant':
        signal = constantFault({
          serie: this.series[index],
          faultConfig: this.faultConfig,
          bounds
        })
        break;

      default:
        break;
    }
    this.series[index].values = signal
    this.series[index].faultAdded = 'Yes'
  }

  //--------------------
  // Fault Creation
  //--------------------
  handleFaultTypeSelection = (event) => {
    console.log(event);
    this.faultType = event.target.value
    console.log(this.faultType)
  }
  handleFaultConfig = (faultCfg) => {
    this.faultConfig = faultCfg
  }
  handleSignalCreation = () => {
    console.log(this.faultConfig)
    let signal

    this.validateNumberOfPoints()

    switch (this.faultType) {
      case 'constant':
        signal = createConstantSignal({
          faultConfig: this.faultConfig,
          numPoints: this.numberPointsCreation
        })
        this.addNoise(signal)
        const serie = this.createNewSerieObject(signal)
        this.series.push(serie)
        break;
      case 'gbn':
        signal = this.handleGBNCreation()
        break
      default:
        break
    }



    // const noiseStd_ = parseFloat(this.noiseStd)
    // if (noiseStd_ > 0) {
    //   signal.forEach((o, i, a) =>
    //     a[i] = a[i] + noiseStd_ * randn_bm()
    //   )
    // }


    // if (this.tagCreation.trim() === '') {
    //   this.tagCreation = `tag-${getHigherId(this.series) + 1}`
    // }
    // const serie = {
    //   tag: this.tagCreation,
    //   values: signal,
    //   id: getHigherId(this.series) + 1,
    //   faultAdded: false,
    // }
    // this.series.push(serie)
  }

  validateNumberOfPoints = () => {
    this.numberPointsCreation = parseInt(this.numberPointsCreation)
    if (!Number.isInteger(this.numberPointsCreation)) {
      this.numberPointsCreation = 50
    }
  }

  addNoise = (signal) => {
    const noiseStd_ = parseFloat(this.noiseStd)
    if (noiseStd_ > 0) {
      signal.forEach((o, i, a) =>
        a[i] = a[i] + noiseStd_ * randn_bm()
      )
    }
  }

  createNewSerieObject = (signal) => {
    if (this.tagCreation.trim() === '') {
      this.tagCreation = `tag-${getHigherId(this.series) + 1}`
    }
    const serie = {
      tag: this.tagCreation,
      values: signal,
      id: getHigherId(this.series) + 1,
      faultAdded: false,
    }
    return serie
  }

  handleNumberPointsCreation = (e) => {
    this.numberPointsCreation = e.target.value
  }

  handleTagCreation = (e) => {
    this.tagCreation = e.target.value
  }

  handleNoiseAddition = (e) => {
    this.noiseStd = e.target.value
  }




  //--------------------
  // Communication with Python
  //--------------------
  apiRPCComm = (method, params, resolve_cb, error_cb) => {
    const url = 'http://localhost:5000/api'
    axios.post(url, {
      jsonrpc: "2.0",
      method: method,
      params: params,
      id: UUIDgeneration(),
    })
      .then(function (response) {
        resolve_cb(response.data)
      })
      .catch(function (error) {
        error_cb(error)
      })
  }
  handleGBNCreation = () => {
    const params = {
      tspan: Array(this.numberPointsCreation).fill(0).map((v, i) => i),
      low: [this.faultStores.gbn.low_value],
      upp: [this.faultStores.gbn.upp_value],
      prob: [this.faultStores.gbn.prob_change],
      min_const: [this.faultStores.gbn.min_constant],
    }
    this.apiRPCComm('Signal.gbn', params, this.cbSignalCreated, console.log)
  }
  cbSignalCreated = (signalRaw) => {
    const signal = signalRaw.map(v => v[0])
    console.log(signal)
    this.addNoise(signal)
    const serie = this.createNewSerieObject(signal)
    this.series.push(serie)
  }



}

decorate(DataStore, {
  series: observable,
  author: observable,
  handleEditBut: action,
  importDataFromFile: action,
  formattedTableData: computed,
  faultType: observable,
  faultConfig: observable,
  handleFaultTypeSelection: action,
  handleFaultConfig: action,
  numberPointsCreation: observable,
  tagCreation: observable,
  handleNumberPointsCreation: action,
  handleTagCreation: action,
  noiseStd: observable,
  handleNoiseAddition: action,
  currFaultConfig: observable,
})


const observableDataStore = new DataStore();
export default observableDataStore

window.dataStore = observableDataStore

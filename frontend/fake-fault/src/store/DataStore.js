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

class DataStore {
  series = dataInitial
  appendImportedSeries = false
  faultType = ''
  faultConfig = { value: 0 }
  numberPointsCreation = 50
  tagCreation = ''
  noiseStd = 0


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
    let num_points = parseInt(this.numberPointsCreation)
    if (!Number.isInteger(num_points)) {
      num_points = 50
      this.numberPointsCreation = num_points
    }

    switch (this.faultType) {
      case 'constant':
        signal = createConstantSignal({
          faultConfig: this.faultConfig,
          numPoints: num_points
        })
        break;
      case 'gbn':
        signal = this.handleGBNCreation()
        break
      default:
        break
    }

    const noiseStd_ = parseFloat(this.noiseStd)
    if (noiseStd_ > 0) {
      signal.forEach((o, i, a) =>
        a[i] = a[i] + noiseStd_ * randn_bm()
      )
    }


    if (this.tagCreation.trim() === '') {
      this.tagCreation = `tag-${getHigherId(this.series) + 1}`
    }
    const serie = {
      tag: this.tagCreation,
      values: signal,
      id: getHigherId(this.series) + 1,
      faultAdded: false,
    }
    this.series.push(serie)
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
    const paramsTest = {
      tspan: [1, 3, 4, 5, 6],
      low: [-1],
      upp: [1],
      prob: [0.95],
      min_const: [0],
    }
    this.apiRPCComm('Signal.gbn', paramsTest, this.cbSignalCreated, console.log)
  }
  cbSignalCreated = (signal) => {

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
})


const observableDataStore = new DataStore();
export default observableDataStore

window.dataStore = observableDataStore

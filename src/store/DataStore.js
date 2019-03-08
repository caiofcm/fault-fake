// import { observer } from 'mobx-react';
import { observable, computed, decorate, autorun } from "mobx"
// import mobx from "mobx"
import { constantFault, processData, computeTableData, getHigherId, createConstantSignal, randn_bm, UUIDgeneration } from "../utils/utils";
import { action } from "mobx"
import axios from 'axios';

const URL_SIGNAL_CREATION = 'https://us-central1-cm-signal-generator.cloudfunctions.net/signal_gen_http'
// const URL_SIGNAL_CREATION = 'http://localhost:5000/api'
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

class RandomWalkStore {
  start_val = -1
  prob_down = 0.2
  prob_up = 0.7
  amplitude = 5

  handleModifyValue = (e) => {
    const  val = parseFloat(e.target.value)
    this[e.target.name] = val
  }
}
decorate(RandomWalkStore, {
  start_val: observable,
  prob_down: observable,
  prob_up: observable,
  amplitude: observable,
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
  faultStores = {
    gbn: new GBNStore(),
    randomWalk: new RandomWalkStore()
  }
  signal_generating_status = {
    open_snack_bar: false,
    loading: false,
    // created_successfully: false,
    message: '',
  }


  constructor() {
    autorun(() => console.log('AutoRun called'))
  }

  //--------------------
  // Import Data
  //--------------------
  importSeriesFromFile = (e) => {
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
    // selected should be a observable
  }

  //--------------------
  // Edit Form
  //--------------------
  handleEditFaultWithBounds = (id, bounds) => {
    const index = this.series.findIndex(v => v.id === id)
    const num_points = bounds.uppBound - bounds.lowBound + 1
    let signal

    // Create a snackbar
    this.signal_generating_status.open_snack_bar = true
    this.signal_generating_status.loading = true
    this.signal_generating_status.message = 'Creating signal type: ' + this.faultType

    switch (this.faultType) {
      case 'constant':
        signal = constantFault({
          serie: this.series[index],
          faultConfig: this.faultConfig,
          bounds
        })
        this.series[index].values = signal
        this.afterCreationSnackBarUpdate()
        break;
      case 'gbn':
        this.handleGBNCreation(num_points, (raw) => this.cbSignalCreatedToEditFault(raw, index, bounds), console.log)
        break
      case 'randomwalk':
        this.handleRandomWalkCreation(num_points, (raw) => this.cbSignalCreatedToEditFault(raw, index, bounds), console.log)
        break
      default:
        break;
    }
    this.series[index].faultAdded = 'Yes'
  }

  //--------------------
  // Fault Creation
  //--------------------
  handleFaultTypeSelection = (event) => {
    this.faultType = event.target.value
  }
  handleFaultConfig = (faultCfg) => {
    this.faultConfig = faultCfg
  }
  handleSignalCreation = () => {
    let signal

    this.validateNumberOfPoints()

    // Create a snackbar
    this.signal_generating_status.open_snack_bar = true
    this.signal_generating_status.loading = true
    this.signal_generating_status.message = 'Creating signal type: ' + this.faultType

    switch (this.faultType.toLowerCase()) {
      case 'constant':
        signal = createConstantSignal({
          faultConfig: this.faultConfig,
          numPoints: this.numberPointsCreation
        })
        this.addNoise(signal)
        const serie = this.createNewSerieObject(signal)
        this.series.push(serie)
        this.afterCreationSnackBarUpdate()
        break;
      case 'gbn':
        signal = this.handleGBNCreation(this.numberPointsCreation, this.cbSignalCreated, console.log)
        break
      case 'randomwalk':
        signal = this.handleRandomWalkCreation(this.numberPointsCreation, this.cbSignalCreated, console.log)
        break
      default:
        break
    }
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

    // Update tag name for possible next addition
    this.tagCreation = `tag-${serie.id + 1}`

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

  // Fault Editing:

  // Editing for GBN:
  // editGBNSignal = (index, bounds) => {
  //   const num_points = bounds.uppBound - bounds.lowBound + 1
  //   this.handleGBNCreation(num_points, (raw) => this.cbSignalCreatedToEditFault(raw, index, bounds), console.log)
  // }

  cbSignalCreatedToEditFault = (signalRaw, index, bounds) => {
    const signal = signalRaw.map(v => v[0])
    const serie = this.series[index]
    const serieMod = serie.values.map((v, i) => {
      return (i >= bounds.lowBound && i <= bounds.uppBound) ?
        signal[i - bounds.lowBound] : v
    })
    serie.faultAdded = 'Yes'
    serie.values = serieMod
    this.afterCreationSnackBarUpdate()
  }




  //--------------------
  // Communication with Python
  //--------------------
  apiRPCComm = (method, params, resolve_cb, error_cb) => {
    const url = URL_SIGNAL_CREATION //'http://localhost:5000/api'
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

  handleGBNCreation = (number_points, cb_resolved, cb_error) => {
    const tspan = Array(number_points).fill(0).map((v, i) => i)
    const params_inner = {
      low_value: [this.faultStores.gbn.low_value],
      upp_value: [this.faultStores.gbn.upp_value],
      prob_change: [this.faultStores.gbn.prob_change],
      min_constant: [this.faultStores.gbn.min_constant],
    }
    const params = {
       'tspan': tspan,
       'type_serie': 'gbn',
       'params': params_inner,
    }
    this.apiRPCComm('Signal.create_signal', params, cb_resolved, cb_error)
  }

  cbSignalCreated = (signalRaw) => {
    const signal = signalRaw.map(v => v[0])
    this.addNoise(signal)
    const serie = this.createNewSerieObject(signal)
    this.series.push(serie)
    // this.is_generating_serie = false
    // this.is_signal_created_successfully = true
    this.afterCreationSnackBarUpdate();
  }

  handleRandomWalkCreation = (number_points, cb_resolved, cb_error) => {
    const tspan = Array(number_points).fill(0).map((v, i) => i)
    const params_inner = {
      start_val: [this.faultStores.randomWalk.start_val],
      prob_down: [this.faultStores.randomWalk.prob_down],
      prob_up: [this.faultStores.randomWalk.prob_up],
      amplitude: [this.faultStores.randomWalk.amplitude],
    }
    const params = {
      'tspan': tspan,
      'type_serie': 'random_walk',
      'params': params_inner,
    }
    this.apiRPCComm('Signal.create_signal', params, cb_resolved, cb_error)
    // this.apiRPCComm('Signal.create_signal', params, this.cbSignalCreated, console.log)
  }

  //--------------------------------------------
  //	Snackbar control
  //--------------------------------------------
  handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      // console.log('clicked snackbar close clickaway')
      return;
    }
    // console.log('clicked snackbar close close')
    this.signal_generating_status.open_snack_bar = false  //({ open: false });
  }


  afterCreationSnackBarUpdate() {
    this.signal_generating_status.open_snack_bar = false;
    this.signal_generating_status.open_snack_bar = true;
    this.signal_generating_status.loading = false;
    this.signal_generating_status.message = 'Signal Created!';
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
  signal_generating_status: observable,
  // is_signal_created_successfully: observable,
})


const observableDataStore = new DataStore();
export default observableDataStore

window.dataStore = observableDataStore

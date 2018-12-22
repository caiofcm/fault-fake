import { observable, computed, decorate, autorun, runInAction, action } from "mobx"
import { UUIDgeneration } from "../utils/utils"
import axios from 'axios'

//############################################
//###########################################
//
//
//	COMM WITH PYTHON BY RPC
//
//
//###########################################
//###########################################

const apiRPCComm = (method, params) => {
  const url = 'http://localhost:5000/api'
  return axios.post(url, {
    jsonrpc: "2.0",
    method: method,
    params: params,
    id: UUIDgeneration(),
  })
}


//############################################
//###########################################
//
//
//	GBN STORE
//
//
//###########################################
//###########################################

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

  rpc = (number_points) => {
    const tspan = Array(number_points).fill(0).map((v, i) => i)
    const params_inner = {
      low_value: [this.low_value],
      upp_value: [this.upp_value],
      prob_change: [this.prob_change],
      min_constant: [this.min_constant],
    }
    const params = {
      'tspan': tspan,
      'type_serie': 'gbn',
      'params': params_inner,
    }
    return apiRPCComm('Signal.create_signal', params)
  }
}
decorate(GBNStore, {
  low_value: observable,
  upp_value: observable,
  prob_change: observable,
  min_constant: observable,
  handleModifyValue: action,
  rpc: action,
})

//############################################
//###########################################
//
//
//	RANDOM WALK STORE
//
//
//###########################################
//###########################################

class RandomWalkStore {
  start_val = -1
  prob_down = 0.2
  prob_up = 0.7
  amplitude = 5

  handleModifyValue = (e) => {
    const val = parseFloat(e.target.value)
    this[e.target.name] = val
  }

  rpc = (num_points) => {
    const tspan = Array(num_points).fill(0).map((v, i) => i)
    const params_inner = {
      start_val: [this.start_val],
      prob_down: [this.prob_down],
      prob_up: [this.prob_up],
      amplitude: [this.amplitude],
    }
    const params = {
      'tspan': tspan,
      'type_serie': 'random_walk',
      'params': params_inner,
    }
    return apiRPCComm('Signal.create_signal', params)
  }

}
decorate(RandomWalkStore, {
  start_val: observable,
  prob_down: observable,
  prob_up: observable,
  amplitude: observable,
  handleModifyValue: action,
  rpc: action,
})


//############################################
//###########################################
//
//
//	RAMP STORE
//
//
//###########################################
//###########################################

class RampStore {
  start_vals = 0.0
  final_vals = 10.0

  handleModifyValue = (e) => {
    const val = parseFloat(e.target.value)
    this[e.target.name] = val
  }

  rpc = (num_points) => {
    const tspan = Array(num_points).fill(0).map((v, i) => i)
    const params_inner = {
      start_vals: [this.start_vals],
      final_vals: [this.final_vals],
    }
    const params = {
      'tspan': tspan,
      'type_serie': 'ramp',
      'params': params_inner,
    }
    return apiRPCComm('Signal.create_signal', params)
  }

}
decorate(RampStore, {
  start_vals: observable,
  final_vals: observable,
  rpc: action,
})






//--------------------------------------------
//	EXPORTING
//--------------------------------------------

export {
  GBNStore,
  RandomWalkStore,
  RampStore,
}

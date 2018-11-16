import React, { Component } from 'react';
import Dashboard from './Dashboard'
import loadData from '../data-provider/data-provider';

function constantFault(inputs) {
  const { serie, faultConfig, bounds } = inputs
  const value = faultConfig.value
  // const serieMod = [...serie]
  // serieMod[bounds.lowBound]
  console.log(bounds, value)
  const serieMod = serie.values.map((v, i) => {
      return (i >= bounds.lowBound && i <= bounds.uppBound) ?
              value : v
  })
  return serieMod
}

class Manager extends Component {

  state = {
    data: loadData()
  }

  handleEditBut = (e, id, faultConfig, bounds, faultType) => {
    const serie = this.state.data.filter(v => v.id === id)[0]

    let signal
    switch (faultType) {
      case 'constant':
        signal = constantFault({serie, faultConfig, bounds})
        break;

      default:
        break;
    }

    let data = [...this.state.data]
    const index = data.findIndex(v => v.id === id)
    let serieMod = {...data[index]}
    serieMod.values = signal
    data[index] = serieMod
    this.setState({ data })

    console.log(serieMod)
    console.log(signal)
    console.log(index)
    console.log(this.state.data[index])
  }

  render() {
    return (
      <Dashboard
        data={this.state.data}
        handleEditBut={this.handleEditBut}
      ></Dashboard>
    );
  }
}

export default Manager;

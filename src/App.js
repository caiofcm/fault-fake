import React, { Component } from 'react';
import Dashboard from './containers/Dashboard'
// import loadData from './data-provider/data-provider';
import { observer, inject } from 'mobx-react'
// import { constantFault } from './utils/utils'


class App extends Component {

  render() {
    // const series = this.props.store.series
    return (
      <Dashboard
      ></Dashboard>
    )
  }
}

export default inject("store")(observer(App))

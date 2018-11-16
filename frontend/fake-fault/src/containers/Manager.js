import React, { Component } from 'react';
import Dashboard from './Dashboard'
import loadData from '../data-provider/data-provider';

class Manager extends Component {

  state = {
    data: loadData()  
  }

  render() {
    return (
      <Dashboard data={this.state.data}></Dashboard>
    );
  }
}

export default Manager;

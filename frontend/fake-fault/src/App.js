import React, { Component } from 'react';
import Manager from './containers/Manager'
import { BrowserRouter } from "react-router-dom"

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Manager></Manager>
      </BrowserRouter>
    );
  }
}

export default App;

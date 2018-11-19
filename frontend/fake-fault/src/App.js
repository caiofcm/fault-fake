import React, { Component } from 'react';
import Manager from './containers/Manager'
import { observer, inject } from 'mobx-react'

class App extends Component {
  render() {
    return (
      // <BrowserRouter>
        <Manager></Manager>
        // <h3>Oi</h3>
      // </BrowserRouter>
      // <Provider {...stores}>
      //   <BrowserRouter history={history}>
      //     {/* <Table ></Table> */}
      //     <Manager></Manager>
      //   </BrowserRouter >
      // </Provider>
    )
  }
}

// export default App;
export default inject("store", "routing")(observer(App))

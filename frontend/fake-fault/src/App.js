import React, { Component } from 'react'
import observableDataStore from "./store/DataStore"
import { Provider, observer, Observer } from 'mobx-react'
import Manager from './containers/Manager'
import { BrowserRouter } from "react-router-dom"

import Table from "./TryMobxFuck/Table"
import Row from "./TryMobxFuck/Row"
import { appStore } from "./TryMobxFuck/Store"
import { Route, Switch, Redirect } from "react-router-dom"

// const TableObs = () => (
//   <Observer
//     inject={stores => ({ store: appStore })}
//     render={Table}
//   />
// )

const App = observer(
  class App extends Component {
    render() {
      return (
        // <BrowserRouter >
        //   <Provider store={observableDataStore}>
        //     <div>
        //     <Manager ></Manager>
        //     <button onClick={()=> console.log(this.props)}>Debug</button>
        //     </div>
        //   </Provider>
        // </BrowserRouter>



        (
          <BrowserRouter >
            <Provider store={appStore}>
              {/* <Table ></Table> */}
            <Switch>
                <Route path='/home' exact component={Table} />
              <Route path='/row' exact component={Row} />
              <Redirect from="/" to="/home" />
            </Switch>
            </Provider>
          </BrowserRouter >
        )

      );
    }
  }
)

export default App

// {/* <div store={observableDataStore}>
//           <button onClick={()=> console.log(this.props)}>Debug</button>
// </div> */}

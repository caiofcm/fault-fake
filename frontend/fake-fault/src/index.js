import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import { Router } from 'react-router'
// import createBrowserHistory from 'history/createBrowserHistory'
// import { RouterStore, syncHistoryWithStore } from 'mobx-react-router'
import dataStore from './store/DataStore'
import { Provider } from 'mobx-react'
import { RouterStore, startRouter } from 'mobx-router'
import views from './config/views'
// import { configure } from "mobx"

// issue with router? Check how to configure for particular store
// configure({ enforceActions: 'observed' })
const stores = {
  // Key can be whatever you want
  router: new RouterStore(),
  store: dataStore,
  // ...other stores
}

startRouter(views, stores)


ReactDOM.render((
  <Provider store={stores}>
    {/* <MobxRouter> */}
      <App />
    {/* </MobxRouter> */}
  </Provider>
),
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

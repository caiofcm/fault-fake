import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Router } from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router'
import dataStore from './store/DataStore'
import { Provider, observer } from 'mobx-react'


const browserHistory = createBrowserHistory();
const routingStore = new RouterStore()

const stores = {
  // Key can be whatever you want
  routing: routingStore,
  store: dataStore,
  // ...other stores
}

const history = syncHistoryWithStore(browserHistory, routingStore)


ReactDOM.render((
  <Provider {...stores}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
),
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

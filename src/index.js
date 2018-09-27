import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ItemPage from './modules/Connected animation with ReactMotion and Redux/ItemPage';
import registerServiceWorker from './registerServiceWorker';

// router
import Router from 'react-router-dom/BrowserRouter';
import Route from 'react-router-dom/Route';
//import { Router, Route } from 'react-router-dom'

// react redux
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import reducers from './modules/reducer';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import createRoutes from './routes';

import './index.css';

const store = createStore(
  combineReducers({
    reducers
  })
)

// Create an enhanced history that syncs navigation events with the store
//const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Route path="/:filter?" component={App}>
            </Route> 
        </Router> 
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();

export default store;

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// router
import Router from 'react-router-dom/BrowserRouter';
import Route from 'react-router-dom/Route';

// react redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './modules/reducer';

import './index.css';

let store = createStore(reducers)

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Route path="/:filter?" component={App} />
        </Router> 
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();

export default store;

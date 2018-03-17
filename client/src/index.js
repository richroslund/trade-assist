import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './configureStore';

let { store } = configureStore();

ReactDOM.render(
    <App store={store}>
    </App>,
    document.getElementById('root')
);

registerServiceWorker();

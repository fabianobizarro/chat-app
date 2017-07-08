import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { compose, createStore } from 'redux'
import reducers from './reducers';


import '../node_modules/bulma/bulma.sass'
import '../node_modules/animate.css/animate.min.css'
import App from './components/App/App';

import { loadState, savestate } from './localStorage';

const store = createStore(reducers, loadState());

store.subscribe(() => {
    savestate(store.getState());
});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
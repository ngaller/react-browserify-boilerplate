import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { setFromQuantity, selectFromUnit, selectToUnit } from './actions';
import reducer from './reducers.js';
import App from './components/App.jsx';

let store = createStore(reducer);
store.subscribe(() => {
    console.log('new state', store.getState());
});

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('main'));

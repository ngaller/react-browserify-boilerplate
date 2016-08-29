//import { combineReducers } from 'redux';

import { INCREMENT_COUNT } from './actions';

export default (state, action) => {
    if(!state) {
        state = {
            counter: 0
        };
    }
    switch(action.type) {
        case INCREMENT_COUNT:
            state = Object.assign({}, state, { counter: state.counter + 1 });
            break;
    }
    return state;
};

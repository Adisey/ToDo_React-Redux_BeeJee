// Core
import { Map } from 'immutable';
// Types
import { type } from './types';

const initalState = Map({
    isSpining: false,
});

export const uiReducer = (state = initalState, action) => {
    switch (action.type) {
        case type.START_SPINING:
            return state.set('isSpining', true);

        case type.STOP_SPINING:
            return state.set('isSpining', false);

        default:
            return state;
    }
};

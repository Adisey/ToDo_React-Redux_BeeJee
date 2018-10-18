// Core
import { Map } from 'immutable';
// Types
import { type } from './types';

const initalState = Map({
    isAuthenticated: false,
});

export const authReducer = (state = initalState, action) => {
    switch (action.type) {
        case type.LOGIN:
            return state.set('isAuthenticated', true);
        case type.LOGOUT:
            return state.set('isAuthenticated', false);
        default:
            return state;
    }
};

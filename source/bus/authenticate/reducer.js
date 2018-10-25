// Core
import { Map } from 'immutable';
// Types
import { type } from './types';

const initalState = Map({
    isAuthenticated: false,
});

export const authenticateReducer = (state = initalState, action) => {
    switch (action.type) {
        case type.LOGIN:
            return state.set('isAuthenticated', true).set('isDraverLogin', false);

        case type.LOGOUT:
            return state.set('isAuthenticated', false).set('isDraverLogin', false);

        case type.SHOW_DRAWER_LOGIN:
            return state.set('isDraverLogin', true);

        case type.HIDE_DRAWER_LOGIN:
            return state.set('isDraverLogin', false);

        default:
            return state;
    }
};

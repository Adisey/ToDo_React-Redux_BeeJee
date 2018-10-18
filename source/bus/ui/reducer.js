// Core
import { Map } from 'immutable';
// Types
import { type } from './types';

const initalState = Map ({
    isFetching: false,
    isOnline: false,
});

export const uiReducer = (state = initalState, action) => {
    switch (action.type) {
        case type.START_FETCHING:
            return state.set ('isFetching', true);

        case type.STOP_FETCHING:
            return state.set ('isFetching', false);

        default:
            return state;
    }
};

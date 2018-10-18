// Core
import { combineReducers } from 'redux';

// Reducers
import { authReducer as auth } from '../bus/authenticate/reducer';

export const rootReducer = combineReducers({
    auth,
});

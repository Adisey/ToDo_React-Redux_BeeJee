// Core
import { combineReducers } from 'redux';

// Reducers
import { authenticateReducer as authenticate } from '../bus/authenticate/reducer';

export const rootReducer = combineReducers({
    authenticate,
});

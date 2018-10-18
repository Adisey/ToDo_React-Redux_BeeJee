// Core
import { combineReducers } from 'redux';

// Reducers
import { authenticateReducer as authenticate } from '../bus/authenticate/reducer';
import { tasksReducer as tasks } from '../bus/tasks/reducer';

export const rootReducer = combineReducers({
    authenticate,
    tasks,
});

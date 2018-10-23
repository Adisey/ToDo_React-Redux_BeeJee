// Core
import { put } from 'redux-saga/effects';
// Actions
import { tasksActions } from '../../actions';

export function* setSortOrder ({payload: sortOrder}) {
    yield put(tasksActions.sortOrderTask(sortOrder));
    yield put(tasksActions.fetchTasksAsync());
}

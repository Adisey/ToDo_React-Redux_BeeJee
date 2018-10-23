// Core
import { put } from 'redux-saga/effects';
// Actions
import { tasksActions } from '../../actions';

export function* setPage ({payload: page}) {
    yield put(tasksActions.setPage(page));
    yield put(tasksActions.fetchTasksAsync());
}

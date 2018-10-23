// Core
import { put } from 'redux-saga/effects';
// Actions
import { tasksActions } from '../../actions';

export function* setSort ({payload: order}) {
    yield put(tasksActions.sortTask(order));
    yield put(tasksActions.fetchTasksAsync());
}

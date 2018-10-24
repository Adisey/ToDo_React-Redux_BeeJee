// Core
import { takeEvery, all, call } from 'redux-saga/effects';

// Types
import { type } from '../types';

// Workers
import { createTask, fillTasks, setPage, setSort, setSortOrder, updateTask } from './workers';

function* watcherFillTasks () {
    yield takeEvery(type.FETCH_TASKS_ASYNC, fillTasks);
}
function* watcherCreateTask () {
    yield takeEvery(type.CREATE_TASK_ASYNC, createTask);
}
function* watcherUpdateTask () {
    yield takeEvery(type.UPDATE_TASK_ASYNC, updateTask);
}
function* watcherSetPage () {
    yield takeEvery(type.CHANGE_PAGE_ASYNC, setPage);
}
function* watcherSetSort () {
    yield takeEvery(type.SORT_TASK_ASYNC, setSort);
}
function* watcherSetSortOrder () {
    yield takeEvery(type.SORT_ORDER_TASK_ASYNC, setSortOrder);
}
export function* watcherTasks () {
    yield all([
        call(watcherFillTasks),
        call(watcherCreateTask),
        call(watcherUpdateTask),
        call(watcherSetPage),
        call(watcherSetSort),
        call(watcherSetSortOrder),
    ]);
}

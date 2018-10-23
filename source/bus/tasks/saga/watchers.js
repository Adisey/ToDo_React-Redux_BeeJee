// Core
import { takeEvery, all, call } from 'redux-saga/effects';

// Types
import { type } from '../types';

// Workers
import { createTask, fillTasks, completeTask, changeTask, setPage, setSort, setSortOrder } from './workers';

function* watcherFillTasks () {
    yield takeEvery(type.FETCH_TASKS_ASYNC, fillTasks);
}
function* watcherCreateTask () {
    yield takeEvery(type.CREATE_TASK_ASYNC, createTask);
}
function* watcherCompleteTask () {
    yield takeEvery(type.COMPLETE_TASK_ASYNC, completeTask);
}
function* watcherChangeTask () {
    yield takeEvery(type.CHANGE_TASK_ASYNC, changeTask);
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
        call(watcherCompleteTask),
        call(watcherChangeTask),
        call(watcherSetPage),
        call(watcherSetSort),
        call(watcherSetSortOrder),
    ]);
}

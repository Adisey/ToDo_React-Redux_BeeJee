// Core
import { takeEvery, all, call } from 'redux-saga/effects';

// Types
import { type } from '../types';

// Workers
import { createTask, fillTasks, completeTask, changeTask } from './workers';

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
export function* watcherTasks () {
    yield all([
        call(watcherFillTasks),
        call(watcherCreateTask),
        call(watcherCompleteTask),
        call(watcherChangeTask),
    ]);
}

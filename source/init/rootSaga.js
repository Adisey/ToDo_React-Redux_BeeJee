//Core
import { all, call } from 'redux-saga/effects';

// Wathers
import { watcherTasks } from '../bus/tasks/saga/watchers';

export function* rootSaga () {
    yield all([ call(watcherTasks) ]);
}

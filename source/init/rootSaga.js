//Core
import { all, call } from 'redux-saga/effects';

// Wathers
import { watchAuthentication } from '../bus/authenticate/saga/watchers';
import { watcherTasks } from '../bus/tasks/saga/watchers';

export function* rootSaga () {
    yield all([ call(watchAuthentication) ]);
    yield all([ call(watcherTasks) ]);
}

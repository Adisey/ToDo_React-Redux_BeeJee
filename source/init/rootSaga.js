//Core
import { all, call } from 'redux-saga/effects';

// Wathers
import { watchAuthentication } from '../bus/authenticate/saga/watchers';

export function* rootSaga () {
    yield all([ call(watchAuthentication) ]);
}

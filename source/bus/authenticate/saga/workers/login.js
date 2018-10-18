// Core
import { put, call, apply } from 'redux-saga/effects';
import { Map } from 'immutable';

// import { api } from '../../../../REST/index';
import { authenticationAction } from '../../../authenticate/actions';
import { uiActions } from '../../../ui/actions';
// Instruments
import { antNotification } from '../../../../instruments';

export function* login ({ payload: credentials }) {
    try {
        yield put(uiActions.startFetching());
        // ToDo: Пока нет API


        yield put(authenticationAction.login());
    } catch (error) {
        yield put(uiActions.emitError(error, 'Login worker failed'));
        yield call(antNotification, 'Неправильтные Login или Пароль!', 'error');
    } finally {
        yield put(uiActions.stopFetching());
    }
}

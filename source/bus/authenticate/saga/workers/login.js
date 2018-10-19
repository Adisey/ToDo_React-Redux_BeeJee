// Core
import { put, call, apply } from 'redux-saga/effects';
import { Map } from 'immutable';

// import { api } from '../../../../REST/index';
import { authenticationAction } from '../../../authenticate/actions';
import { uiActions } from '../../../ui/actions';
// Instruments
import { antNotification } from '../../../../instruments';

export function* login ({ payload: userData }) {
    try {
        yield put(uiActions.startSpining());
        // ToDo: Пока нет API
        console.log('Worker Login -> userData ->', userData);

        if (userData.login !== 'admin' || userData.password !== '123') {
            throw new Error('Access is denied');
        }


        yield put(authenticationAction.login());
    } catch (error) {
        yield put(uiActions.emitError(error, 'Login worker failed'));
        yield call(antNotification, 'Неправильные Login или Пароль!', 'error');
    } finally {
        yield put(uiActions.stopSpining());
    }
}

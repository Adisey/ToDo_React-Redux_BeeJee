// Core
import { put, apply, call} from 'redux-saga/effects';

import { api } from '../../../../REST';
import { tasksActions } from '../../actions';
import { uiActions } from '../../../ui/actions';
import { antNotification } from '../../../../instruments';


export function* updateTask ({payload: task}) {
    try {
        yield put(uiActions.startSpining());
        const response = yield apply(api, api.tasks.update, [ task ]);
        const { message, status } = yield apply(response, response.json);
        if (response.status !== 200) {
            throw new Error(message);
        }
        if (status !== 'ok') {
            throw new Error(message.status);
        }
        yield put(tasksActions.updateTask(task));
        yield call(antNotification, 'Задача соранена!', 'info');
    } catch (error) {
        yield put(uiActions.emitError(error, 'createTask worker'));
        yield call(antNotification, 'Проблема с сохранением задачи!', 'error');
    } finally {
        yield put(uiActions.stopSpining());
    }
}

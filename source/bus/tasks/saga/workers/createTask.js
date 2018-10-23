// Core
import { put, apply, call} from 'redux-saga/effects';
import { v4 } from 'uuid';

import { api } from '../../../../REST';
import { tasksActions } from '../../actions';
import { uiActions } from '../../../ui/actions';
import { antNotification } from '../../../../instruments';


export function* createTask ({payload: task}) {
    try {
        yield put(uiActions.startSpining());




        const response = yield apply(api, api.tasks.create, [ task ]);
        console.log('function* createTask -> "response.status " -> ', response.status);
        const { message, status } = yield apply(response, response.json);
        console.log('function* createTask -> "message" -> ', message);
        console.log('function* createTask -> "status" -> ', status);
        if (response.status !== 200) {
            throw new Error(message);
        }
        if (status !== 'ok') {
            throw new Error(message.status);
        }
        // task.id = v4();
        console.log(' -> "message" -> ', message);
        yield put(tasksActions.createTask(message));
        yield call(antNotification, 'Задача соранена!', 'info');
    } catch (error) {
        yield put(uiActions.emitError(error, 'createTask worker'));
        yield call(antNotification, 'Проблема с сохранением задачи!', 'error');
    } finally {
        yield put(uiActions.stopSpining());
    }
}

// Core
import { put, apply, call} from 'redux-saga/effects';

import { api } from '../../../../REST';
import { tasksActions } from '../../actions';
import { uiActions } from '../../../ui/actions';
import { antNotification, b64toBlobFile } from '../../../../instruments';


export function* createTask ({payload: task}) {
    try {
        yield put(uiActions.startSpining());
        task.image = yield put(b64toBlobFile(task.image_path));
        const response = yield apply(api, api.tasks.create, [ task ]);
        const { message, status } = yield apply(response, response.json);
        if (response.status !== 200) {
            throw new Error(message);
        }
        if (status !== 'ok') {
            throw new Error(message.status);
        }
        yield put(tasksActions.createTask(message));
        yield call(antNotification, 'Задача соранена!', 'info');
    } catch (error) {
        yield put(uiActions.emitError(error, 'createTask worker'));
        yield call(antNotification, 'Проблема с сохранением задачи!', 'error');
    } finally {
        yield put(uiActions.stopSpining());
    }
}

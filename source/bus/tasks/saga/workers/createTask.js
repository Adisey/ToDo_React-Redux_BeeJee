// Core
import { put, apply, call} from 'redux-saga/effects';
import { v4 } from 'uuid';

// import { api } from '../../../../REST';
import { tasksActions } from '../../actions';
import { uiActions } from '../../../ui/actions';
import { antNotification } from '../../../../instruments';


export function* createTask ({payload: task}) {
    try {
        yield put(uiActions.startSpining());
        // const response = yield apply(api, api.tasks.create, [taskMessage]);
        //
        // const { data: task, message } = yield apply(response, response.json);
        //
        // if (response.status !== 200) {
        //     throw new Error(message);
        // }
        task.id = v4();
        yield put(tasksActions.createTask(task));
        yield call(antNotification, 'Задача соранена!', 'info');
    } catch (error) {
        yield put(uiActions.emitError(error, 'createTask worker'));
        yield call(antNotification, 'Проблема с сохранением задачи!', 'error');
    } finally {
        yield put(uiActions.stopSpining());
    }
}

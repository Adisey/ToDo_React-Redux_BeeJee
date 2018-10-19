// Core
import { put, apply } from 'redux-saga/effects';
import { v4 } from 'uuid';

// import { api } from '../../../../REST';
import { tasksActions } from '../../actions';
import { uiActions } from '../../../ui/actions';
// import { notificationActions } from '../../../notification/actions';

export function* createTask ({ payload: taskMessage }) {
    try {
        yield put(uiActions.startFetching());
        // const response = yield apply(api, api.tasks.create, [taskMessage]);
        //
        // const { data: task, message } = yield apply(response, response.json);
        //
        // if (response.status !== 200) {
        //     throw new Error(message);
        // }
        const task =  {
            id:        v4(),
            message:   taskMessage,
            completed: false,
            favorite:  false,
        };
        yield put(tasksActions.createTask(task));
        // yield put(notificationActions.showNotification('Задача сохранена !'));
    } catch (error) {
        yield put(uiActions.emitError(error, 'createTask worker'));
        // yield put(notificationActions.showNotification(
        //     'Проблема с сохранением задачи!',
        //     'error',
        //     'createTask worker',
        // ));
    } finally {
        yield put(uiActions.stopFetching());
    }
}

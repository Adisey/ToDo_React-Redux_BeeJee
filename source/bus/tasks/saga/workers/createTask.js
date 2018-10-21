// Core
import { put, apply } from 'redux-saga/effects';
import { v4 } from 'uuid';

// import { api } from '../../../../REST';
import { tasksActions } from '../../actions';
import { uiActions } from '../../../ui/actions';
// import { notificationActions } from '../../../notification/actions';

export function* createTask () {
    try {
        console.log(`function* createTask -> "1" -> `, 1);
        yield put(uiActions.startSpining());
        // const response = yield apply(api, api.tasks.create, [taskMessage]);
        //
        // const { data: task, message } = yield apply(response, response.json);
        //
        // if (response.status !== 200) {
        //     throw new Error(message);
        // }
        // const task =  {
        //     id:        v4(),
        //     message:   taskMessage,
        //     completed: false,
        //     favorite:  false,
        // };
        console.log(`function* createTask -> "2" -> `, 2);
        yield put(tasksActions.createTask());
        // yield put(notificationActions.showNotification('Задача сохранена !'));
        console.log(`function* createTask -> "3" -> `, 3);
    } catch (error) {
        console.log(`function* createTask -> "5" -> `, 5);
        yield put(uiActions.emitError(error, 'createTask worker'));
        // yield put(notificationActions.showNotification(
        //     'Проблема с сохранением задачи!',
        //     'error',
        //     'createTask worker',
        // ));
        console.log(`function* createTask -> "6" -> `, 6);
    } finally {
        console.log(`function* createTask -> "7" -> `, 7);
        yield put(uiActions.stopSpining());
    }
}

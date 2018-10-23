// Core
import { put, apply, call, select } from 'redux-saga/effects';

import { api } from '../../../../REST';
import { antNotification } from '../../../../instruments';
import { tasksActions } from '../../actions';
import { uiActions } from '../../../ui/actions';

export function* fillTasks () {
    try {
        yield put(uiActions.startSpining());

        const _tasks = yield select((state) => state.tasks);
        const filter = yield {
            page:           _tasks.get('page'),
            sort_field:     _tasks.get('sort_field'),
            sort_direction: _tasks.get('sort_direction'),
        };
        const response = yield apply(api, api.tasks.fetch, [ filter ]);
        const { message, status } = yield apply(response, response.json);
        if (response.status !== 200) {
            throw new Error(message);
        }
        if (status !== 'ok') {
            throw new Error(message.status);
        }
        if (message.tasks.length === 0 || message.total_task_count === 0) {
            yield call(antNotification, 'Сервер ответил, что у вас нет задач!', 'warning');
        } else {
            yield put(tasksActions.fillTasks({tasks: message.tasks, total_task_count: message.total_task_count}));
        }
    } catch (error) {
        yield put(uiActions.emitError(error, 'fillTasks worker'));
        yield call(antNotification, 'Не удалось получить данные с сервера!', 'error');
    } finally {
        yield put(uiActions.stopSpining());
    }
}

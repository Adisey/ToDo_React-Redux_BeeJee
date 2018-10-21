// Core
import { put, apply, call } from 'redux-saga/effects';

import { api } from '../../../../REST';
import { antNotification } from '../../../../instruments';
import { tasksActions } from '../../actions';
import { uiActions } from '../../../ui/actions';

export function* fillTasks ({payload: filter}) {
    try {
        yield put(uiActions.startSpining());

        console.log(' -> "filter" -> ', filter);

        const response = yield apply(api, api.tasks.fetch, [ filter ]);
        const { data: message, status } = yield apply(response, response.json);

        console.log('fillTasks worker -> "message" -> ', message);
        console.log('fillTasks worker -> "status" -> ', status);
        console.log('fillTasks worker -> "message.tasks" -> ', message.tasks);

        if (response.status !== 200) {
            throw new Error(message);
        }
        if (message.status !== 'ok') {
            throw new Error(message.status);
        }

        yield put(tasksActions.fillTasks(message.tasks));
    } catch (error) {
        yield put(uiActions.emitError(error, 'fillTasks worker'));
        yield call(antNotification, 'Не удалось получить данные с сервера!', 'error');
    } finally {
        yield put(uiActions.stopSpining());
    }
}

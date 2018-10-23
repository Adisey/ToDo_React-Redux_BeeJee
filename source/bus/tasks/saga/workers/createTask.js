// Core
import { put, apply, call} from 'redux-saga/effects';
import { v4 } from 'uuid';

import { api } from '../../../../REST';
import { tasksActions } from '../../actions';
import { uiActions } from '../../../ui/actions';
import { antNotification, b64toBlob, b64toBlobFile } from '../../../../instruments';


export function* createTask ({payload: task}) {
    try {
        yield put(uiActions.startSpining());

        // console.log('function* createTask  0 -> "task" -> ', task);
        // console.log('function* createTask  1 -> "task.image_path" -> ', task.image_path);
        // const image64 =   task.image_path.substr(22);
        // console.log('function* createTask  2 -> "image64" -> ', image64);
        // const imageData = b64toBlob(image64, 'image/png');
        // console.log('function* createTask  3 -> "imageData" -> ', imageData);
        // imageData.name = 'myfile.png'
        // console.log('function* createTask  4 -> "imageData" -> ', imageData);
        // task.image = imageData;
        // console.log('function* createTask  5 -> "task" -> ', task);



        console.log(` ------------------------------------------------> "" -> `, );
        console.log(` -> "task.image_path" -> `, b64toBlobFile(task.image_path));
        console.log(` ------------------------------------------------> "" -> `, );
        task.image = b64toBlobFile(task.image_path);




        // task.image_3 =  URL.createObjectURL(imageData);
        // console.log('function* createTask  4 -> "task.image_3" -> ', task.image);
        // const contentType = 'image/png';
        // const b64Data = 'iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==';
        //
        // const blob = b64toBlob(b64Data, contentType);
        // const blobUrl = URL.createObjectURL(blob);
        //
        // const img = document.createElement('img');
        // img.src = blobUrl;
        // document.body.appendChild(img);

        //--------------------------------------------------------
        // throw new Error('suspend');


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

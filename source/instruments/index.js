import React from 'react';
import { List } from 'immutable';
import { Icon, notification } from 'antd';

export const dateAddDay = (date, day) => new Date(date.setDate(date.getDate() + day));
export const dateTime0000 = (date) => new Date(date.setHours(0, 0, 0, 0));
export const dateTime2359 = (date) => new Date(date.setHours(23, 59, 59, 999));

export const getUniqueID = (length = 25, prefix = '_') => {
    if (typeof length !== 'number') {
        throw new Error('The function argument should be a number!');
    }
    const lengthID = length - prefix.length < 5 ? prefix.length + 5 : length - prefix.length;
    let text = prefix;
    const possible
        = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < lengthID; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
};

export const num2str = (num) => {
    return (Math.round(Number(num) * 100) / 100).toFixed(2).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};
export const strDate2ms = (str) => {
    const strArr = str.split('.');

    for (let i = 0; i < strArr.length; i++) {
        strArr[ i ] = Number(strArr[ i ]);
        strArr[ i ] = i === 2 && strArr[ i ] < 100 ? strArr[ i ] + 2000 : strArr[ i ];
    }

    return Number(new Date(strArr[ 2 ], strArr[ 1 ], strArr[ 0 ]));
};

export const unionArrea = (listArr) => {
// ToDo: Собрать такой же для проверки наличия объектов в массиве
    const outArr = [];

    for (let m = 0; m < listArr.length; m++) {
        for (let i = 0; i < listArr[ m ].length; i++) {
            if (outArr.indexOf(listArr[ m ][ i ]) < -0) {
                outArr.push(listArr[ m ][ i ]);
            }
        }
    }

    return outArr;
};

// export const findTitleMetas = (path) => {
//
// };

/**
 * antNotification -  функция для отображения уведомлений.
 * @author Adisey.
 * @param {message} Текст сообщения
 * @param {getType} Тип уведомления (доступны типы 'success',  'info', 'warning', 'error' или текст иконки ["smile"] )
 * @param {description} Текст Описания
 * @param {duration} продолжительность показа сообщения а сек. (0 - постоянно)
 * @param {id} используется, для редактирования существующего сообщения
 * @return {id} возвращаем id (повтоный запус функции с указанием этого id меняет текушее уведомление)
 */
export const antNotification = (
    message,
    getType = 'info',
    description = '',
    duration = 5,
    id = getUniqueID(),
) => {
    notification
        .open({
            key:       id,
            message,
            description,
            duration,
            placement: 'bottomRight',
            type:      getType,
            icon:      getType === 'success' || getType === 'info' || getType === 'warning' || getType === 'error'
                ? null : <Icon
                    style = {{ color: '#108ee9' }}
                    type = { getType }
                         />,
        });

    return id;
};


export const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[ i ] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, {type: contentType});

    return blob;
};

export const b64toBlobFile = (b64Data, fileWithoutExtension = 'my_file') => {
    let data = b64Data.split(':'); // crop 'data'
    const typeImg = data[ 1 ].split(';'); //crop 'image/png'
    const typeOut = typeImg[ 0 ]; // contentType
    const ext = typeOut.split('/');
    const lastModified = Number(new Date());
    const fileName  = fileWithoutExtension !== 'my_file'
        ? fileWithoutExtension + '.' + ext[ 1 ]
        : `my_file-${lastModified}.${ext[ 1 ]}`;
    const b64 = typeImg[ 1 ].split(','); //crop 'base64,'
    const outFile = b64toBlob(b64[ 1 ], typeOut);
    outFile.name = fileName;
    outFile.lastModified = lastModified;
    outFile.lastModifiedDate = new Date(lastModified);

    return outFile;
};

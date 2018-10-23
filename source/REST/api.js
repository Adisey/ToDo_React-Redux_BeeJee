/**
 * Created by PhpStorm
 * Project p902-BeeJee-To-Do
 * User: Adisey
 * Date: 21.10.2018
 * Time: 21:15
 */
import {  } from './config';


import { ROOT_URL, DEVELOPER, TOKEN } from './';


export const api = {
    tasks: {
        fetch(filter) {
            // return fetch(`aaa.${ROOT_URL}/${DEVELOPER}`, {
            return fetch(`aaa./${DEVELOPER}`, {
                method:  'GET',
                headers: {
                    mimeType:      'multipart/form-data',
                    Authorization: TOKEN,
                    crossDomain:   true,
                    contentType:   false,
                    processData:   false,
                    dataType:      'json',
                },
                data: JSON.stringify(filter),
            });
        },
    },
};

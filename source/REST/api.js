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
            console.log('TASK fetch -> "filter" -> ', filter);
            console.log(`TASK fetch -> "${ROOT_URL}/${DEVELOPER}" -> `);
            console.log('TASK fetch -> "TOKEN" -> ', TOKEN);
            return fetch(`${ROOT_URL}/${DEVELOPER}`, {
                method:  'GET',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "Authorization":  TOKEN,
                },
                // body: JSON.stringify(filter),
            });
        },
    },
};

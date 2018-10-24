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
            let _filter = '&page=' + filter.page
                + '&sort_field=' + filter.sort_field
                + '&sort_direction=' + filter.sort_direction;

            return fetch(`${ROOT_URL}/${DEVELOPER}${_filter}`, {
                method:  'GET',
                headers: {
                },
            });
        },
        create (task) {
            const form = new FormData();
            form.append('email', task.email);
            form.append('text', task.text);
            form.append('username', task.username);
            form.append('image', task.image);

            return fetch(`${ROOT_URL}/create${DEVELOPER}`, {
                method:  'POST',
                headers: {
                },
                body: form,
            });
        },

    },
};

/**
 * Created by PhpStorm
 * Project p902-BeeJee-To-Do
 * User: Adisey
 * Date: 21.10.2018
 * Time: 21:15
 */

import { ROOT_URL, DEVELOPER, TOKEN } from './';
import { encodeRFC5987ValueChars } from '../instruments';
import  md5 from 'md5';

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
        update (task) {
            const availableField = [ 'text', 'status' ].sort((a, b)=>a > b);
            const form = new FormData();
            let encodeObj = {};
            for (let key in task) {
                if (availableField.indexOf(key) > -1) {
                    form.append(key, task[ key ]);
                    encodeObj[ encodeRFC5987ValueChars(key) ] = encodeRFC5987ValueChars(task[ key ]);
                }
            }
            form.append('token', TOKEN);
            encodeObj[ encodeRFC5987ValueChars('token') ] = encodeRFC5987ValueChars(TOKEN);
            let params_string = '';
            for (let key in encodeObj) {
                params_string += `${params_string ? '&' : ''}${key}=${encodeObj[ key ]}`;
            }
            const _signature = md5(params_string);
            form.append('signature', _signature);
            return fetch(`${ROOT_URL}/edit/${task.id}${DEVELOPER}`, {
                method:  'POST',
                headers: {
                },
                body: form,
            });
        },

    },
};

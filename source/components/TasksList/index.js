/**
 * Created by PhpStorm
 * Project p902-BeeJee-ToDo
 * User: Adisey
 * Date: 19.10.2018
 * Time: 1:11
 */
// Core
import React, { Component } from 'react';
// Antd
import { Button, Table, Icon, Input } from 'antd';

// Styles
import cx from 'classnames';
import Styles from './styles.m.css';
// Components
// Actions


export default class TasksList extends Component {
    _showTask = (id) =>    {
        this.props.actions.showTask(id);
    };

    render() {
        const {tasks} = this.props;

        const _columns = [
            {
                title:     'Пользователь',
                dataIndex: 'username',
                key:       'username',
            },
            {
                title:     'Email',
                dataIndex: 'email',
                key:       'email',
            },
            {
                title:     'Задача',
                dataIndex: 'text',
                key:       'text',
                render:    (text, record) => {
                    return (
                        <a
                            href = 'javascript:;'
                            onClick = { () => this._showTask(record.key) }>
                            {text}
                        </a>
                    );
                },

            },
            {
                title:     'Статус',
                dataIndex: 'status',
                key:       'status',
            },
            {
                title:     'Картинка',
                dataIndex: 'image',
                key:       'image',

            },
        ];
        const _data = tasks.get('tasks').map((t) => {
            return {
                key:      t.get('id'),
                username: t.get('username'),
                email:    t.get('email'),
                text:     t.get('text'),
                status:   t.get('status'),
                image:    t.get('image_path')
                    ? <img
                        height = '24'
                        src = { t.get('image_path') }
                        width = '32'
                      /> : '',
            };
        })
            .toJS();


        return (
            <div >
                <Table
                    // bordered
                    // className = { LocalStyles.phoneBookTable }
                    columns = { _columns }
                    dataSource = { _data }
                    pagination = { false }
                    // size = 'small'
                />

            </div>
        );
    }
}

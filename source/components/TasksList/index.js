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
import {  Table, Icon, Popover  } from 'antd';
// Styles
import cx from 'classnames';
import Styles from './styles.m.css';
// Components
// Actions


export default class TasksList extends Component {
    _showModalPreviewTask = (id) =>    {
        this.props.actions.showModalPreviewTask(id);
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
                editable:  true,
            },
            {
                title:     'Задача',
                dataIndex: 'text',
                key:       'text',
                render:    (text, record) => {
                    return (
                        <a
                            href = 'javascript:;'
                            onClick = { () => this._showModalPreviewTask(record.key) }>
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
                status:   t.get('status')
                    ? <Icon
                        theme = 'twoTone'
                        twoToneColor = '#52c41a'
                        type = 'check-circle'
                    /> : <Icon
                          theme = 'twoTone'
                          twoToneColor = '#eb2f96'
                          type = 'clock-circle'
                           />,
                image: t.get('image_path')
                    ? <Popover
                        content = { <img
                            alt = { t.get('text') }
                            height = '240'
                            src = { t.get('image_path') }
                        /> }
                        title = { t.get('text') }
                        trigger = 'hover'>
                        <img
                            height = '24'
                            src = { t.get('image_path') }
                        />
                    </Popover> : '',
            };
        })
            .toJS();


        return (
            <Table
                // bordered
                className = { Styles.taskList }
                columns = { _columns }
                dataSource = { _data }
                pagination = { false }
                // size = 'small'
            />
        );
    }
}

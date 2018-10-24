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
        const {tasks, authenticate, actions} = this.props;
        const isAuthenticated = authenticate.get('isAuthenticated');
        let editColumn = {};
        if (isAuthenticated) {
            editColumn = {
                title:     'Изменить',
                dataIndex: 'editButton',
                key:       'editButton',
                className: cx(Styles.columnEditEnable),
            };
        } else {
            editColumn = {
                title:     '',
                dataIndex: 'editButton',
                key:       'editButton',
                className: cx(Styles.columnEditDisable),
            };
        }


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
            editColumn,

        ];
        const _data = tasks.get('tasks').map((t) => {
            const _editTask = ()=>{
                console.log('_editTask -> "id" -> ', t.get('id'));
                actions.showModalEditTask(t.get('id'));
            };

            return {
                key:      t.get('id'),
                username: t.get('username'),
                email:    t.get('email'),
                text:     t.get('text'),
                status:   t.get('status')
                    ? <Popover
                        content = { <p>
                            <Icon
                                style = {{ fontSize: '26px'}}
                                theme = 'twoTone'
                                twoToneColor = '#52c41a'
                                type = 'check-circle'
                            />  Выполнено
                        </p> }
                        title = { t.get('text') }
                        trigger = 'hover'>
                        <Icon
                            style = {{ fontSize: '26px'}}
                            theme = 'twoTone'
                            twoToneColor = '#52c41a'
                            type = 'check-circle'
                        />
                    </Popover>
                    : <Popover
                        content = { <p>
                            <Icon
                                style = {{ fontSize: '26px'}}
                                theme = 'twoTone'
                                twoToneColor = '#eb2f96'
                                type = 'clock-circle'
                            />  Не выполено
                        </p> }
                        title = { t.get('text') }
                        trigger = 'hover'>
                        <Icon
                            style = {{ fontSize: '26px'}}
                            theme = 'twoTone'
                            twoToneColor = '#eb2f96'
                            type = 'clock-circle'
                        />
                    </Popover>,
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
                editButton: isAuthenticated
                    ? <Popover
                        content = {  t.get('text') }
                        title = 'Изменить'
                        trigger = 'hover'>
                        <Icon
                            style = {{ fontSize: '26px'}}
                            theme = 'twoTone'
                            type = 'edit'
                            onClick = { _editTask }
                        />
                      </Popover> : '',
            };
        })
            .toJS();


        return (
            <Table
                className = { Styles.taskList }
                columns = { _columns }
                dataSource = { _data }
                pagination = { false }
            />
        );
    }
}

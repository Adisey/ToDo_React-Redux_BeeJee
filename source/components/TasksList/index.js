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
import { Button, Table, Icon, Input, Popover, Form } from 'antd';
const FormItem = Form.Item;
const EditableContext = React.createContext();

// Styles
import cx from 'classnames';
import Styles from './styles.m.css';
// Components
// Actions

//------------Edit---------------------------------------------

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    getInput = () => {
        if (this.props.inputType === 'number') {
            return <InputNumber />;
        }
        return <Input />;
    };

    render() {
        const {
            editing,
            dataIndex,
            title,
            inputType,
            record,
            index,
            ...restProps
        } = this.props;
        return (
            <EditableContext.Consumer>
                {(form) => {
                    const { getFieldDecorator } = form;
                    return (
                        <td {...restProps}>
                            {editing ? (
                                <FormItem style={{ margin: 0 }}>
                                    {getFieldDecorator(dataIndex, {
                                        rules: [{
                                            required: true,
                                            message: `Please Input ${title}!`,
                                        }],
                                        initialValue: record[dataIndex],
                                    })(this.getInput())}
                                </FormItem>
                            ) : restProps.children}
                        </td>
                    );
                }}
            </EditableContext.Consumer>
        );
    }
}



//------------Edit---------------------------------------------



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

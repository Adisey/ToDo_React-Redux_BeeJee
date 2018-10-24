/**
 * Created by PhpStorm
 * Project p902-BeeJee-ToDo
 * User: Adisey
 * Date: 19.10.2018
 * Time: 17:12
 */
// Core
import React, { Component, createRef } from 'react';
// Antd
import { Button, Icon, Input, Form, Modal, Checkbox } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;
// Instruments
import { Formik } from 'formik';
import { task } from '../forms/shapes';
// Styles
import Styles from './styles.m.css';
import cx from 'classnames';

// Components


class TaskForm extends Component {
    formikForm = createRef();

    _showModalPreviewTask = (previewTask) => {
        this.props.actions.loadDataPreviewTask(previewTask);
        this.props.actions.showModalPreviewTask();
    };

    _updateTaskAsync = (task) => {
        this.props.actions.updateTaskAsync(task);
        this.props.actions.hideModalEditTask();
    };

    _closeEditTask = () => {
        this.props.actions.hideModalEditTask();
    };

    render() {
        const { tasks } = this.props;
        const editTask = {};
        editTask.id = tasks.get('editTaskId');
        tasks.get('tasks').map((t) => {
            if (t.get('id') === editTask.id) {
                editTask.email = t.get('email');
                editTask.image_path = t.get('image_path');
                editTask.status = !!t.get('status');
                editTask.text = t.get('text');
                editTask.username = t.get('username');
            }
        });

        return (
            <Formik
                initialValues = { editTask }
                ref = { this.formikForm }
                render = { (props) => {
                    const {
                        values,
                        errors,
                        isValid,
                        handleChange,
                        handleBlur,
                    } = props;
                    const _updateTask = () => {
                        const task = values;
                        task.status = task.status ? 10 : 0;
                        this._updateTaskAsync(task);
                    };
                    const _showPreviewTask = () => {
                        const previewTask = values;
                        previewTask.status = values.status ? 10 : 0;
                        this._showModalPreviewTask(previewTask);
                    };
                    const labelCol = { span: 5 };
                    const wrapperColText = { span: 18 };
                    console.log('Formik Render  -> "values.status " -> ', values.status);

                    return (
                        <Form>
                            <FormItem
                                hasFeedback
                                label = 'Статус'
                                labelCol = { labelCol }
                                wrapperCol = { wrapperColText }>
                                <Checkbox
                                    checked = { values.status }
                                    name = 'status'
                                    onChange = { handleChange }
                                />
                            </FormItem>
                            <FormItem
                                hasFeedback
                                help = { errors.text ? errors.text : ' ' }
                                label = 'Текст задачи'
                                labelCol = { labelCol }
                                validateStatus = { errors.text ? 'error' : 'success' }
                                wrapperCol = { wrapperColText }>
                                <TextArea
                                    autosize = {{ minRows: 2, maxRows: 6 }}
                                    // defaultValue = { initialValues.text }
                                    name = 'text'
                                    placeholder = 'Текст задачи'
                                    prefix = { <Icon
                                        style = {{ color: 'rgba(0,0,0,.25)' }}
                                        type = 'exception'
                                               /> }
                                    value = { values.text }
                                    onBlur = { handleBlur }
                                    onChange = { handleChange }
                                />
                            </FormItem>
                            <div className = { Styles.footer }>
                                <Button
                                    className = { Styles.buttonEditForm }
                                    icon = 'close'
                                    key = 'back'
                                    type = 'danger'
                                    ghost
                                    onClick = { this._closeEditTask }>Закрыть
                                </Button>
                                <Button
                                    className = { Styles.buttonEditForm }
                                    disabled = { !isValid }
                                    icon = 'picture'
                                    key = 'preview'
                                    onClick = { _showPreviewTask }>Предпросмотр
                                </Button>
                                <Button
                                    className = { Styles.buttonEditForm }
                                    disabled = { !isValid }
                                    ghost
                                    icon = 'check'
                                    key = 'submit'
                                    type = 'primary'
                                    onClick = { _updateTask }>Сохранить
                                </Button>
                            </div>
                        </Form>
                    );
                } }
                validationSchema = { task.schema }
            />

        );
    }
}

export default class EditTask extends Component {
    _hideModalEditTask = () => {
        this.props.actions.hideModalEditTask();
    };

    render() {
        const { tasks, actions } = this.props;
        const _title = (
            <p><img src = '/static/favicon/beejee-20x20.png'/> Редактирование задачи</p>
        );

        return (
            <Modal
                onCancel = { this._hideModalEditTask }
                title = { _title }
                visible
                footer = { null }>
                <TaskForm
                    actions = { actions }
                    tasks = { tasks }
                />
            </Modal>
        );
    }
}

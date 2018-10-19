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
import { Button, Icon, Input, Form } from 'antd';
const FormItem = Form.Item;
// Instruments
import { Formik } from 'formik';
import { task } from '../forms/shapes';

// Styles
import Styles from './styles.m.css';
// Components

class TaskForm extends Component {
    formikForm = createRef();

    submitForm = (values) => {
        // const {loginAsync} = this.props;
        console.log('Main SubmitForm TaskForm ->', values);
        // loginAsync(values);
    };

    render () {
        return (
            <Formik
                // ToDo: Для редактирования нужно прочитать из существующей таски
                initialValues = { task.shape }
                ref = { this.formikForm }
                render = { (props) => {
                    const {
                        values,
                        initialValues,
                        errors,
                        isValid,
                        handleChange,
                        handleBlur,
                    } = props;
                    const _submitForm = () => {
                        if (isValid) {
                            this.submitForm(values);
                        }
                    };
                    console.log('TaskForm -> props ->', props);

                    return (
                        <div>
                            <Form>
                                <FormItem
                                    hasFeedback
                                    help = { errors.username ? errors.username : 'МАЛАДЭЦ!!' }
                                    validateStatus = { errors.username ? 'error' : 'success' }>
                                    <Input
                                        defaultValue = { initialValues.username }
                                        name = 'username'
                                        placeholder = 'Username'
                                        prefix = { <Icon
                                            style = {{ color: 'rgba(0,0,0,.25)' }}
                                            type = 'user'
                                        /> }
                                        value = { values.username }
                                        onBlur = { handleBlur }
                                        onChange = { handleChange }
                                        onPressEnter = { _submitForm }
                                    />
                                </FormItem>

                                <FormItem
                                    hasFeedback
                                    help = { errors.email ? errors.email : '' }
                                    validateStatus = { errors.email ? 'error' : 'success' }>
                                    <Input
                                        defaultValue = { initialValues.email }
                                        name = 'email'
                                        placeholder = 'Email'
                                        prefix = { <Icon
                                            style = {{ color: 'rgba(0,0,0,.25)' }}
                                            type = 'mail'
                                        /> }
                                        value = { values.email }
                                        onBlur = { handleBlur }
                                        onChange = { handleChange }
                                        onPressEnter = { _submitForm }
                                    />
                                </FormItem>

                                <FormItem
                                    hasFeedback
                                    help = { errors.text ? errors.text : '' }
                                    validateStatus = { errors.text ? 'error' : 'success' }>
                                    <Input
                                        defaultValue = { initialValues.text }
                                        name = 'text'
                                        placeholder = 'Текст задачи'
                                        prefix = { <Icon
                                            style = {{ color: 'rgba(0,0,0,.25)' }}
                                            type = 'exception'
                                        /> }
                                        value = { values.text }
                                        onBlur = { handleBlur }
                                        onChange = { handleChange }
                                        onPressEnter = { _submitForm }
                                    />
                                </FormItem>
                                <Button
                                    className = { Styles.fglkdjfkglkd }
                                    disabled = { !isValid }
                                    icon = 'plus'
                                    type = 'primary'
                                    // shape = 'circle'
                                    onClick = { _submitForm }>
                                </Button>

                            </Form>
                        </div>
                    );
                } }
                validationSchema = { task.schema }
            />

        );
    }
}


export default class EditTask extends Component {
    _newTask = () => {
        this.props.actions.startEditTask();
    };

    _stopEditTask = () => {
        this.props.actions.endEditTask();
    };

    render() {
        const {tasks } = this.props;
        const isEdited =  tasks.get('isEdited');

        return (
            <div className = { Styles.edit }>
                {isEdited
                    ? <div>
                        <Button
                            icon = 'close'
                            shape = 'circle'
                            size = 'large'
                            type = 'danger'
                            onClick = { this._stopEditTask }
                        />
                        <TaskForm/>
                    </div>
                    : <div>
                        <Button
                            icon = 'plus'
                            shape = 'circle'
                            size = 'large'
                            type = 'primary'
                            onClick = { this._newTask }
                        />
                    </div>
                }

            </div>
        );
    }
}

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
import { Button, Icon, Input, Form, Upload, Modal } from 'antd';
const FormItem = Form.Item;
// Instruments
import { Formik } from 'formik';
import { task } from '../forms/shapes';
import Dropzone from 'react-dropzone';
// Styles
import Styles from './styles.m.css';
import cx from 'classnames';

// Components
const imageMaxSize = 1000000000;


class TaskForm extends Component {
    formikForm = createRef();


    submitForm = (values) => {
        console.log('Main SubmitForm TaskForm ->', values);
    };

    state = {
        imgSrc: null,
    };


    _handleDrop = (files, rejectedFiles) => {
        if (rejectedFiles && rejectedFiles.length > 0) {
            const rejectFile = rejectedFiles[ 0 ];
            const rejectFileSize = rejectFile.size;
            const rejectFileName = rejectFile.name;
            if (rejectFileSize > imageMaxSize) {
                const message = `Допустимый размер при загрузке - ${imageMaxSize / 1024} Kb. \n Размер файла ${rejectFileName} -> ${(rejectFileSize / 1024).toFixed(3)} Kb. \n Выберите другой файл.`;

                alert(message);

                return;
            }
        }
        const currentFile = files[ 0 ];
        const myFileItemReader = new FileReader();

        myFileItemReader.addEventListener('load', () => {
            this.setState({
                imgSrc: myFileItemReader.result,
            });
        }, false);
        myFileItemReader.readAsDataURL(currentFile);
    };


    render () {
        const { imgSrc } =  this.state;

        console.log(` -> imgSrc -> "${imgSrc}"`);

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

                    const labelCol = { span: 5 };
                    const wrapperCol = { span: 12 };

                    return (
                        <Form>


                            <div className = { Styles.mainCreateIngredient }>
                                <Dropzone
                                    accept = 'image/jpeg, image/png, image/gif'
                                    className = 'previewPictureCreateIngredient'
                                    maxSize = { imageMaxSize }
                                    multiple = { false }
                                    onDrop = { this._handleDrop.bind(this) }>
                                    {imgSrc !== null ? <img
                                        className = { Styles.showCreateIngredientPicture }
                                        src = { imgSrc }
                                    /> : <Button>Загрузить картинку</Button>}
                                </Dropzone>
                            </div>


                            <FormItem
                                hasFeedback
                                help = { errors.username ? errors.username : ' ' }
                                label = 'Пользователь'
                                labelCol = { labelCol }
                                validateStatus = { errors.username ? 'error' : 'success' }
                                wrapperCol = { wrapperCol }>
                                <Input
                                    defaultValue = { initialValues.username }
                                    name = 'username'
                                    onBlur = { handleBlur }
                                    onChange = { handleChange }
                                    onPressEnter = { _submitForm }
                                    placeholder = 'Username'
                                    prefix = { <Icon
                                        style = {{ color: 'rgba(0,0,0,.25)' }}
                                        type = 'user'
                                    /> }
                                    value = { values.username }
                                />
                            </FormItem>

                            <FormItem
                                hasFeedback
                                help = { errors.email ? errors.email : ' ' }
                                label = 'Email'
                                labelCol = { labelCol }
                                validateStatus = { errors.email ? 'error' : 'success' }
                                wrapperCol = { wrapperCol }>
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
                                help = { errors.text ? errors.text : ' ' }
                                label = 'Текст задачи'
                                labelCol = { labelCol }
                                validateStatus = { errors.text ? 'error' : 'success' }
                                wrapperCol = { wrapperCol }>
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
                                className = { Styles.buttonEditForm }
                                disabled = { !isValid }
                                icon = 'plus'
                                type = 'primary'
                                // shape = 'circle'
                                onClick = { _submitForm }>
                            </Button>

                        </Form>
                    );
                } }
                validationSchema = { task.schema }
            />

        );
    }
}


export default class EditTask extends Component {
    _hideModalEditTask = () =>    {
        this.props.actions.hideModalEditTask();
    };

    render() {
        const { tasks } = this.props;
        const _title = (
            <p>
                <img src = '/static/favicon/beejee-20x20.png' />
                {tasks.getIn([ 'tempTask', 'id' ]) ? '    Редактирование задачи' : '    Новая задача'}
            </p>
        );
        const _isValid = !!tasks.getIn([ 'tempTask', 'id' ]);

        return (
            <Modal
                onCancel = { this._hideModalEditTask }
                title = { _title }
                visible
                footer = { [
                    <Button
                        className = { Styles.buttonEditForm }
                        icon = 'close'
                        key = 'back'
                        onClick = { this._hideModalEditTask }
                        type = 'danger'
                        ghost>Закрыть
                    </Button>,
                    <Button
                        className = { Styles.buttonEditForm }
                        disabled = { !_isValid }
                        ghost
                        icon = 'picture'
                        key = 'preview'
                        type = 'dashed'>Предпросмотр
                    </Button>,
                    <Button
                        className = { Styles.buttonEditForm }
                        disabled = { !_isValid }
                        ghost
                        icon = 'check'
                        key = 'submit'
                        type = 'primary'>Сохранить
                    </Button>,
                    // {bbb},
                ] }>
                <TaskForm/>
            </Modal>
        );
    }
}

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
import { Button, Icon, Input, Form, Modal } from 'antd';
const FormItem = Form.Item;
// Instruments
import { Formik } from 'formik';
import { task } from '../forms/shapes';
import Dropzone from 'react-dropzone';
import ImageCompressor from 'image-compressor.js';
// Styles
import Styles from './styles.m.css';
import cx from 'classnames';

// Components


class TaskForm extends Component {
    formikForm = createRef();

    submitForm = (values) => {
        console.log('Main SubmitForm TaskForm ->', values);
    };

    state = {
        imgSrc: null,
    };


    _handleDrop = (files, rejectedFiles) => {
        const currentFile = files[ 0 ];
        const myFileItemReader = new FileReader();

        myFileItemReader.addEventListener('load', () => {
            this.setState({
                imgSrc: myFileItemReader.result,
            });
            new ImageCompressor(files[ 0 ], {
                quality:   0.8,
                maxHeight: 100,
                maxWidth:  100,
                success(newFile) {
                    console.log(` -> result -> "${newFile}"`);
                    console.log(` -> result.name -> "${newFile.name}"`);
                    console.log(` -> result.size -> "${newFile.size}"`);
                    // this.props.actions.newImage(newFile);
                    // this.props.actions.hideModalEditTask();
                    // console.log(`ImageCompressor -> this.props.tasks -> "${this.props.tasks}"`);
                },
                error(e) {
                    console.error(e.message);
                },
            });
        }, false);

        myFileItemReader.readAsDataURL(currentFile);
    };
    _handleDrop2 = (files ) => {
        const loadFile = files[ 0 ];
        new ImageCompressor(loadFile, {
            quality:   0.8,
            maxHeight: 240,
            maxWidth:  320,
            success(newFile) {
                console.log(` -> newFile -> "${newFile}"`);
                console.log(` -> newFile -> "${newFile.name}"`);
                console.log(` -> newFile -> "${newFile.size}"`);

                const loader = new FileReader();

                loader.onload = () => {
                    const originalFile = loader.result;
                    console.log(`Resize -----> Base64 -> "${originalFile}"`);
                    _aa(originalFile);
                    // this.setState({
                    //     imgSrc: originalFile,
                    // });
                };
                loader.onabort = () => console.log('file reading was aborted');
                loader.onerror = () => console.log('file reading has failed');
                loader.readAsDataURL(newFile);
            },
            error(e) {
                console.error(e.message);
            },
        });

        const _aa = (a) => {
            console.log(`***************!!!! --------------------> AA -> "${a}"`);
            this.setState({
                imgSrc: a,
            });
            this.props.actions.newImage(a);

        };




    };

    render () {
        const { imgSrc } =  this.state;
        const { tasks, actions} = this.props;
        console.log(`TaskForm -> this.props -> "${this.props}"`);
        console.log(`TaskForm -> tasks -> "${tasks}"`);
        console.log(`TaskForm -> actions -> "${actions}"`);


        // console.log(` -> imgSrc -> "${imgSrc}"`);

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
                    console.log('Formik -> props ->', props);

                    const labelCol = { span: 5 };
                    const wrapperCol = { span: 12 };

                    return (
                        <Form>


                            <div className = { Styles.mainCreateIngredient }>
                                <Dropzone
                                    accept = 'image/jpeg, image/png, image/gif'
                                    className = 'previewPictureCreateIngredient'
                                    multiple = { false }
                                    onDrop = { this._handleDrop2.bind(this) }>
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
        const { tasks, actions } = this.props;
        console.log(`EditTask -> this.props -> "${this.props}"`);
        console.log(`EditTask -> tasks -> "${tasks}"`);
        console.log(`EditTask -> actions -> "${actions}"`);

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
                ] }>
                <TaskForm
                    actions = { actions }
                    tasks = { tasks }
                />
            </Modal>
        );
    }
}

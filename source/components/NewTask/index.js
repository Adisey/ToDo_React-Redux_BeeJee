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
const { TextArea } = Input;
// Instruments
import { Formik } from 'formik';
import { task } from '../forms/shapes';
import Dropzone from 'react-dropzone';
import ImageCompressor from 'image-compressor.js';
import { antNotification } from '../../instruments';
// Styles
import Styles from './styles.m.css';

// Components


class NewTaskForm extends Component {
    formikForm = createRef();

    _showModalPreviewTask = (previewTask) => {
        this.props.actions.loadDataPreviewTask(previewTask);
        this.props.actions.showModalPreviewTask();
    };

    _createTaskAsync = (task) => {
        this.props.actions.createTaskAsync(task);
        this.props.actions.hideModalNewTask();
    };

    _closeNewTask = () => {
        this.props.actions.hideModalNewTask();
    };

    render() {
        const { tasks } = this.props;

        return (
            <Formik
                initialValues = { task.shape }
                ref = { this.formikForm }
                render = { (props) => {
                    const {
                        values,
                        errors,
                        isValid,
                        handleChange,
                        handleBlur,
                        setFieldValue,
                    } = props;
                    const _isValid = isValid && !!values.image_path;
                    const _createTask = () => {
                        const task = values;
                        task.image = tasks.getIn([ 'previewTask', 'image' ]);
                        this._createTaskAsync(task);
                    };
                    const _showPreviewTask = () => {
                        this._showModalPreviewTask(values);
                    };
                    const _loadImage = (files) => {
                        const downloadableFile = files[ 0 ];
                        const _putImage64LocalStore = (downloadedCompressedFile64) => {
                            setFieldValue('image_path', downloadedCompressedFile64);
                        };
                        new ImageCompressor(downloadableFile, {
                            quality:   0.8,
                            maxHeight: 240,
                            maxWidth:  320,
                            success(compressedFile) {
                                const loader = new FileReader();
                                loader.onload = () => {
                                    const downloadedCompressedFile = loader.result;
                                    _putImage64LocalStore(downloadedCompressedFile);
                                };
                                loader.onabort = () => antNotification('Загрузка прервана!', 'error', '', 3);
                                loader.onerror = () => antNotification('Ошибка при загрузке!', 'error');
                                loader.readAsDataURL(compressedFile);
                            },
                            error(error) {
                                antNotification('Ошибка сжатия файла!', 'error', error.message);
                            },
                        });
                    };
                    const labelCol = { span: 5 };
                    const wrapperColInput = { span: 12 };
                    const wrapperColText = { span: 18 };

                    return (
                        <Form>
                            <div className = { Styles.mainCreateIngredient }>
                                <div className = { Styles.dropzoneCreateIngredient }>
                                    <Dropzone
                                        accept = 'image/jpeg, image/png, image/gif'
                                        className = 'previewPictureCreateIngredient'
                                        multiple = { false }
                                        onDrop = { _loadImage.bind(this) }>
                                        {values.image_path ? <img
                                            className = { Styles.showCreateIngredientPicture }
                                            src = { values.image_path }
                                        />
                                            : <div className = { Styles.dropzoneInfo }>
                                                <p>Перетащиете сюда изображение</p>
                                                <p>или нажмите: </p>
                                                <Button
                                                    icon = 'cloud-upload'
                                                    type = 'primary'>Загрузить
                                                </Button>
                                                <span>Картинка обязательна. ;)</span>
                                            </div>
                                        }
                                    </Dropzone>
                                </div>
                            </div>

                            <FormItem
                                hasFeedback
                                help = { errors.username ? errors.username : ' ' }
                                label = 'Пользователь'
                                labelCol = { labelCol }
                                validateStatus = { errors.username ? 'error' : 'success' }
                                wrapperCol = { wrapperColInput }>
                                <Input
                                    // defaultValue = { initialValues.username }
                                    name = 'username'
                                    onBlur = { handleBlur }
                                    onChange = { handleChange }
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
                                wrapperCol = { wrapperColInput }>
                                <Input
                                    // defaultValue = { initialValues.email }
                                    name = 'email'
                                    placeholder = 'Email'
                                    prefix = { <Icon
                                        style = {{ color: 'rgba(0,0,0,.25)' }}
                                        type = 'mail'
                                               /> }
                                    value = { values.email }
                                    onBlur = { handleBlur }
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
                                    onClick = { this._closeNewTask }
                                    type = 'danger'
                                    ghost>Закрыть
                                </Button>
                                <Button
                                    className = { Styles.buttonEditForm }
                                    disabled = { !_isValid }
                                    icon = 'picture'
                                    key = 'preview'
                                    onClick = { _showPreviewTask }>Предпросмотр
                                </Button>
                                <Button
                                    className = { Styles.buttonEditForm }
                                    disabled = { !_isValid }
                                    ghost
                                    icon = 'check'
                                    key = 'submit'
                                    type = 'primary'
                                    onClick = { _createTask }>Сохранить
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

export default class NewTask extends Component {
    _hideModalNewTask = () => {
        this.props.actions.hideModalNewTask();
    };

    render() {
        const { tasks, actions } = this.props;
        const _title = (
            <p> <img src = '/static/favicon/beejee-20x20.png'/>  Новая задача </p>
        );

        return (
            <Modal
                onCancel = { this._hideModalNewTask }
                title = { _title }
                visible
                footer = { null }>
                <NewTaskForm
                    actions = { actions }
                    tasks = { tasks }
                />
            </Modal>
        );
    }
}

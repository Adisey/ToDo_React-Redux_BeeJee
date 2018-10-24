
// Core
import React, { Component } from 'react';

// Antd
import { Modal, Button, Icon, Card, Avatar } from 'antd';
const { Meta } = Card;
// Instruments
// Actionns
// Component
// Styles
import cx from 'classnames';
import Styles from './styles.m.css';

export default class ModalPreviewTask extends Component {
    _hideModalPreviewTask = () =>    {
        this.props.actions.hideModalPreviewTask();
    };


    render () {
        const { tasks } = this.props;

        const _id = tasks.getIn([ 'id', 'previewTask' ]);
        const _username = tasks.getIn([ 'previewTask', 'username' ]);
        const _email = tasks.getIn([ 'previewTask', 'email' ]);
        const _text = tasks.getIn([ 'previewTask', 'text' ]);
        const _status = tasks.getIn([ 'previewTask', 'status' ]);
        const _image_path = tasks.getIn([ 'previewTask', 'image_path' ]);
        const _iconStatus = _status ? (
            <Icon
                theme = 'twoTone'
                twoToneColor = '#52c41a'
                type = 'check-circle'
                style = {{ fontSize: '26px'}}
            />
        ) : (
            <Icon
                theme = 'twoTone'
                twoToneColor = '#eb2f96'
                type = 'clock-circle'
                style = {{ fontSize: '26px'}}
            />
        );

        return (
            <Modal
                onCancel = { this._hideModalPreviewTask }
                title = { <img src = '/static/favicon/beejee-20x20.png' /> }
                visible
                footer = { [
                    <Button
                        className = { Styles.buttonEditForm }
                        icon = 'close-circle'
                        key = 'back'
                        onClick = { this._hideModalPreviewTask }
                        type = 'primary'>Закрыть
                    </Button>,
                ] }>
                <Card
                    cover = { _image_path
                        ? <img
                            alt = 'example'
                            src = { _image_path }
                          />
                        : <Avatar
                            icon = 'picture'
                            shape = 'square'
                            size = { 128 }
                        /> }>
                    <Meta
                        description = <div className = { Styles.description }>
                            <p>Пользхователь: <span>{_username}</span></p>
                            <p>Email: <span>{_email}</span></p>
                                      </div>
                        title = { <p>{_iconStatus} {_text}</p> }
                    />
                </Card>
            </Modal>
        );
    }
}

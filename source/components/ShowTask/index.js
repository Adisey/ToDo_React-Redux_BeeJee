
// Core
import React, { Component, createRef } from 'react';
import { getIn } from 'immutable';

// Antd
import { Modal, Button, Icon, Card, Avatar, Skeleton } from 'antd';
const { Meta } = Card;
// Instruments
// Actionns
// Component
// Styles
import cx from 'classnames';
import Styles from './styles.m.css';

export default class ShowTask extends Component {
    _hideTask = () =>    {
        this.props.actions.hideTask();
    };


    render () {
        const { tasks } = this.props;

        const _id = tasks.getIn([ 'id', 'tempTask' ]);
        const _username = tasks.getIn([ 'tempTask', 'username' ]);
        const _email = tasks.getIn([ 'tempTask', 'email' ]);
        const _text = tasks.getIn([ 'tempTask', 'text' ]);
        const _status = tasks.getIn([ 'tempTask', 'status' ]);
        const _image_path = tasks.getIn([ 'tempTask', 'image_path' ]);
        const _iconStatus = _status ? (
            <Icon
                theme = 'twoTone'
                twoToneColor = '#52c41a'
                type = 'check-circle'
            />
        ) : (
            <Icon
                theme = 'twoTone'
                twoToneColor = '#eb2f96'
                type = 'clock-circle'
            />
        );

        return (
            <Modal
                onCancel = { this._hideTask }
                title = { <img src = '/static/favicon/beejee-20x20.png' /> }
                visible
                footer = { [
                    <Button
                        icon = 'close-circle'
                        key = 'back'
                        onClick = { this._hideTask }
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

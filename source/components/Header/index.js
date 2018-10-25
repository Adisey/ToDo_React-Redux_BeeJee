/**
 * Created by PhpStorm
 * Project p902-BeeJee-To-Do
 * User: Adisey
 * Date: 18.10.2018
 * Time: 13:51
 */
// Core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// antd
import { Avatar, Popover, Drawer } from 'antd';
// Redux Actions
import { authenticationAction } from '../../bus/authenticate/actions';
// Styles
import Styles from './styles.m.css';
// Components
import { ShowLogin } from '../';

const mapStateToProps = (state) => {
    return {
        authenticate: state.authenticate,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({ ...authenticationAction }, dispatch),
    };
};


class Header extends Component {
    render() {
        const { actions, authenticate } = this.props;
        const  isAuthenticated = authenticate.get('isAuthenticated');
        const isDraverLogin = authenticate.get('isDraverLogin');
        const _showDrawerLogin = () => {
            actions.showDrawerLogin();
        };
        const _hideDrawerLogin = () => {
            actions.hideDrawerLogin();
        };

        return (
            <div className = { Styles.header }>
                <div className = { Styles.avatarPlace }>
                    <Popover
                        content = { isAuthenticated ? 'Admin' : 'User' }
                        placement = 'bottomLeft'
                        title = { isAuthenticated ? 'Logout' : 'Login' }
                        trigger = 'hover'>
                        <Avatar
                            icon = 'user'
                            shape = 'square'
                            size = { 60 }
                            onClick = { _showDrawerLogin }
                        />
                        <p>{isAuthenticated ? <span>Admin</span> : 'User'}</p>
                    </Popover>
                </div>
                <div className = { Styles.title }>
                    <h2>
                        Adisey To Do - Тестовое задание от BeeJee
                    </h2>
                </div>
                <Drawer
                    closable = { false }
                    height = { isAuthenticated ? 180 : 300 }
                    onClose = { _hideDrawerLogin }
                    placement = 'top'
                    title = { <p>
                        <Avatar
                            icon = 'user'
                            shape = 'square'
                        /> {isAuthenticated ? 'Admin' : 'User'}
                              </p> }
                    visible = { isDraverLogin }>
                    <ShowLogin
                        actions = { actions }
                        authenticate = { authenticate }
                    />
                </Drawer>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Header);

/**
 * Created by PhpStorm
 * Project p902-BeeJee-ToDo
 * User: Adisey
 * Date: 18.10.2018
 * Time: 16:10
 */
// Core
import React, { Component } from 'react';
// antd
import { Avatar, Button } from 'antd';
// Styles
import Styles from './styles.m.css';
// Components
import { LoginForm } from '../';



export default class ShowLogin extends Component {
     _logOut = () => {
         const {logout} = this.props.actions;
         logout();
     };

     render() {
         const { actions, authenticate } = this.props;

         const  isAuthenticated = authenticate.get('isAuthenticated');
         const Logout = (
             <div>
                 <Button
                     icon = 'poweroff'
                     type = 'primary'
                     onClick = { this._logOut }>Logout
                 </Button>
             </div>
         );

         return (
             <div className = { Styles.showLogin }>
                 { isAuthenticated
                     ? Logout
                     : <LoginForm
                     actions = {actions}
                     authenticate = {authenticate}
                 />}
             </div>
         );
     }
}



/**
 * Created by PhpStorm
 * Project p902-BeeJee-ToDo
 * User: Adisey
 * Date: 18.10.2018
 * Time: 16:10
 */
// Core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// antd
import { Avatar, Button } from 'antd';
// Styles
import Styles from './styles.m.css';
// Redux Actions
import { authenticationAction } from '../../bus/authenticate/actions';
// Components
import { LoginForm } from '../';

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


class ShowLogin extends Component {
     _logOut = () => {
         const {logout} = this.props.actions;
         logout();
     };

     render() {
         const  isAuthenticated = this.props.authenticate.get('isAuthenticated');
         const Logout = (
             <div>
                 <Avatar
                     icon = 'user'
                     shape = 'square'
                     size = { 60 }
                 />
                 <Button
                     icon = 'poweroff'
                     type = 'primary'
                     onClick = { this._logOut }>Logout
                 </Button>
             </div>
         );

         return (
             <div className = { Styles.main }>
                 { isAuthenticated ? Logout : <LoginForm/>}
             </div>
         );
     }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ShowLogin);


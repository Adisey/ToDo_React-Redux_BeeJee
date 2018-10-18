// Core
import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
// Instruments
import { Formik } from 'formik';
import { login } from '../forms/shapes';
// ANTD
import { Form, Icon, Input, Button,   } from 'antd';
const FormItem = Form.Item;
//Styles
// import Styles from '../styles.m.css';
// Actions
import { authenticationAction } from '../../bus/authenticate/actions';

const mapStateToProps = (state) => {
    return {
        authenticate: state.authenticate,
    };
};

const mapDispathToProps = {
    loginAsync: authenticationAction.loginAsync,
};



class LoginForm extends Component {
    formikForm = createRef();

    render () {
        return (
            <Formik
                initialValues = { login.shape }
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
                    console.log('Formik props ->', props);

                    return (
                        <div>
                            <Form>
                                <FormItem
                                    help = { errors.email ? errors.email : '' }
                                    validateStatus = { errors.email ? 'error' : 'success' }
                                    hasFeedback >
                                    <Input
                                        defaultValue = { initialValues.email }
                                        name = 'email'
                                        onBlur = { handleBlur }
                                        onChange = { handleChange }
                                        placeholder = 'Login'
                                        prefix = { <Icon
                                            style = {{ color: 'rgba(0,0,0,.25)' }}
                                            type = 'mail'
                                                   /> }
                                        value = { values.email }
                                        onPressEnter = { this._submitForm }
                                    />
                                </FormItem>

                                <FormItem
                                    help = { errors.password ? errors.password : '' }
                                    validateStatus = { errors.password ? 'error' : 'success' }
                                    hasFeedback >
                                    <Input
                                        defaultValue = { initialValues.password }
                                        name = 'password'
                                        onBlur = { handleBlur }
                                        onChange = { handleChange }
                                        onPressEnter = { this._submitForm }
                                        placeholder = 'Password'
                                        prefix = { <Icon
                                            style = {{ color: 'rgba(0,0,0,.25)' }}
                                            type = 'unlock'
                                        /> }
                                        type = 'password'
                                        value = { values.password }
                                    />
                                </FormItem>

                            </Form>
                        </div>
                    );
                } }
                validationSchema = { login.schema }
                onSubmit = { this._submitForm }
            />

        );
    }
}

export default connect(
    mapStateToProps,
    mapDispathToProps,
)(LoginForm);

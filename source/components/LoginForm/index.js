// Core
import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
// Instruments
import { Formik } from 'formik';
import { login } from '../forms/shapes';
// ANTD
import { Form, Icon, Input, Button   } from 'antd';
const FormItem = Form.Item;
//Styles
import Styles from './styles.m.css';
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

    submitForm = (values) => {
        const {loginAsync} = this.props;
        console.log('Main SubmitForm ->', values);
        loginAsync(values);

    };

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
                    const _submitForm = () => {
                        if (isValid) {
                            this.submitForm(values);
                        }
                    };

                    return (
                        <div>
                            <Form>
                                <FormItem
                                    hasFeedback
                                    help = { errors.login ? errors.login : '' }
                                    validateStatus = { errors.login ? 'error' : 'success' }>
                                    <Input
                                        defaultValue = { initialValues.login }
                                        name = 'login'
                                        placeholder = 'Login'
                                        prefix = { <Icon
                                            style = {{ color: 'rgba(0,0,0,.25)' }}
                                            type = 'user'
                                                   /> }
                                        value = { values.login }
                                        onBlur = { handleBlur }
                                        onChange = { handleChange }
                                        onPressEnter = { _submitForm }
                                    />
                                </FormItem>

                                <FormItem
                                    hasFeedback
                                    help = { errors.password ? errors.password : '' }
                                    validateStatus = { errors.password ? 'error' : 'success' }>
                                    <Input
                                        defaultValue = { initialValues.password }
                                        name = 'password'
                                        placeholder = 'Password'
                                        prefix = { <Icon
                                            style = {{ color: 'rgba(0,0,0,.25)' }}
                                            type = 'unlock'
                                                   /> }
                                        type = 'password'
                                        value = { values.password }
                                        onBlur = { handleBlur }
                                        onChange = { handleChange }
                                        onPressEnter = { _submitForm }
                                    />
                                </FormItem>
                                <Button
                                    className = { Styles.loginButton }
                                    disabled = { !isValid }
                                    icon = 'login'
                                    type = 'primary'
                                    onClick = { _submitForm }>Login
                                </Button>

                            </Form>
                        </div>
                    );
                } }
                validationSchema = { login.schema }
            />

        );
    }
}

export default connect(
    mapStateToProps,
    mapDispathToProps,
)(LoginForm);

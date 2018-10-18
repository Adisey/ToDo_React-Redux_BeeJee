/**
 * Created by PhpStorm
 * Project p902-BeeJee-To-Do
 * User: Adisey
 * Date: 18.10.2018
 * Time: 13:42
 */

// Core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Styles
import Styles from './styles.m.css';

// Components
import { Header } from '../components';
// Redux Actions
import { authAction } from '../bus/authenticate/actions';

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({ ...authAction }, dispatch),
    };
};


class ToDoMain extends Component {
    componentDidMount () {
        const { actions } = this.props;
        actions.login();
    }


    render() {
        return (
            <div className = { Styles.main }>
                <Header/>
                <div className = { Styles.content }>
                    dlf;sldflks;ldkf;ls
                </div>
            </div>
        );
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ToDoMain);


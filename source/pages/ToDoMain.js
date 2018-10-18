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
import { Header, Tasks } from '../components';
// Redux Actions
import { authenticationAction } from '../bus/authenticate/actions';

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
                    <Tasks/>
                </div>
            </div>
        );
    }
}
export default connect(
    // ToDo: Поумать, нужны ли в этом компоненте Пропсы
    mapStateToProps,
    mapDispatchToProps,
)(ToDoMain);


/**
 * Created by PhpStorm
 * Project p902-BeeJee-ToDo
 * User: Adisey
 * Date: 19.10.2018
 * Time: 0:55
 */
// Core
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// Styles
import Styles from './styles.m.css';
// Components
import { TasksList } from '../';
// Actions
import { tasksActions } from '../../bus/tasks/actions';

const mapStateToProps = (state) => {
    return {
        authenticate: state.authenticate,
        tasks:        state.tasks,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({ ...tasksActions }, dispatch),
    };
};


class Tasks extends Component {
    render() {
        const {tasks} = this.props;

        return (
            <div className = { Styles.main }>
                       To Do
                <TasksList
                    tasks = { tasks }
                />
            </div>
        );
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Tasks);

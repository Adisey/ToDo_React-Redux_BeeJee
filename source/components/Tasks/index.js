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
import { TasksList, ModalPreviewTask, EditTask, SortTaskBar } from '../';
// Antd
import { Pagination} from 'antd';

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
    _onChangePagination =(pageNumber) => {
        this.props.actions.setPage(pageNumber);
    };

    render() {
        const {tasks, actions } = this.props;

        return (
            <div className = { Styles.tasks }>
                <EditTask
                    actions = { actions }
                    tasks = { tasks }
                />
                <SortTaskBar
                    actions = { actions }
                    tasks = { tasks }
                />
                <TasksList
                    actions = { actions }
                    tasks = { tasks }
                />
                <Pagination
                    defaultCurrent = { Number(tasks.get('page')) }
                    defaultPageSize = { 3 }
                    onChange = { this._onChangePagination }
                    showQuickJumper
                    total = { Number(tasks.get('total_task_count')) }
                />
                // Скрытое модальное окно
                {tasks.get('isModalPreviewTask') ? <ModalPreviewTask
                    actions = { actions }
                    tasks = { tasks }
                /> : null}
            </div>
        );
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Tasks);

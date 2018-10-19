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
// Antd
import { Pagination, Radio, Icon } from 'antd';
const RadioGroup = Radio.Group;

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

    _onChangeSort =(element) => {
        this.props.actions.sortTask(element.target.value);
    };

    _onChangeSortOrder =(element) => {
        this.props.actions.sortOrderTask(element.target.value);
    };

    render() {
        const {tasks} = this.props;

        return (
            <div className = { Styles.main }>
                <div className = { Styles.sort }>
                    <h4>Сортировать по</h4>
                    <div>

                        <div>направление </div>
                        <Radio.Group
                            buttonStyle = 'solid'
                            defaultValue = { tasks.get('sort_direction') }
                            size = 'small'
                            onChange = { this._onChangeSortOrder }
                        >
                            <Radio.Button
                                value = 'asc' ><Icon
                                    theme = 'outlined'
                                    type = 'up'
                                />
                            </Radio.Button>
                            <Radio.Button
                                value = 'desc' ><Icon
                                    theme = 'outlined'
                                    type = 'down'
                                />
                            </Radio.Button>
                        </Radio.Group>
                        <div>столбец</div>
                        <RadioGroup
                            onChange = { this._onChangeSort }
                            value = { tasks.get('sort_field') }>
                            <Radio value = { 'id' }>ID</Radio>
                            <Radio value = { 'username' }>Пользователю</Radio>
                            <Radio value = { 'email' }>Email</Radio>
                            <Radio value = { 'status' }>Статусу</Radio>
                        </RadioGroup>

                    </div>
                </div>

                <TasksList
                    tasks = { tasks }
                />
                <Pagination
                    defaultCurrent = { Number(tasks.get('page')) }
                    defaultPageSize = { 3 }
                    onChange = { this._onChangePagination }
                    showQuickJumper
                    total = { Number(tasks.get('total_task_count')) }
                />
            </div>
        );
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Tasks);

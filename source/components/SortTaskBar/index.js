/**
 * Created by PhpStorm
 * Project p902-BeeJee-ToDo
 * User: Adisey
 * Date: 19.10.2018
 * Time: 23:54
 */
// Core
import React, { Component } from 'react';
// Antd
import { Radio, Icon } from 'antd';
const RadioGroup = Radio.Group;

// Styles
import Styles from './styles.m.css';



export default class SortTaskBar extends Component {
    _onChangeSort = (element) => {
        this.props.actions.sortTask(element.target.value);
    };

    _onChangeSortOrder = (element) => {
        this.props.actions.sortOrderTask(element.target.value);
    };

    render() {
        const { tasks } = this.props;
        console.log('SortTaskBar -> this.props ->', this.props);
        return (
            <div className = { Styles.sort }>
                <h4>Сортировать по</h4>
                <div>

                    <div>направление </div>
                    <Radio.Group
                        buttonStyle = 'solid'
                        defaultValue = { tasks.get('sort_direction') }
                        size = 'small'
                        onChange = { this._onChangeSortOrder }>
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
                        value = { tasks.get('sort_field') }
                        onChange = { this._onChangeSort }>
                        <Radio value = { 'id' }>ID</Radio>
                        <Radio value = { 'username' }>Пользователю</Radio>
                        <Radio value = { 'email' }>Email</Radio>
                        <Radio value = { 'status' }>Статусу</Radio>
                    </RadioGroup>

                </div>
            </div>

        )



    }
}


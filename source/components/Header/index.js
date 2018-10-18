/**
 * Created by PhpStorm
 * Project p902-BeeJee-ToDo
 * User: Adisey
 * Date: 18.10.2018
 * Time: 13:51
 */
// Core
import React, { Component } from 'react';
// Styles
import Styles from './styles.m.css';

export default class Header extends Component {
    render() {
        return (
            <div className = { Styles.main }>
                <div className = { Styles.title }>
                    <h2>
                        Adisey ToDo - Тестовое задание от BeeJee
                    </h2>
                </div>
                <div className = { Styles.login }>
                    Login
                </div>

            </div>
        );
    }
}

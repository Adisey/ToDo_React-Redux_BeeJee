// Core
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './init/store';
// antd
import { LocaleProvider } from 'antd';
import ruRU from 'antd/lib/locale-provider/ru_RU';
// Styles
import 'antd/dist/antd.css';
import './styles.css';
// Theme
import './theme/init';
// Page
import {ToDoMain} from './pages';

ReactDOM.render(
    <Provider store = { store }>
        <LocaleProvider locale = { ruRU }>
            <ToDoMain/>
        </LocaleProvider>
    </Provider>,
    document.getElementById('app'),
);

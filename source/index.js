// Core
import React from 'react';
import ReactDOM from 'react-dom';
// Styles
import './styles.css';
// Theme
import './theme/init';
// Page
import {ToDoMain} from './pages';

ReactDOM.render(<ToDoMain/>, document.getElementById('app'));

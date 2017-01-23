import React from 'react';
import ReactDOM from 'react-dom';
import TicTacToe from './lib/TicTacToe.js';
import './node_modules/normalize.css/normalize.css';
import './sass/style.scss';

'use strict';

ReactDOM.render(
  <TicTacToe url = "http://606ep.ru:8080"/>,
  document.getElementById('container')
);
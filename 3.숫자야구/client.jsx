// const React = require('react');
// const ReactDOM = require('react-dom');
//const NumberBaseball = require('./NumberBaseball')


//React 18 ver
import React from 'react';
import ReactDOM from 'react-dom/client';
import NumberBaseball from './NumberBaseball';



// ReactDOM.render(<NumberBaseball/>, document.querySelector('#root'))
ReactDOM.createRoot(document.querySelector('#root')).render(<NumberBaseball/> )
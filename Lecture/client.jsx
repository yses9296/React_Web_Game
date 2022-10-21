// const React = require('react');
// const ReactDOM = require('react-dom');

// const WordRelay = require('./components/WordRelay')
// ReactDOM.render(<WordRelay/>, document.querySelector('#root'))

import React from 'react';
import ReactDOM from 'react-dom/client';
import WordRelay from './components/WordRelay';
import RenderTest from './components/RenderTest';

ReactDOM.createRoot(document.querySelector('#root')).render(<RenderTest/> )


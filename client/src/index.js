import React from 'react';
import ReactDOM from 'react-dom';
import {ClientComponent} from './components/client/Client';
console.log('index.js');

ReactDOM.render(
    <ClientComponent />,
    document.getElementById('client')
);
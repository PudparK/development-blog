import css from './app.sass';
console.log('testing hot module replacement.');

/*console.log("Hello from app.js");

const css = require('./app.sass');

import React from 'react';
import ReactDOM from 'react-dom';

var hello = <h1>Hello, world poop!</h1>;

ReactDOM.render(
  hello,
  document.getElementById('root')
);*/

$(document).ready(function(){
    $(".container").click(function(){
      console.log("I'm working");
    });
});

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//  Render the application into the given element
const mount = (el) => {
  ReactDOM.render(<App />, el);
};

//  Locate the root element into which the application will be rendered
const devRoot = document.querySelector('#root');

//  Check whether the element was found
if (devRoot) {
  //  The element was found so it is assumed that the application is running in isolation
  //  Mount the application into the element
  mount(devRoot);
}

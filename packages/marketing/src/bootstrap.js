import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './App';

//  Render the application into the given element
const mount = (el, { onNavigate, defaultHistory, initialPath }) => {
  //  Create a memory history
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath],
    });

  //  Provide the onNavigate function to the history so that it
  //  is invoked whenever the history is updated
  if (onNavigate) {
    history.listen(onNavigate);
  }

  //  Render the application and pass it the memory history
  ReactDOM.render(<App history={history} />, el);

  //  Return callbacks to the parent application
  return {
    //  Return a callback to be invoked whenever the parent application
    //  navigates to a URL
    onParentNavigate({ pathname: nextPathname }) {
      //  Get the current pathname
      const { pathname: currentPathname } = history.location;

      //  Make sure the current and next pathnames are different
      //  to prevent an infinite loop
      if (nextPathname !== currentPathname) {
        //  Navigate to the next pathname
        history.push(nextPathname);
      }
    },
  };
};

//  Context / Situation #1
//  This file is being run in development in isolation
//  The local index.html file which definitely has an element with an id of '_marketing-dev-root'
//  The app should immediately be rendered into that element

//  Check whether the application is running in development mode
if (process.env.NODE_ENV === 'development') {
  //  Check whether the application is running in isolation
  const devRoot = document.querySelector('#_marketing-dev-root');

  //  Check whether the element was found
  if (devRoot) {
    //  The element was found so it is assumed that the application is running in isolation
    //  Mount the application into the element
    mount(devRoot, {
      defaultHistory: createBrowserHistory(),
    });
  }
}

//  Context / Situation #2
//  This file is being run in development or production via the container app
//  There is not guarantee that an element with an id of '_marketing-dev-root' exists
//  The app should not be immediately rendered

//  Export the mount function to allow the parent container to control when the application is rendered
export { mount };

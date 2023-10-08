import { createApp } from 'vue';
import Dashboard from './components/Dashboard.vue';

//  Render the application into the given element
const mount = (el) => {
  //  Create the Vue Dashboard app
  const app = createApp(Dashboard);

  //  Mount the application
  app.mount(el);
};

//  Context / Situation #1
//  This file is being run in development in isolation
//  The local index.html file which definitely has an element with an id of '_dashboard-dev-root'
//  The app should immediately be rendered into that element

//  Check whether the application is running in development mode
if (process.env.NODE_ENV === 'development') {
  //  Check whether the application is running in isolation
  const devRoot = document.querySelector('#_dashboard-dev-root');

  //  Check whether the element was found
  if (devRoot) {
    //  The element was found so it is assumed that the application is running in isolation
    //  Mount the application into the element
    mount(devRoot);
  }
}

//  Context / Situation #2
//  This file is being run in development or production via the container app
//  There is not guarantee that an element with an id of '_dashboard-dev-root' exists
//  The app should not be immediately rendered

//  Export the mount function to allow the parent container to control when the application is rendered
export { mount };

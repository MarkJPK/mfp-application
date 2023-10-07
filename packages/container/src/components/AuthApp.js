import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { mount } from 'auth/AuthApp';

export default () => {
  const ref = useRef(null);
  const history = useHistory();

  //  Run the following function once when the component mounts
  useEffect(() => {
    //  Mount the application
    const { onParentNavigate } = mount(ref.current, {
      //  Provide an initial path for the component
      initialPath: history.location.pathname,

      //  Provide a callback that will be invoked whenever the browser history changes
      //  with the child application
      onNavigate: ({ pathname: nextPathname }) => {
        //  Get the current pathname
        const { pathname: currentPathname } = history.location;

        //  Make sure the current and next pathnames are different
        //  to prevent an infinite loop
        if (nextPathname !== currentPathname) {
          //  Navigate to the next pathname
          history.push(nextPathname);
        }
      },
    });

    //  Provide the onParentNavigate function to the history so that it
    //  is invoked whenever the history is updated
    history.listen(onParentNavigate);
  }, []);

  return <div ref={ref} />;
};

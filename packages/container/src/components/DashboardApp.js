import React, { useRef, useEffect } from 'react';
import { mount } from 'dashboard/DashboardApp';

export default () => {
  const ref = useRef(null);

  //  Run the following function once when the component mounts
  useEffect(() => {
    //  Mount the application
    mount(ref.current);
  }, []);

  return <div ref={ref} />;
};

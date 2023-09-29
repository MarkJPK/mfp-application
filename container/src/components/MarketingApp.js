import React, { useRef, useEffect } from 'react';
import { mount } from 'marketing/MarketingApp';

export default () => {
  const ref = useRef(null);

  //  Run the following function once when the component mounts
  useEffect(() => {
    mount(ref.current);
  });

  return <div ref={ref} />;
};

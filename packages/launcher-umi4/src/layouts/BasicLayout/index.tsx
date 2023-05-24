import React from 'react';
import { useOutlet } from '@umijs/max';

const BasicLayout: React.FC = () => {
  const outlet = useOutlet();
  return (
    <>
      我是主应用
      {outlet}
    </>
  )
}

export default BasicLayout;

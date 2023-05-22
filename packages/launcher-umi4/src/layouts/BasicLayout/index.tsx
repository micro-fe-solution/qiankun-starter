import React from 'react';

interface BasicLayoutProps {
  children: React.ReactNode;
}

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  return (
    <>
      我是主应用
      {props.children}
    </>
  )
}

export default BasicLayout;

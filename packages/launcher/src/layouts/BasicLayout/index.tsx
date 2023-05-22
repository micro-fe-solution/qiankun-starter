import React from 'react';
import { useOutlet } from 'react-router-dom'

export const BasicLayout: React.FC = () => {
  const outlet = useOutlet();

  return (
    <>
      我是主应用
      {outlet}
    </>
  )
}

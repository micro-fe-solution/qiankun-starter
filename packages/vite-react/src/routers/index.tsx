import React from 'react';
import { useRoutes } from 'react-router-dom';
import routes from '~react-pages'

console.log(routes);

export const Router: React.FC = () => {
  return (
    <>
      {useRoutes(routes)}
    </>
  )
}

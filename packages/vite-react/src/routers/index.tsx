import React from 'react';
import { useRoutes } from 'react-router-dom';
import routes from '~react-pages'

export const Router: React.FC = () => {
  return (
    <>
      {useRoutes(routes)}
    </>
  )
}

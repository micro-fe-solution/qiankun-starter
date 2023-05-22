import React from 'react'
import { useRoutes, Navigate, type NonIndexRouteObject } from 'react-router-dom'
import { BasicLayout } from '@/layouts/BasicLayout';
import { Lazy } from '@/components/Lazy';
import { MicroApp } from '@/components/MicroApp';
import Login from '@/pages/login'

export const routes: NonIndexRouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/home" />
  },
  {
    element: <BasicLayout />,
    children: [
      {
        path: 'home',
        element: <Lazy entry={() => import('@/pages/home')} />,
      },
      {
        path: 'micro',
        children: [
          {
            path: 'map',
            element: (
              <MicroApp
                name="map"
                sandbox={{
                  experimentalStyleIsolation: true,
                }}
                props={{}}
              />
            ),
          },
        ]
      },
    ],
  },
  {
    path: 'login',
    element: <Login />,
  }
];

export const Router: React.FC = () => {
  return (
    <>
      {useRoutes(routes)}
    </>
  )
}

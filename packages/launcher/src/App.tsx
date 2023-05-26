import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QiankunConfig } from '@pansy/qiankun-react-shared';
import { Router } from '@/routers';

const apps = [
  {
    name: 'umi4',
    entry: '//localhost:9501'
  },
  {
    name: 'vite-react',
    entry: '//localhost:9502'
  },
  {
    name: 'vite-svelte',
    entry: '//localhost:9503'
  },
  {
    name: 'vite-vue3',
    entry: '//localhost:9504'
  },
];

const App: React.FC = () => {
  return (
    <QiankunConfig apps={apps}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </QiankunConfig>
  )
}

export default App

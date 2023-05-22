import { defineConfig } from 'umi';
import microApps from './micro-apps';

export default defineConfig({
  qiankun: {
    master: {
      apps: microApps,
    },
  },
  routes: [
    {
      path: '/login',
      component: './login',
    },
    {
      path: '/',
      component: '../layouts/BasicLayout',
      routes: [
        {
          path: '/vite-react',
          microApp: 'vite-react',
        },
      ],
    },
  ],
})

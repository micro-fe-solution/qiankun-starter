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
          path: '/umi3',
          microApp: 'umi3',
        },
        {
          path: '/umi4',
          microApp: 'umi4',
        },
        {
          path: '/vite-react',
          microApp: 'vite-react',
        },
        {
          path: '/vite-svelte',
          microApp: 'vite-svelte',
        },
        {
          path: '/vite-vue3',
          microApp: 'vite-vue3',
        },
      ],
    },
  ],
})

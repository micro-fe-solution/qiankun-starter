import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import legacy from '@vitejs/plugin-legacy';
import { legacyQiankun } from 'vite-plugin-legacy-qiankun';

const microName = 'vite-preact';

// https://vitejs.dev/config/
export default defineConfig({
  base: `/${microName}/`,
  plugins: [
    preact(),
    legacy({
      targets: {
        chrome: '58',
      },
    }),
    // @ts-ignore
    legacyQiankun({
      name: microName,
      devSandbox: true,
    }),
  ],
  server: {
    port: 9503,
  },
});

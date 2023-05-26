import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { legacyQiankun } from 'vite-plugin-legacy-qiankun'

const microName = 'vite-svelte';

// https://vitejs.dev/config/
export default defineConfig({
  base: `/${microName}/`,
  plugins: [
    svelte(),
    legacy({
      targets: {
        chrome: '58',
      }
    }),
    legacyQiankun({
      name: microName,
      devSandbox: true
    }),
  ],
  server: {
    port: 9503,
  },
})

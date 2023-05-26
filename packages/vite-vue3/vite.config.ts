import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import { legacyQiankun } from 'vite-plugin-legacy-qiankun'

const microName = 'vite-vue3';

// https://vitejs.dev/config/
export default defineConfig({
  base: `/${microName}/`,
  plugins: [
    vue(),
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
    port: 9504,
  },
})

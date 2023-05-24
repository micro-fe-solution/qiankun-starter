import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'
import tsconfigPaths from 'vite-tsconfig-paths'
import { createHtmlPlugin } from 'vite-plugin-html'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
    legacy({
      targets: {
        "chrome": "58",
      }
    }),
    tsconfigPaths({
      root: __dirname,
    }),
    createHtmlPlugin({
      inject: {
        data: {
          title: 'Vite React Starter'
        }
      }
    }),
  ],
  server: {
    host: true,
    open: true,
    port: 9500,
  },
})

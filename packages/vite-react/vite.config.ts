import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import pages from 'vite-plugin-pages'
import legacy from '@vitejs/plugin-legacy'
import { legacyQiankun } from 'vite-plugin-legacy-qiankun'
import tsconfigPaths from 'vite-tsconfig-paths'
import { createHtmlPlugin } from 'vite-plugin-html'

// https://vitejs.dev/config/
export default defineConfig({
  base: `/vite-react/`,
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  plugins: [
    react({
      fastRefresh: false,
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
    pages({
      resolver: 'react',
      importMode: 'sync',
      routeStyle: 'next',
      extensions: ['tsx', 'jsx'],
      exclude: [
        '**/components/**/*',
        '**/utils/**/*',
        '**/lib/**/*',
        '**/hooks/**/*',
        '**/model.tsx',
        '**/tests/**/*',
        '**/__test__/**/*'
      ],
    }),
    legacy({
      targets: {
        chrome: '58',
      }
    }),
    legacyQiankun({
      name: 'vite-react',
      devSandbox: true
    }),
    tsconfigPaths(),
    createHtmlPlugin({
      inject: {
        data: {
          title: 'Vite React Starter'
        }
      }
    }),
  ],
  server: {
    port: 9501,
  },
})
import { createApp } from 'vue'
import { createLifecyle, getMicroApp } from 'vite-plugin-legacy-qiankun'
import App from './App.vue'

const appName = 'vite-vue3';
const microApp = getMicroApp(appName)

const render = () => {
  createApp(App).mount('#app')
}

if (microApp.__POWERED_BY_QIANKUN__) {
    createLifecyle(appName, {
      mount() {
        console.log('mount', appName);
        render();
      },
      bootstrap() {
        console.log('bootstrap', appName);
      },
      unmount() {
        console.log('unmount', appName)
      }
    })
  } else {
    render();
  }
import App from './App.svelte'
import { createLifecyle, getMicroApp } from 'vite-plugin-legacy-qiankun'

import type { SvelteComponent } from 'svelte';

const appName = 'svelte';
const microApp = getMicroApp(appName)

let app: SvelteComponent | null = null;
function render() {
  app = new App({
    target: document.querySelector('#app'),
  });
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

export default app

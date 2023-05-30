import { render as preactRender } from 'preact';
import { createLifecyle, getMicroApp } from 'vite-plugin-legacy-qiankun';
import { App } from './app.tsx';

const appName = 'vite-preact';
const microApp = getMicroApp(appName);

const render = () => {
  preactRender(<App />, document.getElementById(appName) as HTMLElement);
};

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
      console.log('unmount', appName);
    },
  });
} else {
  render();
}

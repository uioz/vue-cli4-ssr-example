import { createApp } from "./main";

const { App, router ,store } = createApp();

// 替换 store 中的状态
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
  App.$mount('#app');
});
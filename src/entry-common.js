/**
 * this file is depended on main.js and main-ssr.js
 */

import Vue from 'vue';
import App from './App.vue';
import { createRouter } from "./router/router";
import { createStore } from "./store/store";

Vue.config.productionTip = false;

export function createApp() {
  // 创建 router 实例
  const router = createRouter();
  const store = createStore();

  const app = new Vue({
    // 注入 router 到根 Vue 实例
    // TODO 如果 router 只在 main.js 中挂载会怎么样
    router,
    store,
    render: h => h(App)
  });

  // 返回 app 和 router
  return { app, router, store };
}


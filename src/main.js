import Vue from 'vue'
import AppVue from './App.vue'
import { createRouter } from './router'
import { createStore } from './store'

Vue.config.productionTip = false

/**
 * 以工厂形式创建 App 
 */
export function createApp() {

  const router = createRouter();
  const store = createStore();

  const App = new Vue({
    router,
    store,
    render: h => h(AppVue)
  });

  return { App, router, store };
}
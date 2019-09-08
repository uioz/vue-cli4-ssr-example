// store.js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

function delay(delay) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export function createStore() {
  return new Vuex.Store({
    state: {
      items: {}
    },
    actions: {
      async fetchItem({ commit }, id) {
        // `store.dispatch()` 会返回 Promise，
        // 以便我们能够知道数据在何时更新
        await delay(1000);// 模拟异步请求
        commit('setItem', { id, item: 'hello world' });

      }
    },
    mutations: {
      setItem(state, { id, item }) {
        Vue.set(state.items, id, item);
      }
    }
  });
}
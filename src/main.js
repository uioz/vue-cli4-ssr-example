/**
 * 客户端入口
 */

import { createApp } from "./entry-common";

const { app, router, store } = createApp();

/**
 * 试想一下当这端代码运行的时候, Vue 每个组件的数据以及 Store 的数据都分别被插入到了 HTML 以及全局变量上.
 * Store 此时还是空的, 我们的数据以及存在于全局变量上了
 * 此时我们使用这个数据导入到 Store 中从而获取服务渲染时保留的状态
 */
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}


/**
 * 服务端渲染中, 服务端会将所有的异步组件解析完成后输出,
 * 也就是说服务端的 router 知晓了所有组件的构成.
 * 但是客户端的 router 对于异步组件是懒加载的只有所有内容解析后
 * 客户端的 router 才会和服务端的 router 一致.
 * 我们使用 onReady 钩子只有当解析完成后才进行内容挂载.
 */
router.onReady(() => {
  app.$mount('#app');
});
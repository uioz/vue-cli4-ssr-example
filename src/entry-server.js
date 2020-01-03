/**
 * 本文件提供了一个适用于 Express 的中间件. 
 * 主要导出是一个函数 createAppWithContext 该函数接收一个 context(上下文). 
 * 然后利用 context 中提供的信息, 让路由区解析对应的组件.
 * 如果找到了利用 Promise.then 携带创建完成的组件树返回(即App), 等待交由渲染.
 * 反之 Promise.catch
 */

/* eslint-disable */

import { createApp } from './main';

function haveAsyncDataProp(component) {
  if (component.asyncData !== undefined) {
    return true;
  } else {
    return false;
  }
}

/**
 * 
 * @param {string} context.url 用于路由解析的地址
 */
export default function createAppWithContext(context) {

  // 因为有可能会是异步路由钩子函数或组件，所以我们将返回一个 Promise，
  // 以便服务器能够等待所有的内容在渲染前，
  // 就已经准备就绪。
  return new Promise(
    (resolve, reject) => {
      // 利用工厂函数来获取 vm , store , router 的实例
      const { App, store, router } = createApp()

      // 设置服务器端 router 的位置
      router.push(context.url)

      // 等到 router 将可能的异步组件和钩子函数解析完
      router.onReady(async () => {

        const matchedComponents = router.getMatchedComponents()

        // 匹配不到的路由，执行 reject 函数，并返回 404
        if (!matchedComponents.length) {
          return reject({ code: 404 })
        }

        const componentWithAsyncDataTaskQueue = [];

        for (const matchedComponent of matchedComponents) {

          if (haveAsyncDataProp(matchedComponent)) {
            componentWithAsyncDataTaskQueue.push(
              matchedComponent.asyncData({
                store,
                route:router.currentRoute
              })
            );
          }

        }

        for (const asyncTask of componentWithAsyncDataTaskQueue) {
          await asyncTask;
        }

        debugger;

        // 在所有预取钩子(preFetch hook) resolve 后，
        // 我们的 store 现在已经填充入渲染应用程序所需的状态。
        // 当我们将状态附加到上下文，
        // 并且 `template` 选项用于 renderer 时，
        // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
        context.state = store.state;

        // Promise 应该 resolve 应用程序实例，以便它可以渲染
        resolve(App);

      }, reject)
    }
  )

}
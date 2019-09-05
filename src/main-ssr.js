/**
 * 服务端入口
 */
import { createApp } from "./entry-common";

export default (context) => new Promise((resolve, reject) => {

  const { app, router, store } = createApp();

  router.push(context.url);
  router.onReady(
    () => {

      // 1. 获取匹配到的组件组成的数组 [components,components,....]
      const matchedComponents = router.getMatchedComponents()
      console.log(matchedComponents.length);
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }

      // 2. 迭代组件并且调用组件的 asyncData 方法, 将数据移动到 store 上
      Promise.all(
        matchedComponents.map(
          component => component.asyncData ? component.asyncData(store, router) : undefined
        )
      ).then(
        () => {

          // 3. 此时 store 中充满了该路由下对应的数据, 将数据挂载到 context 上
          context.state = store.state;
          resolve(app);

        }, reject
      );

    }, reject);

});


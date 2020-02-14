# 简介

基于 vue-cli4 的服务端渲染示例

a server side renderer example of vue based on vue-cli4. 

# 运行

```
npm run dev
```

# 目录说明

目录分为两个部分:
1. server 服务端代码交由 Node 执行
2. src 源码存放的位置, 该目录内部基础结构基于 vue-cli 创建, 结合了 vuex 以及 vue-router 并且按照官方服务端渲染指南提供了服务端渲染支持.

+ -- server 服务端代码
  + -- dev.js 服务端入口(开发模式)
  + -- index.js 服务端入口
+ -- src 客户端端代码(目录结构同官方服务端渲染指南一致)
  + -- entry-client.js 客户端打包入口
  + -- entry-server.js 服务端打包入口
  + -- main.js 被上述两者依赖的共用模块
  + -- template.html 渲染用模板

# 命令说明

## 用于 spa

和 vue-cli 提供的命令一致:
```
npm run serve
npm run build
npm run lint
```

## 开发

| 命令 | 输出 | 使用说明 |
| ---- | ---- | -------- |
| `serve:renderer` | devServer + manifest.json | 相当于 `npm run serve` + 输出 manifest.json |
| `dev` | Server + `serve:renderer` | 开发模式, 在此模式下会启动开发服务器和热更新服务器 |

### 原理

首先使用 vue-cli4 来启动一个热更新服务器且监听 3000 端口, 这里 spa 的开发模式一致, 唯一不同的是在这种情况下使用了 `vue-server-renderer` 来生成 `manifest.json` 文件.  
其次启动渲染服务器并监听 8080 端口, 通过 webpack 监听 src 目录的文件修改来即时编译出 `vue-ssr-server-bundle.json` 文件.  

当请求到达渲染服务器后, 渲染页面依赖 `vue-ssr-server-bundle.json` 以及 `vue-ssr-client-manifest.json` 文件, `vue-ssr-server-bundle.json` 已经给出, `vue-ssr-client-manifest.json` 则会通过请求 devServer(即 3000 端口) 来获取, 利用这两个文件编译然后返回编译后的 HTML 文件.

## 构建

| 命令 | 说明 |
| ---- | ---- |
| `build:client` | 以生产模式构建客户端代码 |
| `build:server` | 以生产模式构建服务端代码 |
| `build:client-dev` | 构建客户端代码并且输出 sourceMap |
| `build:server-dev` | 构建服务端代码并且输出 sourceMap |
| `build:all` | 以生产模式构建 |
| `build:all-dev` | 以开发模式构建 |

## 运行

**注意**: 该模式下的代码仅用于测试, 入口文件位于 `server/index.js`.

| 命令 | 说明 |
| ---- | ---- |
| `start` | 开启渲染服务(打包后使用) |

# 依赖说明

常规依赖:
1. vue
2. vue-cli
3. vuex
4. vue-router
5. vue-server-renderer

服务端依赖:
1. express 用于启动渲染服务

构建依赖:
1. cross-env 用于在执行 npm 脚本的时候注入环境变量
2. lodash.merge 在 vue.config.js 中合并配置
3. null-loader 在 vue.config.js 中替换不需要使用到的 loader
4. concurrently 用于 npm 脚本中用于同时执行多条命令

# 如何修改配置

1. 大部分的配置都集中到了 vue.config.js 中
2. 端口配置请修改 `config.js`

# 注意事项

1. 在 babel.config.js 中提供了一项简单的优化, 即用于服务端渲染的代码的依赖会根据打包时候的环境来动态的决定, 如果打包的 node 版本和运行的 node 版本不一致建议手动修改为默认值或者适用于目标环境的配置.

# next

1. 测试所有 npm 脚本执行是否正确
2. 移除 src 中的多余代码
3. 资源存放位置优化目前 ico 还无法引入
4. server 端代码完善, 添加一些基本的优化
5. 打包优化 dist 应该在 build 前移除

# 参考

> https://github.com/ediaos/vue-cli3-ssr-project
> https://github.com/lentoo/vue-cli-ssr-example
> https://github.com/vuejs/vue-hackernews-2.0

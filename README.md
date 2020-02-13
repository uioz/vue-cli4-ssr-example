# vue-ssr

# 目录说明

目录分为两个部分:
1. server 服务端代码交由 Node 执行
2. src 源码存放的位置, 该目录内部基础结构基于 vue-cli 创建, 结合了 vuex 以及 vue-router 并且按照官方服务端渲染指南提供了服务端渲染支持.

+ -- server 服务端代码
  + -- index.js 服务端入口
+ -- src 客户端端代码(不可以直接在 node 中运行, 需要经过 webpack 打包)
  + -- entry-client.js 客户端打包入口
  + -- entry-server.js 服务端打包入口
  + -- main.js 被上述两者依赖的共用模块

# 脚本说明

分为三个部分:
1. spa 模式
2. 开发模式
3. 构建模式

## spa 模式

这个模式和 vue-cli 完全一致你可以执行:
```
npm run serve
npm run build
npm run lint
```

## 开发模式

| 命令 | 输出 | 使用说明 |
| ---- | ---- | -------- |
| `serve:renderer` | devServer + manifest.json | dev 模式的前置模式, 其目的是在开启 devServer 的同时输出 manifest.json |
| dev | Server + `serve:renderer` | 开发模式, 在此模式下会启动开发服务器和热更新服务器 |

## 构建模式

| 命令 | 说明 |
| ---- | ---- |
| `build:client` | 以生产模式构建客户端代码 |
| `build:server` | 以生产模式构建服务端代码 |
| `build:client-dev` | 构建客户端代码并且输出 sourceMap |
| `build:server-dev` | 构建服务端代码并且输出 sourceMap |
| `build:all` | 以生产模式构建 |
| `build:all-dev` | 以开发模式构建 |


# 依赖说明

常规依赖:
1. vue
2. vue-cli
3. vuex
4. vue-router
5. vue-server-renderer

服务端依赖:
1. express

打包依赖:
1. cross-env 用于在执行 npm 脚本的时候注入环境变量
2. lodash.merge 在 vue.config.js 中合并配置
3. null-loader 在 vue.config.js 中替换不需要使用到的 loader

# 如何修改配置

所有的配置都集中到了 vue.config.js 中, 修改该文件即可.

# 注意事项
在 babel.config.js 中提供了一项简单的优化, 即用于服务端渲染的代码的依赖会根据打包时候的环境来动态的决定, 如果打包的 node 版本和运行的 node 版本不一致建议手动修改为默认值或者适用于目标环境的配置.


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

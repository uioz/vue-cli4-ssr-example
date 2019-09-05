# vue-ssr

# 构建说明

该项目是 SSR 项目并且基于 Vue-Cli3 构建, 所以和直接使用 webpack 构建略有区别. Vue-Cli3 提供了打包 Vue 集成环境(基于webpack)隐藏掉了
webpack 配置文件, 改为 `vue.config.js` 进行配置, 但是 `Vue-Cli` 无非是 webpack 的一层包装而已所以 `Vue-Cli` 允许你通过 `vue.config.js` 来修改 webpack 配置.

使用 SSR 渲染我们要准备两份不同的配置文件, 因为要生成两种 bundle 一种面向服务器一种面向浏览器. 我们在 `vue.config.js` 中添加了这两种配置.

所以构建命令分为三种类型:
1. 面向服务器
2. 面向客户端(ssr)
3. 面向客户端(spa)

## 面向服务器

### 构建
```
npm run build:server
```

### 运行
```
npm run serve:server
```

## 面向客户端(ssr)

### 构建
```
npm run build:client
```

### 运行
```
npm run serve:client
```

## 面向客户端(spa)

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

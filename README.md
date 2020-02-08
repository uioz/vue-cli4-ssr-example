# vue-ssr

# 目录说明
+ -- server 服务端代码
  + -- index.js 服务端入口
+ -- src 客户端端代码(不可以直接在 node 中运行, 需要经过 webpack 打包)
  + -- entry-client.js 客户端打包入口
  + -- entry-server.js 服务端打包入口
  + -- main.js 被上述两者依赖的共用模块

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

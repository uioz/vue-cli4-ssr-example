const merge = require("lodash.merge");

let baseConfig = {
  outputDir: undefined,
  // assetsDir: undefined,
  // publicPath:'/static',
  configureWebpack: {
    // 默认执行 npm run serve 和 npm run build 进行单页面打包 
    // 但是已经不是默认 vue-cli 的 src/main.js 这里提提供了默认入口
    entry: './src/entry-client.js',
  }
}

function buildForClient() {
  // env from .env file
  return process.env.BUILD_TARGET === 'CLIENT';
}

function buildForServer() {
  // env from .env.server file
  return process.env.BUILD_TARGET === 'SERVER';
}

function runInProduction() {
  return process.env.NODE_ENV === 'production';
}

if (runInProduction() && (buildForClient() || buildForServer())) {

  baseConfig = merge(baseConfig, {
    css: {
      // to disabled mini-css-extract-plugin for production
      // see https://github.com/webpack-contrib/mini-css-extract-plugin/issues/90
      extract: false
    },
    configureWebpack: {
      optimization: {
        splitChunks: false
      },
    }
  });

}

if (buildForClient() && runInProduction()) {

  const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');

  baseConfig = merge(baseConfig, {
    outputDir: './dist/client',
    configureWebpack: {
      entry: './src/entry-client.js',
      target: 'web',
      // 分离 runtime 
      // optimization: {
      //   splitChunks: false
      // runtimeChunk: {
      //   name:'manifest'
      // }
      // },
      plugins: [
        new VueSSRClientPlugin()
      ]
    }
  });

}

if (buildForServer() && runInProduction()) {

  const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
  const nodeExternalsNode = require('webpack-node-externals');

  baseConfig = merge(baseConfig, {
    outputDir: './dist/server',
    configureWebpack: {
      entry: './src/entry-server.js',
      // 这允许 webpack 以 Node 适用方式(Node-appropriate fashion)处理动态导入(dynamic import)，
      // 并且还会在编译 Vue 组件时，
      // 告知 `vue-loader` 输送面向服务器代码(server-oriented code)。
      target: 'node',
      // 对 bundle renderer 提供 source map 支持
      devtool: 'source-map',
      // 此处告知 server bundle 使用 Node 风格导出模块(Node-style exports)
      output: {
        libraryTarget: 'commonjs2'
      },
      // 外置化应用程序依赖模块。可以使服务器构建速度更快，
      // 并生成较小的 bundle 文件。
      externals: nodeExternalsNode({
        whitelist: [/\.css$/, /\?vue&type=style/]
      }),
      // 关闭 splitChunks 
      // optimization: {
      //   splitChunks: false
      // },
      plugins: [
        new VueSSRServerPlugin()
      ]
    }
  });
}

module.exports = baseConfig;
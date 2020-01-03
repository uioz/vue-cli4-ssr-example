const baseConfig = {
  outputDir: undefined,
  assetsDir: undefined,
  // publicPath:'/static',
  configureWebpack: undefined
}

function runWithClient() {
  // env from .env file
  return process.env.BUILD_TARGET === 'CLIENT';
}

function runWithServer() {
  // env from .env.server file
  return process.env.BUILD_TARGET === 'SERVER';
}

if (runWithClient()) {

  const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');

  baseConfig.outputDir = './dist/client';
  // assetsDir 路径是相对于 outputDir 存在的
  // 也就是 "path.resolve('./dist/client','../static')"
  // baseConfig.assetsDir = '../static';

  baseConfig.configureWebpack = {
    entry: './src/entry-client.js',
    target: 'web',
    // 关闭 splitChunks 
    optimization: {
      runtimeChunk: 'single'
    },
    plugins: [
      new VueSSRClientPlugin()
    ]
  }

}

if (runWithServer()) {

  const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
  const nodeExternalsNode = require('webpack-node-externals');

  baseConfig.outputDir = './dist/server';

  baseConfig.configureWebpack = {
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
    optimization: {
      splitChunks: false
    },
    // 这是将服务器的整个输出
    // 构建为单个 JSON 文件的插件。
    // 默认文件名为 `vue-ssr-server-bundle.json`
    plugins: [
      new VueSSRServerPlugin()
    ]
  }

}

module.exports = baseConfig;
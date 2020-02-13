
// @vue/cli-service/webpack.config 在执行的时候会读取 vue.config.js
// 而 vue.config.js 依赖环境变量, 所以这里依赖环境变量
// 这个脚本用于开发模式所以这

// 我们想要获取 vue-ssr-server-bundle.json 通过 webpack 读取配置文件来生成
// vue-cli 暴露了接口用于提供 webpack 配置, 这个配置对象也是通过解析 vue.config.js 来完成的
// 所以想要获取到什么配置这取决于当前执行时的环境变量
const webpackConfig = require('@vue/cli-service/webpack.config');
const serverCompiler = webpack(webpackConfig);
const MemoryFs = new require('memory-fs');


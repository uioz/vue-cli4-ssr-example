// 1. 根据 webpack 配置编译出 vue-ssr-server-bundle.json

/* 
 * 我们想要获取 vue-ssr-server-bundle.json 这需要通过 webpack 读取配置文件来生成
 * vue-cli 暴露了接口用于提供 webpack 配置, 这个配置对象也是通过解析 vue.config.js 来完成的
 * 所以想要获取到什么配置这取决于当前执行时的环境变量因为 vue.config.js 依赖当前的环境变量
 * 所以这个脚本执行的时候一定要给定合理的环境变量
 */
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('@vue/cli-service/webpack.config');
const serverCompiler = webpack(webpackConfig);

const MemoryFs = require('memory-fs');
const MemoryFsForCompiler = new MemoryFs();

serverCompiler.outputFileSystem = MemoryFsForCompiler;

const serverBundleOutputPath = path.join(webpackConfig.output.path, 'vue-ssr-server-bundle.json');

let serverBundle;

// 当文件变化后再次编译生成 vue-ssr-server-bundle.json
serverCompiler.watch({}, (error, status) => {

  if (error) throw error;

  status = status.toJson();
  status.errors.forEach(error => console.error(error));
  status.warnings.forEach(warn => console.warn(warn));

  serverBundle = JSON.parse(MemoryFsForCompiler.readFileSync(serverBundleOutputPath, 'utf-8'));
  console.log('vue-ssr-server-bundle generated');
});

// 2. 启动服务器并且利用 vue-ssr-client-manifest.json 和 vue-ssr-server-bundle.json 渲染 HTML 页面
const express = require('express');
const app = express();
const http = require('http');
const { createBundleRenderer } = require("vue-server-renderer");
const htmlTempalte = require("fs").readFileSync(path.resolve(__dirname, '../src/template.html'), 'utf8');

const { rendererServerPort, devServerPort } = require('../config');

function getManifest() {
  return new Promise((resolve, reject) => {
    const client = http.get(`http://localhost:${devServerPort}/vue-ssr-client-manifest.json`, (response) => {

      response.setEncoding('utf8');
      let rawData = '';
      response.on('data', (chunk) => { rawData += chunk; });
      response.on('end', () => {
        try {
          resolve(JSON.parse(rawData))
        } catch (e) {
          reject(e);
        } finally {
          client.destroy();
        }
      });

    }).on('error', reject);
  });
}

app.get('*', async (request, response) => {

  if (serverBundle == undefined) {
    response.status(500);
    response.end('Server Not Ready Yet!');
  }

  try {
    const renderer = createBundleRenderer(serverBundle, {
      runInNewContext: false, // 推荐
      template: htmlTempalte,
      clientManifest: await getManifest()
    });

    renderer.renderToString({
      url: request.url
    }, (error, html) => {

      if (error) {
        response.status(404);
        response.end(`${request.url} Not found`);
      } else {
        response.type('html');
        response.end(html);
      }

    });
  } catch {
    response.status(500);
    response.end('Missing vue-ssr-client-manifest.json! Does devServer running ?')
  }

}).listen(rendererServerPort,
  () => {
    console.log('server listening on 8888 port');
  }
);
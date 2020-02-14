const express = require('express');
const Server = express();

const path = require('path');

const serverBundle = require('../dist/server/vue-ssr-server-bundle.json');
const clientManifest = require('../dist/client/vue-ssr-client-manifest.json');

const template = require("fs").readFileSync(path.resolve(__dirname, '../src/template.html'), 'utf8');

const { createBundleRenderer } = require("vue-server-renderer");

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false, // 推荐
  template,
  clientManifest
});

Server.get('*',
  (request, response, next) => {

    const context = {
      url: request.url
    };

    renderer.renderToString(context,
      (error, html) => {

        if (error) {
          console.log(request.url);
          console.error(error);
          next();
        } else {
          response.end(html);
        }

      }
    );

  },
  express.static(path.resolve(__dirname, '../dist/client'), {
    // 不返回 index.html 因为需要由服务端渲染
    index: false
  })
);

const { rendererServerPort } = require('../config');

Server.listen(rendererServerPort,
  () => {
    console.log('server listening on 8888 port');
  }
)
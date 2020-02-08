const express = require('express')

const Server = express();

const serverBundle = require('../dist/server/vue-ssr-server-bundle.json');
const clientManifest = require('../dist/client/vue-ssr-client-manifest.json');

const template = require("fs").readFileSync(`C:\\Users\\zhao\\Documents\\vue-ssr\\server\\template\\template.html`, 'utf8');

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
          debugger;
          next();
        } else {
          response.end(html);
        }

      }
    );

  },
  express.static('C:\\Users\\zhao\\Documents\\vue-ssr\\dist\\client', {
    index: false
  })
);

Server.listen(8888,
  () => {
    console.log('server listening with 8888 port');
  }
)
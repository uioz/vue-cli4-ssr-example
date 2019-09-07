// only running in node side
const fs = require('fs');
const path = require('path');
const Express = require("express");
const App = Express();

const serverBundle = require('../dist/vue-ssr-server-bundle.json');
const clientManifest = require('../dist/vue-ssr-client-manifest.json');
const { createBundleRenderer } = require('vue-server-renderer');

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template: fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8'),
  clientManifest
});

App.use(
  '/public',
  Express.static(path.join(__dirname, '..', 'dist'))
);

App.get('*', (request, response) => {

  renderer
    .renderToString({
      url: request.url,
      title: 'hello world',
      meta: `
      <meta name="keywords" content="hello world">
      <meta name="author" content="zhao">
      <meta name="description" content="a page renderer by SSR">
      `
    })
    .then(html => {
      response.setHeader('Content-Type', 'text/html; charset=utf-8');
      response.end(html);
    })
    .catch(error => {
      console.log(error);
      response.status(500).end('Internal Server Error')
    });

});


App.listen(8888, console.log(`server is listening port at 8888`));
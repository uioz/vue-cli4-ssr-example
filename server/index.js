// only running in node side
const fs = require('fs');
const path = require('path');
const App = require("express")();

const serverBundle = require('../dist/vue-ssr-server-bundle.json');
const clientManifest = require('../dist/vue-ssr-client-manifest.json');
const { createBundleRenderer } = require('vue-server-renderer');

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template: fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8'),
  clientManifest
});

App.get('*', (request, response) => {

  renderer
    .renderToString({ url: request.url })
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
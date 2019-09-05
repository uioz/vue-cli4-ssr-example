// only running in node side
const fs = require('fs');
const path = require('path');
const Vue = require('vue');
const App = require("express")();
const renderer = require('vue-server-renderer').createRenderer({
  template: fs.readFileSync(path.join(__dirname,'template.html'), 'utf8')
});


function vueInstanceFactory(url) {
  return new Vue({
    
    data:{
      url
    },
    template:`<div>访问的是 URL 是: {{ url }}</div>`
  });
}

App.get('*', (request, response) => {

  const vm = vueInstanceFactory(request.url);

  renderer.renderToString(vm, {
    title:'hello world',
    meta:`
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
      res.status(500).end('Internal Server Error')
    });

});


App.listen(8888, console.log(`server is listening port at 8888`));
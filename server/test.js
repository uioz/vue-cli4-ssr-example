const Vue = require('vue');

const app = new Vue({
  template:`<div>hello world</div>`
});

const renderer = require('vue-server-renderer').createRenderer({
  template:require('fs').readFileSync('/home/zhao/文档/vue-ssr/server/template/template.html', 'utf-8')
});

renderer.renderToString(app,(err,html)=>{

  if(err){
    throw err;
  }

  console.log(html);

});
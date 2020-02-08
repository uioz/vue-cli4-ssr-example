
function targetIsServer() {
  return process.env.BUILD_TARGET === 'SERVER';
}

function runInProduction() {
  return process.env.NODE_ENV === 'production';
}

if (targetIsServer() && runInProduction()) {
  module.exports = {
    // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/babel-preset-app#options
    presets: [
      [
        '@vue/cli-plugin-babel/preset',
        {
          targets: {
            node: 'current', // see https://babeljs.io/docs/en/next/babel-preset-env.html#targetsnode
          },
          useBuiltIns: false, // see https://babeljs.io/docs/en/next/babel-preset-env.html#usebuiltins-false
          corejs: undefined
        }
      ]
    ]
  }
} else {
  module.exports = {
    presets: [
      '@vue/cli-plugin-babel/preset'
    ]
  }
}




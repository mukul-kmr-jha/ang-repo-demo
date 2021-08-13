const { extendDefaultPlugins } = require('svgo');
module.exports = {
  plugins: extendDefaultPlugins([
    {
      name: 'removeTitle',
      active: false
    },
    {
      name: 'removeViewBox',
      active: false
    },
  ])
};

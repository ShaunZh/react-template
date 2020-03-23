// eslint-disable-next-line
const { override, fixBabelImports, addWebpackAlias, addLessLoader } = require('customize-cra');
// eslint-disable-next-line
// eslint-disable-next-line
const path = require('path');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  // 重写webpack的alias（别名）
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src')
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {},
    cssLoaderOptions: {}, // .less file used css-loader option, not all CSS file.
    cssModules: {
      localIdentName: '[name]__[local]--[hash:base64:5]' // if you use CSS Modules, and custom `localIdentName`, default is '[local]--[hash:base64:5]'.
    }
  })
);

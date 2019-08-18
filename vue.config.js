const path = require('path');

const resolve = dir => {
  return path.join(__dirname, dir);
};

module.exports = {
  lintOnSave: false,

  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('_c', resolve('src/components'));
  },

  // 设为false打包时不生成.map文件
  productionSourceMap: false,

  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',

  outputDir: process.env.NODE_ENV === 'production' ? 'packet-admin' : 'packet-admin-test'
};

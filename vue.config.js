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

  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 保持类名不被压缩  这样keep-alive的include才有效
      config.optimization.minimizer[0].options.terserOptions.keep_fnames = true;
    }
  },

  // 设为false打包时不生成.map文件
  productionSourceMap: false,

  publicPath: process.env.NODE_ENV === 'production' ? '/vuets-iview-admin' : '/',

  outputDir: process.env.NODE_ENV === 'production' ? 'vuets-iview-admin' : 'vuets-iview-admin-test'
};

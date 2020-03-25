const path = require('path');

const resolve = dir => {
  return path.join(__dirname, dir);
};

module.exports = {
  lintOnSave: false,

  // 设为false打包时不生成.map文件
  productionSourceMap: false,

  publicPath: process.env.NODE_ENV === 'production' ? '/vuets-iview-admin' : '/',

  outputDir: process.env.NODE_ENV === 'production' ? 'vuets-iview-admin' : 'vuets-iview-admin-test',

  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('_c', resolve('src/components'));

    // 添加 raw-loader 来解析 bpmn 文件
    config.module
      .rule('bpmn')
      .test(/\.bpmn$/)
      .use('raw-loader')
      .loader('raw-loader')
      .end();
  },

  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 保持类名不被压缩  这样keep-alive的include才有效
      config.optimization.minimizer[0].options.terserOptions.keep_fnames = true;
    }

    // https://segmentfault.com/q/1010000014954264
    config.optimization.runtimeChunk = 'single';

    /**
     * 打包说明
     * splitChunks: 将所有的库进行打包，并决定哪些分离出来，哪些打到一起
     * 1. app.[hash].js
     *      main.js webpack打包的入口文件
     * 2. chunk-[hash].[hash].js
     *      动态引入的包(即懒加载, 一般是路由里引入的）=>
     *      component: () => import('@/views/error-page/500.vue')
     * 3. chunk-verdors.[hash].js
     *      第三方包会打到这里面
     *      通过 cacheGroups 的 vendors 来配置;
     *      cacheGroups 的 default 默认配置会将引入大于等于2次的包打到这里
     */
    config.optimization.splitChunks = {
      // initial 只从入口模块进行拆分，对于异步导入(比如懒加载)的文件不处理
      // async   异步chunk，只对异步导入的文件处理
      // all     全部chunk
      chunks: 'all',
      // 表示允许入口(页面初始化，不包括异步加载的脚本)并行加载的最大请求数
      // 之所以有这个配置也是为了对拆分数量进行限制，不至于拆分出太多模块导致请求数量过多
      maxInitialRequests: 8,
      // 分出来的包最小字节数必须大于此值，单位为Byte
      minSize: 200000,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          // 生成的文件名
          name(module) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            return `${packageName.replace('@', '')}`;
          }
        },
        viewDesign: {
          name: 'chunk-view-design', // split view-design into a single package
          priority: 10, // the weight needs to be larger than libs and app or it will be packaged into vendor or app
          test: /[\\/]node_modules[\\/]_?view-design(.*)/ // in order to adapt to cnpm
          // todo 怎么自定义单个包的域名 publicPath 只能全局设置
        },
        antDesignVue: {
          name: 'chunk-ant-design-view',
          priority: 10,
          test: /[\\/]node_modules[\\/]_?ant-design-vue(.*)/
        }
      }
    };
  }
};

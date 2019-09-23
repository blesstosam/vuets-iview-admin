import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
import store from './store';
import IView from 'iview';
import TreeTable from 'tree-table-vue';
import Spacer from '@/components/Spacer.vue';
import TableAction from '@/components/TableAction.vue';
import { SET_LOCAL } from './store/mutation-types';

// 实际打包时应该不引入mock
/* eslint-disable */
if (process.env.NODE_ENV !== 'production') require('@/mock/index')

Vue.component('TableAction', TableAction);
Vue.component(TreeTable.name, TreeTable);
Vue.component('spacer', Spacer);

import VueQrcode from '@chenfengyuan/vue-qrcode';
Vue.component(VueQrcode.name, VueQrcode);

// 全局配置
import config from '@/config/index.ts';
Vue.prototype.$config = config;

// 引入iview组件
import 'iview/dist/styles/iview.css';
Vue.use(IView);

// 引入v-charts组件
import VCharts from 'v-charts';
Vue.use(VCharts);

import help from './help';
Vue.use(help);

// 语言切换
import customZhCn from './locale/zh-CN';
import customZhTw from './locale/zh-TW';
import customEnUs from './locale/en-US';
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);
// 自动根据浏览器系统语言设置语言
const navLang = navigator.language;
const localLang = navLang === 'zh-CN' || navLang === 'en-US' ? navLang : '';
let lang = localStorage.getItem('local') || localLang || 'zh-CN';
store.commit(SET_LOCAL, lang);
const i18n = new VueI18n({
  locale: lang, // 语言标识
  messages: {
    'zh-CN': customZhCn,
    'zh-TW': customZhTw,
    'en-US': customEnUs
  }
});

//全局样式
import './styles/common.styl';
import './styles/sidebar.css';

// 引入自定义icon
import './assets/fonts/iconfont.js';
import './assets/fonts/iconfont.css';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');


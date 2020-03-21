import 'babel-polyfill';

import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
import store from './store';
import { SET_LOCAL } from './store/mutation-types';

// 实际打包时应该不引入mock
// process.env.NODE_ENV !== 'production'
/* eslint-disable-next-line */
if (true) require('@/mock/index');

import TableAction from '@/components/TableAction.vue';
Vue.component('TableAction', TableAction);

import TreeTable from 'tree-table-vue';
Vue.component(TreeTable.name, TreeTable);

import Spacer from '@/components/common/Spacer.vue';
Vue.component('spacer', Spacer);

import VueQrcode from '@chenfengyuan/vue-qrcode';
Vue.component(VueQrcode.name, VueQrcode);

// 引入iview组件
import ViewUI from 'view-design';
// import 'view-design/dist/styles/iview.css';
import './styles/my-theme.less';
//@ts-ignore
// Vue.locale = () => {}; // 官网推荐配置 但是 $modal 有bug
Vue.use(ViewUI, {
  i18n: (key: string, value: string) => i18n.t(key, value)
});

// 引入v-charts组件
import VCharts from 'v-charts';
Vue.use(VCharts);

import help from './help';
Vue.use(help);

// 语言切换
//@ts-ignore
import en from 'view-design/dist/locale/en-US.js';
//@ts-ignore
import zh from 'view-design/dist/locale/zh-CN.js';
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
    'zh-CN': Object.assign(customZhCn, zh),
    'zh-TW': customZhTw,
    'en-US': Object.assign(customEnUs, en)
  }
});

//全局样式
import './styles/common.styl';
import './styles/tailwind.css';

// 引入自定义icon
import './assets/fonts/iconfont.js';
import './assets/fonts/iconfont.css';

Vue.config.productionTip = false;

// composition apis
import VueCompositionApi from '@vue/composition-api';
Vue.use(VueCompositionApi);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');

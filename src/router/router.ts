import Vue from 'vue';
import Router, { RouteConfig, Route } from 'vue-router';
import Login from '@/views/Login.vue';
import { scrollTop, showTitle, getLsCache } from '@/assets/script/util';

Vue.use(Router);

// 动态路由
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import { routerList, getRouterListFromStorage } from './router-list';

// 静态路由
const staticRouter: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { title: '登录', hideInMenu: true, notCache: true }
  },

  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/error-page/404.vue'),
    meta: { title: '404', hideInMenu: true, notCache: true }
  },
  { path: '*', redirect: '/404', meta: { title: '登录', hideInMenu: true, notCache: true } }
];

// 创建路由
const createRouter = (routeList: Array<RouteConfig>) =>
  new Router({
    // mode: 'history', // require service support
    routes: routeList
  });

const _router = createRouter(staticRouter.concat(routerList));
// const _router = createRouter(staticRouter.concat(getRouterListFromStorage()));

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
// 重置路由 替代 window.location.reload()
type RouterSupple = Router & { matcher: any };
export function resetRouter() {
  const newRouter = createRouter(staticRouter);
  // console.log(JSON.stringify(_router.matcher), _router);
  (_router as RouterSupple).matcher = (newRouter as RouterSupple).matcher; // reset router
}

// 初始化路由 不管到哪个路由 第一个路由都是 / 根路由
_router.beforeEach((to: Route, from: Route, next: Function) => {
  _router.app.$Loading.config({ height: 4 });
  _router.app.$Loading.start();
  if (to.path !== '/login') {
    if (getLsCache('username')) {
      next();
    } else {
      next(`/login?next=${window.encodeURIComponent(to.path)}`);
    }
  } else if (to.path === '/login') {
    if (getLsCache('username')) {
      next('/home');
    } else {
      next();
    }
  } else {
    next();
  }
});

_router.afterEach((to: Route) => {
  _router.app.$Loading.finish();
  const main_dom: HTMLElement | null = document.querySelector('#app-main');
  if (main_dom) {
    scrollTop(main_dom, main_dom.scrollTop, 0, 300);
  }

  // document.querySelector('#app-main').scrollTo(0, 0)
  window.document.title = showTitle(to, _router.app);
});

export default _router;

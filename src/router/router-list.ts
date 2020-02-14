import Layout from '@/views/layout/Layout.vue';
import storage from '@/assets/script/storage';
import { RouteConfig } from 'vue-router';

/**
 * meta: {
 *  remark: (string) 对于该菜单的一个解释说明
 *  engRemark: (string) 英文
 *  title: { String }
 *         显示在侧边栏、面包屑和标签栏的文字
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 * }
 */

export const routerList: Array<RouteConfig> = [
  // 首页
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Layout,
    meta: {
      notCache: true
    },
    children: [
      {
        path: 'home',
        name: 'home',
        meta: {
          title: 'menuTitle.home',
          notCache: true,
          icon: 'md-home',
          remark: 'remark.home'
        },
        component: () => import('@/views/home/Home.vue')
      }
    ]
  },

  {
    path: '/components',
    name: 'Components',
    component: Layout,
    meta: { title: 'menuTitle.components', icon: 'md-apps' },
    children: [
      {
        path: 'editor',
        name: 'Editor',
        meta: {
          title: 'menuTitle.editor',
          remark: 'remark.editor',
          icon: 'md-keypad'
        },
        component: () => import('@/views/components-demo/Editor.vue')
      },
      {
        path: 'markdown',
        name: 'Markdown',
        meta: {
          title: 'menuTitle.markdown',
          remark: 'remark.markdown',
          icon: 'logo-markdown'
        },
        component: () => import('@/views/components-demo/Markdown.vue')
      },
      {
        path: 'product-list',
        name: 'ProductList',
        meta: {
          title: 'menuTitle.productList',
          remark: 'remark.productList',
          icon: 'md-egg'
        },
        component: () => import('@/views/components-demo/ProductList.vue')
      },
      {
        path: 'bpmn-demo',
        name: 'BpmnDemo',
        meta: {
          title: 'Bpmn demo',
          remark: 'Bpmn demo',
          icon: 'md-egg'
        },
        component: () => import('@/views/components-demo/BpmnDemo.vue')
      },
      {
        path: 'todo-demo',
        name: 'TodoDemo',
        meta: {
          title: 'Todo demo',
          remark: 'Todo demo',
          icon: 'md-egg'
        },
        component: () => import('@/views/components-demo/todo-demo/Index.vue')
      }
    ]
  },

  {
    path: '/table',
    name: '_table',
    component: Layout,
    redirect: '/table/index',
    meta: { title: 'menuTitle.table' },
    children: [
      {
        path: 'index',
        name: 'ComplexTable',
        meta: {
          title: 'menuTitle.table',
          remark: 'remark.table',
          icon: 'md-document'
        },
        component: () => import('@/views/table-example/ComplexTable.vue')
      }
    ]
  },

  {
    path: '/guide',
    component: Layout,
    name: '_guide',
    redirect: '/guide/index',
    meta: { title: 'menuTitle.guide' },
    children: [
      {
        path: 'index',
        name: 'Guide',
        meta: {
          title: 'menuTitle.guide',
          remark: 'remark.guide',
          icon: 'md-send'
        },
        component: () => import('@/views/guide/Guide.vue')
      }
    ]
  },

  {
    path: '/chat',
    component: Layout,
    name: '_chat',
    redirect: '/chat/index',
    meta: { title: 'menuTitle.chat' },
    children: [
      {
        path: 'index',
        name: 'Chat',
        meta: {
          title: 'menuTitle.chat',
          remark: 'remark.chat',
          icon: 'md-chatboxes'
        },
        component: () => import('@/views/chat/Chat.vue')
      }
    ]
  },

  {
    path: '/error-page',
    name: 'ErrorPage',
    component: Layout,
    meta: { title: 'menuTitle.errorPage', icon: 'md-bug' },
    children: [
      {
        path: '401',
        name: 'Error401',
        meta: {
          title: 'menuTitle.errorPage401',
          remark: 'remark.errorPage401'
        },
        component: () => import('@/views/error-page/401.vue')
      },
      {
        path: '404',
        name: 'Error404',
        meta: {
          title: 'menuTitle.errorPage404',
          remark: 'remark.errorPage404'
        },
        component: () => import('@/views/error-page/404.vue')
      },
      {
        path: '500',
        name: 'Error500',
        meta: {
          title: 'menuTitle.errorPage500',
          remark: 'remark.errorPage500'
        },
        component: () => import('@/views/error-page/500.vue')
      }
    ]
  }
];

// 将后台返回的 菜单列表 转成vue-router所需要的 router list
export function toRouterComponent(menuList: Array<any>) {
  if (!menuList.length) return [];

  let routerArr = [];
  // 将按钮保存到locastorage
  let btnMap: { [key: string]: string } = {};

  // 首页根路由放到前台来 方便自定义修改 (important) 后面放到后台数据库里
  routerArr.push(routerList[0]);
  for (let j = 0; j < menuList.length; j++) {
    let obj;
    let firstIndex = routerList.findIndex(i => i.path === menuList[j].url); // 一级菜单
    if (firstIndex !== -1) {
      let children: Array<RouteConfig> = [];
      obj = {
        path: routerList[firstIndex].path,
        component: routerList[firstIndex].component,
        redirect: routerList[firstIndex].redirect,
        name: routerList[firstIndex].name,
        // icon 和 title 都是从后台获取的
        meta: {
          ...routerList[firstIndex].meta,
          icon: menuList[j].icon,
          title: menuList[j].name
        },
        children
      };

      // 如果有子菜单
      if (menuList[j].children && menuList[j].children.length) {
        for (let k = 0; k < menuList[j].children.length; k++) {
          const _children = routerList[firstIndex].children!;
          let secondIndex = _children.findIndex(i => {
            let fullpath = '';
            const menuVersion = menuList[j].children[k].menuVersion;
            const _version = menuVersion && menuVersion !== 1 && menuVersion !== '1' ? `/v${menuVersion}` : '';
            // console.log(_version, menuVersion,  '_version')
            if (routerList[firstIndex].path === '/') {
              fullpath = `${routerList[firstIndex].path}${i.path}`;
            } else {
              fullpath = `${routerList[firstIndex].path}/${i.path}`;
            }
            return fullpath === menuList[j].children[k].url + _version;
          });
          if (secondIndex !== -1) {
            obj.children.push({
              ..._children[secondIndex],
              meta: {
                ..._children[secondIndex].meta,
                // icon 和 title 都是从后台获取的
                icon: menuList[j].children[k].icon,
                title: menuList[j].children[k].name
              }
            });
          }

          // 将按钮保存到locastorage
          const __third = menuList[j].children[k];
          const _btnMap = storage.get('btnMap'); // 只在登录的时候保存一次
          if (__third.children && __third.children.length && !_btnMap) {
            __third.children.forEach((btnItem: any) => {
              if (btnItem.type === 2) {
                // btnItem.perms : 111565162230126897:111565163577313903:search
                const type = btnItem.perms.split(':')[2];
                // console.log(btnItem, `${__third.url}/${type}`)
                btnMap[`${__third.url}/${type}`] = btnItem.name;
              }
            });
          }
        }
      }
    }

    if (obj) {
      routerArr.push(obj);
    }
  }

  if (Object.keys(btnMap).length) {
    storage.set('btnMap', btnMap);
  }

  return routerArr;
}

// 根据菜单权限，获取路由数组
export function getRouterListFromStorage() {
  if (!storage.get('username')) {
    storage.set('menuTree', ''); // 清空菜单权限数据
  }
  let menuList = storage.get('menuTree') ? storage.get('menuTree') : [];

  const routerArr = toRouterComponent(menuList);
  return routerArr;
}

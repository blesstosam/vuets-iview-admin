import Vue from 'vue';
import Vuex from 'vuex';
import * as types from '../mutation-types';
import { MenuItem } from '@/type';
import { Route } from 'vue-router';
import cfg from '@/config/index';

Vue.use(Vuex);

export type VisitedViewItem = { name: string; path: string; title: string; isCache?: boolean };
export type VisitedViewsList = Array<VisitedViewItem>;
export type View = Route & { isCache?: boolean }; // // 类型别名 + 联合类型
interface TagsView {
  cachedViews: Array<string>;
  visitedViews: VisitedViewsList;
}

// 定义state的类型
interface State {
  local: string;
  sidebar: { opened: boolean };
  tagsView: TagsView;
  menuList: Array<MenuItem>;
}

// 初始化tagsview
let visitedViews: VisitedViewsList = [];
let cachedViews: Array<string> = [];
const tem: string = sessionStorage.getItem('visited_view') || '';
if (tem) {
  try {
    visitedViews = JSON.parse(tem);
    if (visitedViews && visitedViews.length) {
      visitedViews.forEach(i => {
        if (i.isCache) {
          cachedViews.push(i.name);
        }
      });
    }
  } catch (error) {
    throw new Error(`json parse error: ${error}`);
  }
}

const state: State = {
  local: localStorage.getItem('lang') || '',
  sidebar: {
    opened: !(window.innerWidth < 960)
  },
  // 缓存的组件 首页的标签
  tagsView: {
    cachedViews, // 打开的view
    visitedViews // 访问过的view
  },
  menuList: []
};

export default {
  state,

  getters: {
    local: (_s: State) => _s.local,
    cachedViews: (_s: State) => _s.tagsView.cachedViews,
    visitedViews: (_s: State) => _s.tagsView.visitedViews,
    isSidebarOpened: (_s: State) => _s.sidebar.opened,
    menuList: (_s: State) => _s.menuList
  },

  mutations: {
    // 生成菜单数组
    [types.SET_MENU_LIST](_s: State, menuList: Array<MenuItem>) {
      _s.menuList = menuList;
    },

    // 设置语言
    [types.SET_LOCAL](_s: State, lang: string): void {
      localStorage.setItem('local', lang);
      _s.local = lang;
    },

    [types.TOGGLE_SIDE_BAR](_s: State, bool: boolean): void {
      _s.sidebar.opened = bool;
    },

    /****************************************** tagsview ************************************************/
    [types.ADD_VISITED_VIEW](_s: State, view: View) {
      if (_s.tagsView.visitedViews.some(v => v.path === view.path)) return;
      _s.tagsView.visitedViews.push({
        name: view.name || '',
        path: view.path,
        title: view.meta.title || 'no-name',
        isCache: !view.meta.notCache
      });
      sessionStorage.setItem('visited_view', JSON.stringify(_s.tagsView.visitedViews));

      if (!view.meta.notCache) {
        _s.tagsView.cachedViews.push(view.name || '');
      }
    },
    [types.DEL_VISITED_VIEW](_s: State, viewOrTitle: View | string) {
      let view: View | VisitedViewItem | undefined;
      if (typeof viewOrTitle === 'string') {
        view = _s.tagsView.visitedViews.find(item => item.title === viewOrTitle);
      } else {
        view = viewOrTitle;
      }

      if (!view) return;

      for (const [i, v] of _s.tagsView.visitedViews.entries()) {
        if (v.path === view.path) {
          _s.tagsView.visitedViews.splice(i, 1);
          break;
        }
      }
      sessionStorage.setItem('visited_view', JSON.stringify(_s.tagsView.visitedViews));

      for (const i of _s.tagsView.cachedViews) {
        if (i === view.name) {
          const index = _s.tagsView.cachedViews.indexOf(i);
          _s.tagsView.cachedViews.splice(index, index + 1);
          break;
        }
      }
    },
    [types.CLEAR_VISITED_VIEW](_s: State) {
      _s.tagsView.visitedViews = [];
      _s.tagsView.cachedViews = [];
      sessionStorage.setItem('visited_view', '');
    },
    // 除了传进来的 其他都删除
    [types.DEL_OTHER_VISITED_VIEW](_s: State, viewOrTitle: View | string) {
      let view: View | VisitedViewItem | undefined;
      if (typeof viewOrTitle === 'string') {
        view = _s.tagsView.visitedViews.find(item => item.title === viewOrTitle);
      } else if (viewOrTitle.name !== cfg.homeName) {
        // 排除掉home页
        view = viewOrTitle;
      }

      if (!view) {
        // 找不到就直接删除全部
        _s.tagsView.visitedViews = [];
        sessionStorage.setItem('visited_view', '');
      } else {
        if (_s.tagsView.visitedViews.length === 1) return;
        _s.tagsView.visitedViews = [
          {
            name: view.name || '',
            path: view.path,
            title: (view as View).meta.title || 'no-name',
            isCache: view.isCache || (view as View).meta.notCache || false
          }
        ];
        sessionStorage.setItem('visited_view', JSON.stringify(_s.tagsView.visitedViews));
      }
    }
  }
};

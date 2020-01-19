import * as types from '../mutation-types';
import cfg from '@/config';

export type SidebarThemeType = 'dark' | 'light';
export type HeaderThemeType = 'dark' | 'light' | 'primary';

export interface State {
  sidebarTheme: SidebarThemeType;
  // primary | background：linear-gradient(90deg,#1d42ab,#2173dc,#1e93ff)
  headerTheme: HeaderThemeType;
  showSettings: boolean;
  showTagsView: boolean;
  showMenuInHeader: boolean; // 将菜单置于顶部
}

// type State<T> = { [P in keyof T]?: T[P] }; //  ？？？

const { setting } = cfg;
let _setting: State = setting;
const tem: string = localStorage.getItem('setting') || '';
if (tem) {
  try {
    _setting = JSON.parse(tem);
  } catch (error) {
    throw new Error(`json parse error: ${error}`);
  }
}

export default {
  state: _setting,
  getters: {
    showSettings: (_s: State) => _s.showSettings,
    sidebarTheme: (_s: State) => _s.sidebarTheme,
    headerTheme: (_s: State) => _s.headerTheme
  },
  mutations: {
    [types.CHANGE_SETTING]<K extends keyof State>(
      _s: State,
      data: { key: K; val: SidebarThemeType | HeaderThemeType | boolean }
    ) {
      let { key, val } = data;
      if (_s.hasOwnProperty(key)) {
        (_s[key] as any) = val;
        localStorage.setItem('setting', JSON.stringify(_s));
      }
    }
  }
};

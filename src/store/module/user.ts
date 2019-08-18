import { User } from '@/type';
import * as types from '../mutation-types';
import router, {resetRouter} from '@/router/router'
import storage from '@/assets/script/storage'

export const defaultAvatar =
  'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1564130985&di=ebc53a5c594bfafe06ba14d0799c88ab&src=http://n.sinaimg.cn/sinacn/w640h595/20180219/5762-fyrswmu1170551.jpg';

type State = User & { authorization: string, orgCode: string, logoutMsg: string };
const state: State = {
  username: localStorage.getItem('username') || '',
  avatar: localStorage.getItem('avatar') || defaultAvatar,
  token: localStorage.getItem('token') || '',
  roleId: localStorage.getItem('roleId') || '',
  adminId: localStorage.getItem('adminId') || '',
  authorization: '',
  orgCode: '201907221579545258',
  proxyId: localStorage.getItem('proxyId') || '',
  logoutMsg: ''
};

export default {
  state,
  getters: {
    username: (_s: State) => _s.username,
    avatar: (_s: State) => _s.avatar,
    roleId: (_s: State) => _s.roleId,
    token: (_s: State) => _s.token,
    orgCode: (_s: State) => _s.orgCode,
    proxyId: (_s: State) => _s.proxyId
  },
  mutations: {
    [types.UPDATE_USERNAME](_s: State, str: string): void {
      _s.username = str;
      localStorage.setItem('username', str);
    },
    [types.UPDATE_AVATAR](_s: State, str: string): void {
      _s.avatar = str;
      localStorage.setItem('avatar', str);
    },
    [types.UPDATE_TOKEN](_s: State, str: string): void {
      _s.token = str;
      localStorage.setItem('token', str);
    },
    [types.UPDATE_ROLE_ID](_s: State, str: string): void {
      _s.roleId = str;
      localStorage.setItem('roleId', str);
    },
    [types.UPDATE_ADMIN_ID](_s: State, str: string): void {
      _s.adminId = str;
      localStorage.setItem('adminId', str);
    },
    [types.UPDATE_AUTHORIZATION](_s: State, str: string): void {
      _s.authorization = str;
    },
    [types.UPDATE_PROXY_ID](_s: State, str: string): void {
      _s.proxyId = str;
      localStorage.setItem('proxyId', str);
    },
    [types.UPDATE_LOGOUT_MSG](_s: State, str: string): void {
      _s.logoutMsg = str;
    }
  },
  actions: {
    [types.UPDATE_USER]({ commit }: any, userinfo: User) {
      commit(types.UPDATE_USERNAME, userinfo.username);
      commit(types.UPDATE_AVATAR, userinfo.avatar);
      commit(types.UPDATE_TOKEN, userinfo.token);
      commit(types.UPDATE_ROLE_ID, userinfo.roleId);
      commit(types.UPDATE_ADMIN_ID, userinfo.adminId);
      commit(types.UPDATE_PROXY_ID, userinfo.proxyId)
    },
    [types.LOGOUT]({state, dispatch, commit}: any) {
        // 清除用户信息 localstorage 和 store
        dispatch(types.UPDATE_USER, {
          username: '',
          roleId: '',
          adminId: '',
          token: '',
          avatar: ''
        });

        commit(types.CLEAR_VISITED_VIEW)
        storage.set('menuTree', '')

        // reset 有点问题
        // resetRouter()
        window.location.reload()

        // 清除页签
        setTimeout(() => {
          router.push('/login');
        }, 200)
      
    }
  }
};

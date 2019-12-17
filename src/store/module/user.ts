import { User } from '@/type';
import * as types from '../mutation-types';
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import router, { resetRouter } from '@/router/router';
import storage from '@/assets/script/storage';
import { setLsCache, getLsCache } from '@/assets/script/util';
import cfg from '@/config';

type State = User & { authorization: string; orgCode: string };
const state: State = {
  username: getLsCache('username') || '',
  avatar: localStorage.getItem('avatar') || '',
  token: localStorage.getItem('token') || '',
  roleId: localStorage.getItem('roleId') || '',
  adminId: localStorage.getItem('adminId') || '',
  authorization: '',
  orgCode: '201907221579545258'
};

export default {
  state,
  getters: {
    username: (_s: State) => _s.username,
    avatar: (_s: State) => _s.avatar,
    roleId: (_s: State) => _s.roleId,
    token: (_s: State) => _s.token,
    orgCode: (_s: State) => _s.orgCode
  },
  mutations: {
    [types.UPDATE_USERNAME](_s: State, str: string): void {
      _s.username = str;
      if (str) {
        setLsCache({ key: 'username', val: str, ttl: cfg.userExpireTime });
      } else {
        localStorage.setItem('username', '');
      }
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
    }
  },
  actions: {
    [types.UPDATE_USER]({ commit }: any, userinfo: User) {
      commit(types.UPDATE_USERNAME, userinfo.username);
      commit(types.UPDATE_AVATAR, userinfo.avatar);
      commit(types.UPDATE_TOKEN, userinfo.token);
      commit(types.UPDATE_ROLE_ID, userinfo.roleId);
      commit(types.UPDATE_ADMIN_ID, userinfo.adminId);
    },
    [types.LOGOUT]({ dispatch, commit }: any) {
      // 清除用户信息 localstorage 和 store
      dispatch(types.UPDATE_USER, {
        username: '',
        roleId: '',
        adminId: '',
        token: '',
        avatar: ''
      });

      commit(types.CLEAR_VISITED_VIEW);
      storage.set('menuTree', '');

      // reset 有点问题
      // resetRouter()
      window.location.reload();

      // 清除页签
      setTimeout(() => {
        router.push('/login');
      }, 200);
    }
  }
};

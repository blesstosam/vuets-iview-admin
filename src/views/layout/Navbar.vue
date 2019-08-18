<style lang="less">
.navbar {
  .logo-con {
    height: 64px;
    padding: 10px;
    img {
      height: 44px;
      width: auto;
      display: block;
      margin: 0 auto;
    }
  }
  .header-con {
    padding: 0 20px;
    width: 100%;
    .time-wrap {
      font-size: 14px;
      font-weight: 500;
      margin-right: 10px;
    }
  }
  .main-layout-con {
    height: 100%;
    overflow: hidden;
  }
  .main-content-con {
    height: ~'calc(100% - 60px)';
    overflow: hidden;
  }
  .tag-nav-wrapper {
    padding: 0;
    height: 40px;
    background: #f0f0f0;
  }
  .content-wrapper {
    padding: 18px;
    height: ~'calc(100% - 80px)';
    overflow: auto;
  }
}
.ivu-menu-item > i {
  margin-right: 12px !important;
}
.ivu-menu-submenu > .ivu-menu > .ivu-menu-item > i {
  margin-right: 8px !important;
}

.ivu-select-dropdown.ivu-dropdown-transfer {
  max-height: 400px;
}
</style>

<template>
  <div class="navbar">
    <Header class="header-con" :class="`header-con-${headerTheme}`">
      <HeaderBar ref="headerBar">
        <div class="time-wrap">{{ whichDay }} {{ currentTime }}</div>
        <Language v-if="$config.useI18n" @on-lang-change="setLocal" style="margin-right: 20px;" :lang="local" />
        <Fullscreen v-model="isFullscreen" style="margin-right: 10px;" />
        <User :message-unread-count="unreadCount" />
      </HeaderBar>
    </Header>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator';
import HeaderBar from './components/header-bar/HeaderBar.vue';
import User from './components/User.vue';
import Fullscreen from './components/Fullscreen.vue';
import Language from './components/Language.vue';
import { Getter, Mutation } from 'vuex-class';
import { SET_LOCAL, SET_MENU_LIST } from '@/store/mutation-types';
import dayjs from 'dayjs';
/* eslint-disable-next-line no-unused-vars */
import { HeaderThemeType } from '@/store/module/setting';
/* eslint-disable-next-line no-unused-vars */
import { MenuItem, VueRouter } from '@/type';
// import storage from '@/assets/script/storage';
import cfg from '@/config/index';
/* eslint-disable-next-line no-unused-vars */
import { VisitedViewsList, VisitedViewItem } from '@/store/module/app';

@Component({
  components: { HeaderBar, Fullscreen, User, Language }
})
export default class Navbar extends Vue {
  timer: any;

  async created() {
    this.setCurrentTime();
  }

  isFullscreen: boolean = false;
  day: number = 0; // 星期几
  currentTime: string = '';
  unreadCount: number = 2; //未读消息

  get whichDay() {
    const day = dayjs().get('day');
    if (this.local === cfg.langType.CN) {
      const arr = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
      return arr[day];
    } else if (this.local === 'zh-TW') {
      const arr = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
      return arr[day];
    } else {
      const arr = ['Sun. ', 'Mon. ', 'Tues. ', 'Wed. ', 'Thurs. ', 'Fri. ', 'Sat. '];
      return arr[day];
    }
  }
  @Getter('headerTheme') headerTheme!: HeaderThemeType;
  @Getter('local') local!: string;
  @Getter('menuList') menuListFromStore!: Array<MenuItem>;
  @Getter('visitedViews') visitedViews!: VisitedViewsList;

  @Mutation(SET_LOCAL) _setLocal!: (lang: string) => void;
  @Mutation(SET_MENU_LIST) setMenuList!: (arr: Array<MenuItem>) => void;

  setCurrentTime() {
    const formatTxt = this.local === cfg.langType.CN ? 'YYYY年MM月DD日 HH:mm:ss' : 'YYYY-MM-DD HH:mm:ss';
    this.currentTime = dayjs().format(formatTxt);
    this.timer = setInterval(() => {
      this.currentTime = dayjs().format(formatTxt);
    }, 1000);
  }

  setLocal(lang: string) {
    if (lang === this.local) return;
    this._setLocal(lang);
    clearInterval(this.timer);
    this.setCurrentTime();
    this.reqMenuList();
  }

  // 重新获取菜单权限
  async reqMenuList() {
    // const resp = await getCurrentAuthList();
    // if (resp.code !== 200 || !resp.data || !resp.data.length) {
    //   return;
    // }
    // // console.log((this.$router as VueRouter).options.routes, resp.data, '222')
    // const menuList = resp.data;
    // // 更新本地menu， 刷新页面后需要用到
    // storage.set('menuTree', menuList);
    // // 将routerlist里的title改掉 其他地方的都依赖该list 通过watch local 把相关组件刷新一遍
    // if ((this.$router as VueRouter).options.routes) {
    //   (this.$router as VueRouter).options.routes.forEach((i: any) => {
    //     if (i.path !== '*' && i.path !== '/' && i.path !== '/login' && i.path !== '/404') {
    //       const firstIndex = menuList.findIndex((menuItem: any) => menuItem.url === i.path);
    //       if (firstIndex !== -1) {
    //         i.meta.title = menuList[firstIndex].name;
    //       }
    //       if (i.children && i.children.length) {
    //         i.children.forEach((__i: any, __index: number) => {
    //           // 第二次没有对 path 做检查  其元素及元素的位置和应该是一样的
    //           __i.meta.title = menuList[firstIndex].children[__index].name;
    //           // 页签
    //           this.visitedViews.forEach((view: any) => {
    //             if (view.path === `${i.path}/${__i.path}`) {
    //               view.title = menuList[firstIndex].children[__index].name;
    //             }
    //           });
    //         });
    //       }
    //     }
    //   });
    // }
    // this.emitLangChange();
    // // 用事件通知 其他组件将组件数据刷新一遍
    // (this.$refs.headerBar as any).updateBreadCrumbList();
  }

  @Emit('lang-change')
  emitLangChange() {
    return;
  }
}
</script>

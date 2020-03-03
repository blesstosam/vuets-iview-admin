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

@media screen and (max-width: 600px) {
  .time-wrap {
    display: none;
  }
}
</style>

<template>
  <div class="navbar">
    <Header class="header-con" :class="`header-con-${headerTheme}`">
      <HeaderBar ref="headerBar">
        <!-- <div class="time-wrap">{{ whichDay }} {{ currentTime }}</div> -->
        <Language v-if="useI18n" @on-lang-change="setLocal" style="margin-right: 20px;" :lang="local" />
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
import { HeaderThemeType } from '@/store/module/setting';
import { MenuItem } from '@/type';
import cfg from '@/config/index';
import { VisitedViewsList } from '@/store/module/app';

@Component({
  components: { HeaderBar, Fullscreen, User, Language }
})
export default class Navbar extends Vue {
  timer: any;

  async created() {
    this.setCurrentTime();
  }

  useI18n: boolean = cfg.useI18n;
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
    }
    const arr = ['Sun. ', 'Mon. ', 'Tues. ', 'Wed. ', 'Thurs. ', 'Fri. ', 'Sat. '];
    return arr[day];
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
  }

  @Emit('lang-change')
  emitLangChange() {
    return;
  }
}
</script>

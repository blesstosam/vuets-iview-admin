<style lang="stylus">
.app-wrapper
  position: relative;
  height: 100%;
  width: 100%;
  background-color: rgb(245, 247, 249)
  display flex
  flex auto
  .left-sider
    .ivu-layout-sider-children
      overflow-y: scroll
      overflow-x: hidden
      margin-right: -18px // 空出一个滚动条的距离 被隐藏在下面

.root-rightPanel
  .style-wrap
    display flex
    flex-wrap wrap
    margin-top 15px
    &-item
      margin-right 20px
      margin-bottom 10px
    &-item:after
      content: "";
      display: block;
      width: 6px;
      height: 6px;
      border-radius: 6px;
      background: transparent;
      margin: 0 auto
    &-item.on:after
      background #19be6b
  & .position-wrap
    &-item
      font-size 14px
      display flex
      justify-content space-between
      margin-bottom 20px

@media screen and (max-width: 600px) {
  .mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background : rgba(0,0,0,0.7);
    z-index: 2;
  }
}
</style>

<template>
  <div :class="{ hideSidebar: !isSidebarOpened }" class="app-wrapper">
    <div :class="{ mask: isSidebarOpened }" @click="toggle"></div>
    <sider-bar v-show="!isShowMenuInHeader" />

    <div class="main-container">
      <navbar @lang-change="handleLangChange" />
      <TagsViews v-show="isShowTagsView" :isShowTagsView="isShowTagsView" />
      <app-main />
      <RightPanel v-if="1" class="root-rightPanel">
        <Divider size="small">主题切换</Divider>
        <div class="style-wrap">
          <div
            class="style-wrap-item"
            v-for="(item, index) in styleType"
            :key="index"
            :class="{ on: styleIndex === index }"
            @click="changeStyle(index)"
          >
            <Tooltip :content="item.tip" placement="top">
              <img :src="item.img" :alt="'主题' + 'index'" />
            </Tooltip>
          </div>
        </div>
        <Divider size="small">布局设置</Divider>
        <div class="position-wrap">
          <div class="position-wrap-item">
            <div>是否显示页签</div>
            <i-switch v-model="isShowTagsView" @on-change="changeSwitch('isShowTagsView', $event)" />
          </div>
          <div class="position-wrap-item">
            <div>是否开启顶部菜单模式</div>
            <i-switch v-model="isShowMenuInHeader" @on-change="changeSwitch('isShowMenuInHeader', $event)" />
          </div>
        </div>
      </RightPanel>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Mutation } from 'vuex-class';
import SiderBar from './SideBar.vue';
import Navbar from './Navbar.vue';
import AppMain from './AppMain.vue';
import TagsViews from './TagViews.vue';
import RightPanel from '@/components/RightPanel.vue';
import { SidebarThemeType, HeaderThemeType } from '@/store/module/setting';
import { MenuItem, VueRouterWithOptions } from '@/type';
import { SET_MENU_LIST, TOGGLE_SIDE_BAR, CHANGE_SETTING } from '@/store/mutation-types';

@Component({
  components: { SiderBar, Navbar, AppMain, TagsViews, RightPanel }
})
export default class Layout extends Vue {
  created() {
    this.getMenuList();
    if (this.sidebarTheme === 'dark' && this.headerTheme === 'light') {
      this.styleIndex = 0;
    } else if (this.sidebarTheme === 'light' && this.headerTheme === 'light') {
      this.styleIndex = 1;
    } else if (this.sidebarTheme === 'dark' && this.headerTheme === 'dark') {
      this.styleIndex = 2;
    } else if (this.sidebarTheme === 'dark' && this.headerTheme === 'primary') {
      this.styleIndex = 3;
    } else {
      this.styleIndex = 0;
    }

    this.isShowTagsView = this.$store.state.setting.showTagsView;
    this.isShowMenuInHeader = this.$store.state.setting.showMenuInHeader;
  }

  @Getter('isSidebarOpened') isSidebarOpened!: boolean;
  @Getter('showSettings') showSettings!: boolean;
  @Getter('sidebarTheme') sidebarTheme!: SidebarThemeType;
  @Getter('headerTheme') headerTheme!: HeaderThemeType;
  @Getter('local') local!: boolean;

  isShowTagsView: boolean = true;
  isShowMenuInHeader: boolean = false;

  styleIndex: number = 0;
  styleType: Array<{ img: string; sidebarTheme: string; headerTheme: string; key: string; tip: string }> = [
    {
      img: require('../../assets/img/svg/sidebar-dark-header-light.svg'),
      sidebarTheme: 'dark',
      headerTheme: 'light',
      key: 'sidebar-dark-header-light',
      tip: '基础主题'
    },
    {
      img: require('../../assets/img/svg/theme-light.svg'),
      sidebarTheme: 'light',
      headerTheme: 'light',
      key: 'theme-light',
      tip: '亮色主题'
    },
    {
      img: require('../../assets/img/svg/theme-dark.svg'),
      sidebarTheme: 'dark',
      headerTheme: 'dark',
      key: 'theme-dark',
      tip: '暗色主题'
    },
    {
      img: require('../../assets/img/svg/sidebar-dark-header-primary.svg'),
      sidebarTheme: 'dark',
      headerTheme: 'primary',
      key: 'sidebar-dark-header-primary',
      tip: '主色主题'
    }
  ];

  @Mutation(CHANGE_SETTING) changeSetting!: (data: object) => void;
  @Mutation(SET_MENU_LIST) setMenuList!: (menuList: Array<MenuItem>) => void;

  changeStyle(index: number) {
    this.styleIndex = index;
    this.changeSetting({ key: 'sidebarTheme', val: this.styleType[index].sidebarTheme });
    this.changeSetting({ key: 'headerTheme', val: this.styleType[index].headerTheme });
  }
  changeSwitch(key: string, val: boolean) {
    switch (key) {
      case 'isShowTagsView':
        this.changeSetting({ key: 'showTagsView', val });
        break;
      case 'isShowMenuInHeader':
        this.changeSetting({ key: 'showMenuInHeader', val });
        break;
      default:
        break;
    }
  }
  getMenuList(): void {
    let arr: Array<MenuItem> = [];
    if ((this.$router as VueRouterWithOptions).options.routes) {
      (this.$router as VueRouterWithOptions).options.routes.forEach((i: any) => {
        if (!i.meta.hideInMenu && i.path !== '*') {
          let children: Array<MenuItem> = [];
          let obj = {
            title: i.meta.title,
            icon: i.meta.icon,
            name: i.name,
            path: i.path,
            meta: i.meta,
            children
          };
          arr.push(obj);
          if (i.children && i.children.length) {
            i.children.forEach((__i: any) => {
              if (!__i.meta.hideInMenu) {
                let obj2 = {
                  title: __i.meta.title,
                  name: __i.name,
                  path: obj.path === '/' ? '/home' : `${obj.path}/${__i.path}`,
                  meta: __i.meta,
                  icon: __i.meta.icon
                };
                obj.children.push(obj2);
              }
            });
          }
        }
      });
    }

    this.setMenuList(arr);
  }

  // 语言改变时将菜单重新生成一遍
  handleLangChange() {
    this.getMenuList();
  }

  @Mutation(TOGGLE_SIDE_BAR) toggleSidebar!: (bool: boolean) => void;
  toggle() {
    this.toggleSidebar(!this.isSidebarOpened);
  }
}
</script>

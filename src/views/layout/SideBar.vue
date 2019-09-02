<style lang="stylus">
.left-sider
  .logo-con
    padding 0 10px
    & .ivu-select-dropdown.ivu-auto-complete
      z-index 999
      .ivu-select-item
        text-align left
    & .ivu-avatar-large
      width: 50px;
      height: 50px;
      line-height: 50px;
      border-radius: 30px
    & .avatar-small
      .ivu-avatar-large
        width: 40px !important
        height: 40px !important
        line-height: 40px !important
        border-radius: 30px !important
        margin-left 7px !important
</style>

<template>
  <Sider
    hide-trigger
    collapsible
    :width="siderWidth"
    :collapsed-width="collapsedWidth"
    v-model="collapsed"
    class="left-sider"
    :class="`left-sider-${sidebarTheme}`"
    :style="{ overflow: 'hidden' }"
  >
    <side-menu
      accordion
      ref="sideMenu"
      :active-name="$route.name"
      :collapsed="collapsed"
      @on-select="turnToPage"
      :menu-list="menuList"
    >
      <!-- 需要放在菜单上面的内容，如Logo，写在side-menu标签内部，如下 -->
      <div class="logo-con">
        <SiderBarTop />
        <div style="text-align: center; margin: 20px 10px 20px 0;" v-if="!collapsed">
          <AutoComplete
            v-model="searchValue"
            @on-search="handleSearch"
            @on-select="handleSelect"
            @on-focus="handleFocus"
            icon="ios-search"
            placeholder="搜索菜单"
            style="width:90%"
          >
            <Option v-for="item in searchResult" :value="item.name" :key="item.name"> {{ item.title }}</Option>
          </AutoComplete>
        </div>
      </div>
    </side-menu>
  </Sider>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
/* eslint-disable-next-line no-unused-vars */
import { VueRouter, MenuItem } from '../../type';
import ScrollBar from '@/components/common/ScrollBar.vue';
import SideMenu from './components/side-menu/SideMenu.vue';
import SiderBarTop from './components/side-menu/SiderBarTop.vue';
import { Getter } from 'vuex-class';
/* eslint-disable-next-line no-unused-vars */
import { VisitedViewsList, VisitedViewItem } from '@/store/module/app';
/* eslint-disable-next-line no-unused-vars */
import { SidebarThemeType } from '@/store/module/setting';

const SIDER_WIDTH = 256;
const COLLAPSED_SIDER_WIDTH = 64;

@Component({
  components: { ScrollBar, SideMenu, SiderBarTop }
})
export default class SideBar extends Vue {
  siderWidth: number = SIDER_WIDTH;
  collapsedWidth: number = COLLAPSED_SIDER_WIDTH;

  @Getter('username') readonly username!: string;
  @Getter('avatar') readonly userAvatar!: string;
  @Getter('isSidebarOpened') isSidebarOpened!: boolean;
  @Getter('sidebarTheme') sidebarTheme!: SidebarThemeType;
  @Getter('menuList') menuList!: Array<MenuItem>;

  collapsed: boolean = false;

  searchValue: string = '';
  searchResult: Array<{ name: string; title: string }> = [];

  @Getter('visitedViews') viewList!: VisitedViewsList;
  get viewListWithHomePage(): VisitedViewsList {
    return [{ name: 'home', title: 'menuTitle.home', path: '/home' }, ...this.viewList];
  }

  handleFocus() {
    if (!this.searchValue) this.searchResult = [];
  }
  handleSelect(name: string): void {
    if (name) {
      this.$router.push({ name });
      this.searchValue = '';
      this.searchResult = [];
    }
  }
  handleSearch(menuName: string): void {
    if (!menuName) {
      this.searchResult = [];
      return;
    }

    this.menuList.forEach(item => {
      // 如果匹配到第一级菜单
      if (item.title.indexOf(menuName) !== -1) {
        // 没有子菜单 直接显示该菜单
        if (!item.children || item.children.length === 0) {
          this.searchResult = [{ name: item.name, title: item.title }];
        } else {
          // 有子菜单 则会显示其下所有子菜单
          item.children.forEach(_item => {
            this.searchResult.push({ name: _item.name, title: _item.title });
          });
        }
        return;
      }
      if (item.children && item.children.length) {
        item.children.forEach(__item => {
          // console.log(__item.title, menuName, 2)
          if (__item.title.indexOf(menuName) !== -1) {
            this.searchResult = [{ name: __item.name, title: __item.title }];
            return;
          }
        });
      }
    });
  }
  turnToPage(route: any): void {
    // console.log(route, 'route')
    let name, params, query;
    if (typeof route === 'string') {
      name = route;
    } else {
      name = route.name;
      params = route.params;
      query = route.query;
    }
    // console.log(name)
    if (name.indexOf('isTurnByHref_') > -1) {
      window.open(name.split('_')[1]);
      return;
    }
    // 如果是当前路由不用处理
    if (this.$route.name === name) return;
    // 超过十个不能加
    if (this.viewListWithHomePage.length >= 10) {
      this.$Modal.warning({
        title: '注意',
        content: '您打开的页面太多，请关闭其他页面再打开！'
      });
      return;
    }
    this.$router.push({
      name,
      params,
      query
    });
  }

  @Watch('isSidebarOpened')
  toggleSideBar(val: boolean): void {
    this.collapsed = !val;
  }
}
</script>

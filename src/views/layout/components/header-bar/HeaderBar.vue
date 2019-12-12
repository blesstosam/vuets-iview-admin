<style lang="stylus">
.header-bar
  width: 100%;
  height: 100%;
  position: relative
  display flex
  .custom-content-con
    height: 64px;
    line-height: 64px;
    display flex
  & .ivu-avatar-large
    width: 50px;
    height: 50px;
    line-height: 50px;
    border-radius: 30px
</style>

<template>
  <div class="header-bar">
    <SiderBarTop v-show="showMenuInHeader" :showAvatar="false" />
    <HeaderMenu v-show="showMenuInHeader" />
    <SiderTrigger v-if="!showMenuInHeader" />
    <custom-bread-crumb v-if="!showMenuInHeader" show-icon style="margin-left: 30px;" :list="breadCrumbList" />
    <spacer />
    <div class="custom-content-con">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import SiderTrigger from './SiderTrigger.vue';
import CustomBreadCrumb from './CustomBreadCrumb.vue';
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Route, RouteConfig } from 'vue-router';
import { getHomeRoute } from '@/assets/script/util';
import SiderBarTop from '../side-menu/SiderBarTop.vue';
import HeaderMenu from './HeaderMenu.vue';

type BreadCrumbItem = RouteConfig & {
  icon: string;
  to?: string;
};
type MatchedItem = {
  icon: string;
  name: string;
  meta: { [key: string]: string };
};

@Component({
  components: { SiderTrigger, CustomBreadCrumb, SiderBarTop, HeaderMenu }
})
export default class HeaderBar extends Vue {
  created() {
    const allRoutes = (this.$router as any).options.routes;
    this.homeRoute = getHomeRoute(allRoutes);
    this.updateBreadCrumbList();
  }

  // 从路由列表里找出首页路由
  homeRoute: any = {};

  breadCrumbList: Array<BreadCrumbItem | MatchedItem> = [];

  // 如果将菜单显示在顶部 就不需要顶部的切换按钮和导航了
  get showMenuInHeader() {
    return this.$store.state.setting.showMenuInHeader;
  }

  updateBreadCrumbList() {
    this.breadCrumbList = this.getBreadCrumbList(this.$route, this.homeRoute);
  }

  getBreadCrumbList(route: Route, homeRoute: RouteConfig): Array<BreadCrumbItem | MatchedItem> {
    let homeItem = { ...homeRoute, icon: homeRoute.meta.icon };
    let routeMetched = route.matched;
    if (routeMetched.some(item => item.name === homeRoute.name)) return [homeItem];
    let res = routeMetched
      .filter(item => {
        return item.meta === undefined || !item.meta.hideInBread;
      })
      .map(item => {
        let meta = { ...item.meta };
        let obj = {
          icon: (item.meta && item.meta.icon) || '',
          name: item.name || '',
          meta
        };
        return obj;
      });
    res = res.filter(item => {
      return !item.meta.hideInMenu;
    });

    return [{ ...homeItem, to: '/' + homeRoute.path }, ...res];
  }

  @Watch('$route')
  handleRouteChange() {
    this.breadCrumbList = this.getBreadCrumbList(this.$route, this.homeRoute);
  }
}
</script>

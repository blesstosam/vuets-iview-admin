<style lang="stylus">
.app-main
  padding: 0 18px 0px 18px
  overflow-x: hidden
  overflow-y: auto
  width 100%
  height: calc(100% - 103px)
  .app-main-card
    min-height calc(100vh - 185px)
    .common-card-title
      font-size 16px
      font-weight 500
      padding 0 0 10px 0
      margin 0 0 24px 0
      border-bottom 1px solid #e8eaec
      line-height 1.7
      display flex
      justify-content space-between
  & .app-main-footer
    margin-top 30px
    margin-bottom 15px
    height: 30px;
    line-height: 30px;
    text-align: center
    font-size 13px
    a
      color #515a6e;
      &:hover
        color #2d8cf0
</style>

<template>
  <section class="app-main" id="app-main" ref="main">
    <div class="app-main-card" :style="{ height: isFullscreen ? '100%' : 'auto' }">
      <!-- <transition name="fade" mode="out-in"> -->
      <keep-alive :max="10" :include="cacheList">
        <router-view />
      </keep-alive>
      <!-- </transition> -->
    </div>
    <ABackTop :height="100" :bottom="30" :right="50" container=".app-main" />

    <div class="app-main-footer" v-if="!isFullscreen">
      <span>Copyright © {{ new Date().getFullYear() }} Angel 技术支持</span>
      <Divider type="vertical" />
      <a target="blank" href="https://github.com/blesstosam" style="margin-right: 12px;">Github</a>
      <a target="blank" href="https://segmentfault.com/u/weilei_58f084f7de891">Segmentfault</a>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import ABackTop from './components/ABackTop.vue';
import { Mutation, Getter } from 'vuex-class';
import { SET_LOCAL, TOGGLE_SIDE_BAR } from '@/store/mutation-types';
import CommonCardTitle from '@/components/CommonCardTitle.vue';
import cfg from '@/config/index';

@Component({
  components: { ABackTop, CommonCardTitle }
})
export default class AppMain extends Vue {
  created() {
    // 根据显示器宽度自动展开隐藏sidebar
    window.addEventListener('resize', () => {
      this.winWidth = window.innerWidth;
    });
  }
  mounted() {
    window.addEventListener('storage', () => {
      // 当同时打开两个网页 其中一个网页退出登录的时候 通知另一个网页刷新 把之前的路由清掉
      // 这样就不会重复push路由进去了
      if (localStorage.getItem('username') === '') {
        window.location.reload();
        setTimeout(() => {
          this.$router.push('/login');
        }, 200);
      }
    });
    this.setLocal(this.$i18n.locale);
  }

  winWidth: number = window.innerWidth;

  // 加上一个配置控制
  get cacheList(): Array<string> {
    return cfg.useComponentCache ? this.cachedViews : [];
  }

  @Getter('cachedViews') readonly cachedViews!: Array<string>;
  @Getter('isSidebarOpened') readonly isSidebarOpened!: boolean;

  @Watch('winWidth')
  handleWinChange(val: number) {
    if (val < 960 && this.isSidebarOpened) {
      this.toggleSideBar(false);
    } else if (val > 960 && !this.isSidebarOpened) {
      this.toggleSideBar(true);
    }
  }

  get isFullscreen() {
    return cfg.fullscreenPath.indexOf(this.$route.fullPath) !== -1;
  }

  @Mutation(SET_LOCAL) setLocal!: (lang: string) => void;
  @Mutation(TOGGLE_SIDE_BAR) toggleSideBar!: (bool: boolean) => void;
}
</script>

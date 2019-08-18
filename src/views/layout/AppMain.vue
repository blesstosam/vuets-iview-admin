<style lang="stylus">
.app-main
  padding: 18px 18px 0px 18px
  overflow-x: hidden
  overflow-y: auto
  width 100%
  height: calc(100% - 103px)
  .app-main-card .common-card-title
    font-size 16px
    font-weight 500
    padding 18px 0 10px 0
    margin 0 0 24px 0
    border-bottom 1px solid #e8eaec
    line-height 1.7
    display flex
    justify-content space-between
</style>
<style type="text/css">
.app-main-footer {
  height: 30px;
  line-height: 30px;
  text-align: center;
}
</style>
<template>
  <section class="app-main" id="app-main" ref="main">
    <div class="app-main-card" id="app-main-card">
      <!-- <transition name="fade" mode="out-in"> -->
      <!-- <keep-alive> -->
      <div class="app-main-center">
        <router-view />
      </div>
      <!-- </keep-alive> -->
      <!-- </transition> -->
    </div>
    <ABackTop :height="100" :bottom="30" :right="50" container=".app-main" />
    <div class="app-main-footer" id="app-main-footer">
      Copyright © 2019 xxx技术支持
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import ABackTop from './components/ABackTop.vue';
import { Mutation } from 'vuex-class';
import { SET_LOCAL } from '@/store/mutation-types';
import CommonCardTitle from '@/components/CommonCardTitle.vue';

@Component({
  components: { ABackTop, CommonCardTitle }
})
export default class AppMain extends Vue {
  mounted() {
    this.setLocal(this.$i18n.locale);
    this.getDivHeight();
  }
  // 计算高度
  getDivHeight() {
    let appMainHeight = document.getElementById('app-main')!.offsetHeight;
    let appMainCardHeight = document.getElementById('app-main-card')!.offsetHeight;

    if (appMainHeight - 18 - 35 > appMainCardHeight) {
      document.getElementById('app-main-footer')!.style.marginTop = appMainHeight - 18 - 35 - appMainCardHeight + 'px';
    } else {
      document.getElementById('app-main-footer')!.style.marginTop = '30px';
    }
  }

  @Watch('$route')
  handleRouteChange() {
    this.$nextTick(() => {
      this.getDivHeight();
    });
  }

  @Mutation(SET_LOCAL) setLocal!: (lang: string) => void;
}
</script>

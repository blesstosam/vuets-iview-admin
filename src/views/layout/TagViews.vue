<style lang="stylus">
.tagview
  position: relative;
  height: 44px;
  .close-con
    position: absolute;
    right: 10px;
    top: 5px;
    height: 32px;
    width: 32px;
    background: #fff;
    text-align: center;
    border-radius 3px;
    z-index: 1;
    button
      height 32px
  .contextmenu
    position: absolute;
    margin: 0;
    padding: 5px 0;
    background: #fff;
    z-index: 1000;
    list-style-type: none;
    border-radius: 4px;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.1);
    li
      margin: 0;
      padding: 5px 15px;
      cursor: pointer;
      &:hover
        background: #eee
  & .btn-con
    position: absolute;
    top: 0px;
    height: 100%;
    padding-top: 5px;
    z-index: 1;
    button
      padding: 6px 4px;
      line-height: 18px;
      text-align: center;
      outline: none;
      background: none;
      border: none;
      color #515a6e
    &.left-btn
      left: 0px;
    &.right-btn
      right: 42px;
  & .scroll-wrapper
    position: absolute;
    left: 27px;
    right: 74px;
    height: 100%;
    overflow: hidden;
    .scroll-bar
      display: flex;
      overflow: visible;
      position: absolute;
      transition: left 0.4s ease;
      white-space: nowrap;
      height: 100%
      padding 4px 4px 0
      .ivu-tag
        border 0 !important
        margin-right 6px !important
        .ivu-tag-text
          font-size 13px
          cursor pointer
      & .ivu-icon-ios-close
        margin-left 8px !important
        font-size 16px
      & .ivu-tag-primary
        .ivu-tag-text
          color #2d8cf0
      & .ivu-btn-text:focus
        box-shadow none
</style>

<template>
  <div class="tagview">
    <!-- 关闭按钮 -->
    <div class="close-con">
      <Dropdown transfer @on-click="handleTagsOption">
        <Button size="small" type="text">
          <Icon :size="18" type="ios-arrow-down" />
        </Button>
        <DropdownMenu slot="list">
          <DropdownItem name="close-all">{{ $t('closeAll') }}</DropdownItem>
          <DropdownItem name="close-others">{{ $t('closeOthers') }}</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>

    <!-- 右键菜单 -->
    <ul v-show="visible" class="contextmenu" :style="{ left: contextMenuLeft + 'px', top: contextMenuTop + 'px' }">
      <li v-for="(item, key) of menuList" @click="handleTagsOption(key)" :key="key">{{ item }}</li>
    </ul>

    <!-- 左右箭头 -->
    <div class="btn-con left-btn">
      <button type="text" @click="handleScroll(240)">
        <Icon :size="18" type="ios-arrow-back" />
      </button>
    </div>
    <div class="btn-con right-btn">
      <button type="text" @click="handleScroll(-240)">
        <Icon :size="18" type="ios-arrow-forward" />
      </button>
    </div>

    <!-- 标签bar -->
    <div
      class="scroll-wrapper"
      ref="scrollWrapper"
      @DOMMouseScroll.prevent="handleMouseScroll"
      @mousewheel.prevent="handleMouseScroll"
    >
      <div class="scroll-bar" :style="{ left: tagBodyLeft + 'px' }" ref="scrollBar">
        <transition-group name="taglist-moving-animation">
          <Tag
            type="dot"
            v-for="(item, index) in viewListWithHomePage"
            :ref="item.name"
            :key="`tag-nav-${index}`"
            :name="item.name"
            :data-route-item="item"
            @on-close="closeView(item)"
            @click.native="handleClick(item)"
            :closable="item.name !== homePageName"
            :color="isActive(item) ? 'primary' : 'default'"
            @contextmenu.prevent.native="contextMenu(item, $event)"
            >{{ showTitle(item) }}</Tag
          >
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
const padding = 15;
import { ADD_VISITED_VIEW, DEL_VISITED_VIEW, CLEAR_VISITED_VIEW, DEL_OTHER_VISITED_VIEW } from '@/store/mutation-types';
import { Vue, Component, Watch, Prop } from 'vue-property-decorator';
import { Mutation, Getter } from 'vuex-class';
import { Route } from 'vue-router';
import { VisitedViewsList, VisitedViewItem } from '@/store/module/app';
import { showTitle } from '@/assets/script/util';
import cfg from '@/config/index';

@Component
export default class TagViews extends Vue {
  created() {
    this.menuList.others = this.$t('closeOthers') as string;
    this.menuList.all = this.$t('closeAll') as string;
  }
  mounted() {
    this.handleScroll(-100);
  }

  homePageName: string = cfg.homeName;

  tagBodyLeft: number = 0;
  isIconHidden: boolean = true;

  contextMenuLeft: number = 0;
  contextMenuTop: number = 0;
  visible: boolean = false;
  menuList: { others: string; all: string } = {
    others: '',
    all: ''
  };
  @Getter('visitedViews') viewList!: VisitedViewsList;
  @Prop() readonly isShowTagsView!: boolean;

  @Watch('$route')
  handleRouteChange() {
    this.addView(this.moveToTarget);
  }
  @Watch('visible')
  handleVisibleChange(value: boolean) {
    if (value) {
      document.body.addEventListener('click', this.closeMenu);
    } else {
      document.body.removeEventListener('click', this.closeMenu);
    }
  }

  get viewListWithHomePage(): VisitedViewsList {
    return [{ name: 'home', title: 'menuTitle.home', path: '/home' }, ...this.viewList];
  }

  @Mutation(ADD_VISITED_VIEW) addVisitedView!: (route: Route) => void;
  @Mutation(DEL_VISITED_VIEW) delVisitedView!: (item: VisitedViewItem) => void;
  @Mutation(CLEAR_VISITED_VIEW) clearVisitedView!: () => void;
  @Mutation(DEL_OTHER_VISITED_VIEW) delOtherVisitedView!: (route: Route) => void;

  showTitle(item: any) {
    return showTitle(item, this);
  }

  handleTagsOption(type: string) {
    if (type.includes('all')) {
      this.clearVisitedView();
      // 跳到首页
      this.$router.push({ name: cfg.homeName });
    } else if (type.includes('others')) {
      // 关闭除当前页和home页的其他页
      this.delOtherVisitedView(this.$route);
    }
    setTimeout(() => {
      this.moveToTarget();
    }, 100);
  }

  // 关闭右键菜单
  closeMenu() {
    this.visible = false;
  }

  // 打开右键菜单
  contextMenu(item: VisitedViewItem, e: MouseEvent) {
    if (item.name === cfg.homeName) {
      return;
    }
    this.visible = true;
    const offsetLeft = this.$el.getBoundingClientRect().left;
    this.contextMenuLeft = e.clientX - offsetLeft + 10;
    this.contextMenuTop = e.clientY - 64;
  }

  handleClick(item: VisitedViewItem) {
    this.$router.push(item.path);
  }

  // 滑动到当前路由所在tag
  moveToTarget(): void {
    this.$nextTick(() => {
      // 找个路由对应的dom
      let _el = (this.$refs[this.$route.name as string] as Vue[])[0].$el;

      let wrapperWidth = (this.$refs.scrollWrapper as HTMLElement).offsetWidth;
      // let barWidth = this.$refs.scrollBar.offsetWidth;
      let _right = (_el as HTMLElement).offsetLeft + (_el as HTMLElement).offsetWidth + this.tagBodyLeft;
      let _left = (_el as HTMLElement).offsetLeft + this.tagBodyLeft;
      let _o;
      // console.log(_right, _left, wrapperWidth)
      if (_right > wrapperWidth) {
        // 右边隐藏了，向左滚
        _o = -(_right - (this.$refs.scrollWrapper as HTMLElement).offsetWidth + padding);
      } else if ((_el as HTMLElement).offsetLeft + this.tagBodyLeft < 0) {
        // 左边隐藏了
        _o = -(_left - padding);
      }
      _o && this.handleScroll(_o);
    });
  }

  handleMouseScroll(e: WheelEvent) {
    let delta = 0;
    // DOMMouseScroll | 火狐  mousewheel | 标准
    if (e.type === 'DOMMouseScroll' || e.type === 'mousewheel') {
      delta = (e as WheelEvent & { wheelDelta: number }).wheelDelta
        ? (e as WheelEvent & { wheelDelta: number }).wheelDelta
        : -(e.detail || 0) * 40;
    }
    this.handleScroll(delta);
  }

  handleScroll(offset: number) {
    let wrapperWidth = (this.$refs.scrollWrapper as HTMLElement).offsetWidth;
    let barWidth = (this.$refs.scrollBar as HTMLElement).offsetWidth;
    if (offset > 0) {
      // 向左移
      this.tagBodyLeft = Math.min(0, this.tagBodyLeft + offset);
    } else {
      if (wrapperWidth < barWidth) {
        if (this.tagBodyLeft < -(barWidth - wrapperWidth)) {
          // barWidth大于wrapperWidth
          // this.tagBodyLeft = this.tagBodyLeft;
        } else {
          this.tagBodyLeft = Math.max(this.tagBodyLeft + offset, wrapperWidth - barWidth);
        }
      } else {
        this.tagBodyLeft = 0;
      }
    }
  }

  generateRoute(): Route | boolean {
    if (this.$route.name) {
      return this.$route;
    }
    return false;
  }

  isActive(route: Route | VisitedViewItem): boolean {
    return route.path === this.$route.path || route.name === this.$route.name;
  }

  addView(cb: () => void) {
    // 如果没有开启页签 则不会缓存组件
    if (!this.isShowTagsView) return;
    const _r = this.generateRoute();
    if (!_r) {
      return false;
    }
    // 如果是点击首页，不需要增加
    if ((_r as Route).name === cfg.homeName) {
      return false;
    }

    this.addVisitedView(_r as Route);
    cb && cb();
  }

  closeView(item: VisitedViewItem): void {
    this.delVisitedView(item);
    if (this.isActive(item)) {
      // 如果关闭的是正在显示的路由，需要跳转到上一个路由
      const latestView = this.viewList.slice(-1)[0];
      if (latestView) {
        this.$router.push(latestView.path);
      } else {
        this.$router.push({ name: cfg.homeName });
      }
    }
  }
}
</script>

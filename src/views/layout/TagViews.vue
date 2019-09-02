<style lang="stylus" scoped>
.tagview
  position: relative;
  height: 40px;
  background: #F0F0F0;
  border-top: 1px solid #F0F0F0;
  border-bottom: 1px solid #F0F0F0
  .close-con
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 32px;
    background: #fff;
    text-align: center;
    z-index: 10;
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
    background: #fff;
    padding-top: 3px;
    z-index: 10;
    button
      padding: 6px 4px;
      line-height: 14px;
      text-align: center;
    &.left-btn
      left: 0px;
    &.right-btn
      right: 32px;
      border-right: 1px solid #f0f0f0
  & .scroll-wrapper
    position: absolute;
    left: 27px;
    right: 45px;
    height: 100%;
    overflow: hidden;
    box-shadow: 0px 0 3px 2px rgba(100, 100, 100, 0.1) inset;
    .scroll-bar
      display: flex;
      overflow: visible;
      position: absolute;
      transition: left 0.4s ease;
      white-space: nowrap;
      height: 100%
      padding 1px 4px 0
</style>

<template>
  <div class="tagview">
    <!-- 关闭按钮 -->
    <div class="close-con">
      <Dropdown transfer @on-click="handleTagsOption" style="margin-top:7px;">
        <Button size="small" type="text">
          <Icon :size="18" type="ios-close-circle-outline" />
        </Button>
        <DropdownMenu slot="list">
          <DropdownItem name="close-all">关闭所有</DropdownItem>
          <DropdownItem name="close-others">关闭其他</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>

    <!-- 右键菜单 -->
    <ul v-show="visible" class="contextmenu" :style="{ left: contextMenuLeft + 'px', top: contextMenuTop + 'px' }">
      <li v-for="(item, key) of menuList" @click="handleTagsOption(key)" :key="key">{{ item }}</li>
    </ul>

    <!-- 左右箭头 -->
    <div class="btn-con left-btn">
      <Button type="text" @click="handleScroll(240)">
        <Icon :size="18" type="ios-arrow-back" />
      </Button>
    </div>
    <div class="btn-con right-btn">
      <Button type="text" @click="handleScroll(-240)">
        <Icon :size="18" type="ios-arrow-forward" />
      </Button>
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
            :closable="item.name !== $config.homeName"
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
/* eslint-disable-next-line no-unused-vars */
import { RouteConfig } from '@/type';
/* eslint-disable-next-line no-unused-vars */
import { VisitedViewsList, VisitedViewItem } from '@/store/module/app';
import { showTitle } from '@/assets/script/util';

@Component({})
export default class TagViews extends Vue {
  $config: any;

  tagBodyLeft: number = 0;
  isIconHidden: boolean = true;

  contextMenuLeft: number = 0;
  contextMenuTop: number = 0;
  visible: boolean = false;
  menuList: { others: string; all: string } = {
    others: '关闭其他',
    all: '关闭所有'
  };
  @Getter('visitedViews') viewList!: VisitedViewsList;
  @Prop() readonly isShowTagsView!: boolean;

  mounted() {
    this.handleScroll(-100);
  }

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

  @Mutation(ADD_VISITED_VIEW) addVisitedView!: (route: RouteConfig) => void;
  @Mutation(DEL_VISITED_VIEW) delVisitedView!: (item: VisitedViewItem) => void;
  @Mutation(CLEAR_VISITED_VIEW) clearVisitedView!: () => void;
  @Mutation(DEL_OTHER_VISITED_VIEW) delOtherVisitedView!: (route: RouteConfig) => void;

  showTitle(item: any) {
    return showTitle(item, this);
  }

  handleTagsOption(type: string) {
    if (type.includes('all')) {
      this.clearVisitedView();
      // 跳到首页
      this.$router.push({ name: this.$config.homeName });
    } else if (type.includes('others')) {
      // 关闭除当前页和home页的其他页
      this.delOtherVisitedView(this.$route);
      setTimeout(() => {
        this.moveToTarget();
      }, 100);
    }
  }

  // 关闭右键菜单
  closeMenu() {
    this.visible = false;
  }

  // 打开右键菜单
  contextMenu(item: VisitedViewItem, e: MouseEvent) {
    if (item.name === this.$config.homeName) {
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
      let _el =
        this.$route.name === 'dashboard'
          ? (this.$refs[this.$route.name] as Vue).$el
          : (this.$refs[this.$route.name as string] as Vue[])[0].$el;

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
          this.tagBodyLeft = this.tagBodyLeft;
        } else {
          this.tagBodyLeft = Math.max(this.tagBodyLeft + offset, wrapperWidth - barWidth);
        }
      } else {
        this.tagBodyLeft = 0;
      }
    }
  }

  generateRoute(): RouteConfig | boolean {
    if (this.$route.name) {
      return this.$route;
    }
    return false;
  }

  isActive(route: RouteConfig): boolean {
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
    if ((_r as RouteConfig).name === this.$config.homeName) {
      return false;
    }

    this.addVisitedView(_r as RouteConfig);
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
        this.$router.push({ name: this.$config.homeName });
      }
    }
  }
}
</script>

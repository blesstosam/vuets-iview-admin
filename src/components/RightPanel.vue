<style>
.showRightPanel {
  overflow: hidden;
  position: relative;
  width: calc(100% - 15px);
}
</style>
<style lang="stylus" scoped>
.rightPanel-background
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity .3s cubic-bezier(.7, .3, .1, 1);
  background: rgba(0, 0, 0, .2);
  z-index: -1;


.rightPanel
  width: 100%;
  max-width: 260px;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, .05);
  transition: all .25s cubic-bezier(.7, .3, .1, 1);
  transform: translate(100%);
  background: #fff;
  z-index: 40000
  padding 16px

.show
  transition: all .3s cubic-bezier(.7, .3, .1, 1);
  .rightPanel-background
    z-index: 20000;
    opacity: 1;
    width: 100%;
    height: 100%;
  .rightPanel
    transform: translate(0)

.handle-button
  width: 48px;
  height: 48px;
  position: absolute;
  text-align: center;
  font-size: 24px;
  border-radius: 6px 0 0 6px !important;
  z-index: 0;
  pointer-events: auto;
  cursor: pointer;
  color: #fff;
  line-height: 48px;
  transition all .3s cubic-bezier(.7, .3, .1, 1)
  i
    font-size: 24px;
    line-height: 48px
    position: relative;
    top: -1px
</style>
<template>
  <div ref="rightPanel" :class="{ show: show }" class="rightPanel-container">
    <div class="rightPanel-background" />
    <div class="rightPanel">
      <div
        ref="handleBtn"
        @mouseover="handleMouseOver"
        @mouseleave="handleMouseLeave"
        class="handle-button"
        :style="{ top: buttonTop + 'px', 'background-color': '#2d8cf0', left: left }"
        @click="show = !show"
      >
        <Icon :type="show ? 'md-close' : 'md-settings'" />
      </div>
      <div class="rightPanel-items">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { addClass, removeClass } from '@/assets/script/dom';
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

const ORIGINAL_LEFT = '-8px';

@Component({})
export default class RightPanel extends Vue {
  mounted() {
    this.insertToBody();
  }
  beforeDestroy() {
    (this.$refs.rightPanel as HTMLElement).remove();
  }

  @Prop({ default: false }) readonly clickNotClose!: boolean;
  @Prop({ default: 250 }) readonly buttonTop!: number;

  show: boolean = false;
  left: string = ORIGINAL_LEFT;

  get theme() {
    return this.$store.state.setting.theme;
  }

  @Watch('show')
  handleIsShow(value: boolean) {
    if (value && !this.clickNotClose) {
      this.addEventClick();
    }
    if (value) {
      addClass(document.body, 'showRightPanel');
    } else {
      removeClass(document.body, 'showRightPanel');
    }
  }

  handleMouseOver() {
    if (!this.show) {
      this.left = '-48px';
    }
  }
  handleMouseLeave() {
    if (!this.show) {
      this.left = ORIGINAL_LEFT;
    }
  }
  addEventClick() {
    window.addEventListener('click', this.closeSidebar);
  }
  closeSidebar(evt: Event) {
    const parent = (evt.target! as any).closest('.rightPanel');
    if (!parent) {
      this.show = false;
      window.removeEventListener('click', this.closeSidebar);
    }
  }
  insertToBody() {
    const elx = this.$refs.rightPanel;
    document.body.insertBefore(elx as HTMLElement, document.body.firstChild);
  }
}
</script>

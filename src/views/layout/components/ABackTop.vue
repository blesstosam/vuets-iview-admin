<template>
  <div :class="classes" :style="styles" @click="back">
    <slot>
      <div :class="innerClasses">
        <i class="ivu-icon ivu-icon-ios-arrow-up"></i>
      </div>
    </slot>
  </div>
</template>

<script lang="ts">
import { scrollTop, on, off } from '@/assets/script/util';
import { Vue, Component, Prop } from 'vue-property-decorator';
const prefixCls = 'ivu-back-top';

@Component({})
export default class ABackTop extends Vue {
  backTop: boolean = false;

  @Prop({ default: 400 }) readonly height!: number;
  @Prop({ default: 30 }) readonly bottom!: number;
  @Prop({ default: 30 }) readonly right!: number;
  @Prop({ default: 1000 }) readonly duration!: number;
  @Prop({ default: window }) readonly container!: any;

  mounted() {
    on(this.containerEle, 'scroll', this.handleScroll);
    on(this.containerEle, 'resize', this.handleScroll);
  }

  beforeDestroy() {
    off(this.containerEle, 'scroll', this.handleScroll);
    off(this.containerEle, 'resize', this.handleScroll);
  }

  get classes() {
    return [
      `${prefixCls}`,
      {
        [`${prefixCls}-show`]: this.backTop
      }
    ];
  }
  get styles() {
    return {
      bottom: `${this.bottom}px`,
      right: `${this.right}px`
    };
  }
  get innerClasses() {
    return `${prefixCls}-inner`;
  }
  get containerEle() {
    return this.container === window ? window : document.querySelector(this.container);
  }

  handleScroll() {
    this.backTop = this.containerEle.scrollTop >= this.height;
  }

  back() {
    let target = typeof this.container === 'string' ? this.containerEle : document.documentElement || document.body;
    const sTop = target.scrollTop;
    scrollTop(this.containerEle, sTop, 0, this.duration);
  }
}
</script>

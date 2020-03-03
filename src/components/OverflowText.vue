<style lang="stylus" scoped>
.overflow-text, .tooltip {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
  vertical-align: top;
}
</style>
<style lang="stylus">
.overflow-text {
  .ivu-tooltip-rel {
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: top;
  }
}
</style>
<template>
  <div class="overflow-text" ref="parentComponent">
    <Tooltip class="tooltip" placement="top" v-if="tooltipShow">
      <span ref="contentComponent">
        {{ content }}
      </span>
      <div slot="content">
        <span ref="contentComponent">
          {{ content }}
        </span>
      </div>
    </Tooltip>
    <span v-else ref="contentComponent">
      {{ content }}
    </span>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch, Ref } from 'vue-property-decorator';
@Component
export default class OverflowText extends Vue {
  @Prop() readonly content!: string | number;
  @Ref() readonly contentComponent!: HTMLElement;
  @Ref() readonly parentComponent!: HTMLElement;
  tooltipShow: boolean = false;
  mounted() {
    this.handleTextChange();
  }
  @Watch('content')
  handleTextChange() {
    this.$nextTick(() => {
      const parentWidth = this.parentComponent.offsetWidth;
      const contentWidth = this.contentComponent.offsetWidth;
      if (contentWidth > parentWidth) {
        this.tooltipShow = true;
      } else {
        this.tooltipShow = false;
      }
    });
  }
}
</script>

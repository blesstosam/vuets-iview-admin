<style lang="less" scoped>
.trans {
  transition: transform 0.2s ease;
}
@size: 40px;
.sider-trigger-a {
  padding: 6px;
  width: @size;
  height: @size;
  display: inline-block;
  text-align: center;
  margin-top: 12px;
  i {
    .trans;
    vertical-align: top;
  }
  &.collapsed i {
    transform: rotateZ(90deg);
    .trans;
  }
}
</style>

<template>
  <a
    @click="onChange"
    type="text"
    :style="{ color: textColor }"
    :class="['sider-trigger-a', !isSidebarOpened ? 'collapsed' : '']"
  >
    <Icon :type="icon" :size="size" />
  </a>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Getter, Mutation } from 'vuex-class';
import { TOGGLE_SIDE_BAR } from '@/store/mutation-types';
/* eslint-disable-next-line no-unused-vars */
import { SidebarThemeType, HeaderThemeType } from '@/store/module/setting';
import { getTextColor } from '@/assets/script/util';

@Component({})
export default class SiderTrigger extends Vue {
  @Prop({ default: 'navicon-round' }) readonly icon!: string;
  @Prop({ default: 26 }) readonly size!: number;

  @Getter('isSidebarOpened') isSidebarOpened!: boolean;
  @Getter('headerTheme') headerTheme!: HeaderThemeType;
  get textColor() {
    return getTextColor(this.headerTheme);
  }

  onChange() {
    this.toggleSidebar(!this.isSidebarOpened);
  }
  @Mutation(TOGGLE_SIDE_BAR) toggleSidebar!: (bool: boolean) => void;
}
</script>

<template>
  <Dropdown
    ref="dropdown"
    @on-click="handleClick"
    :class="hideTitle ? '' : 'collased-menu-dropdown'"
    :transfer="hideTitle"
    :placement="placement"
  >
    <a
      class="drop-menu-a"
      type="text"
      @mouseover="handleMousemove($event, children)"
      :style="{ textAlign: !hideTitle ? 'left' : '' }"
    >
      <common-icon :size="rootIconSize" :color="textColor" :type="parentItem.icon" />
      <span class="menu-title" v-if="!hideTitle" :style="{ color: textColor }">{{ showTitle(parentItem) }}</span>
    </a>
    <DropdownMenu ref="dropdown" slot="list">
      <template v-for="child in children">
        <collapsed-menu
          v-if="showChildren(child)"
          :icon-size="iconSize"
          :parent-item="child"
          :key="`drop-${child.name}`"
        ></collapsed-menu>
        <DropdownItem v-else :key="`drop-${child.name}`" :name="child.name">
          <common-icon :size="iconSize" :type="child.icon" />
          <span class="menu-title">{{ showTitle(child) }}</span>
        </DropdownItem>
      </template>
    </DropdownMenu>
  </Dropdown>
</template>

<script lang="ts">
import mixin from './mixin';
import itemMixin from './item-mixin';
import { findNodeUpperByClasses, getTextColor } from '@/assets/script/util';
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  mixins: [itemMixin, mixin]
})
export default class CollapsedMenu extends Vue {
  mounted() {
    let dropdown = findNodeUpperByClasses((this.$refs.dropdown as Vue).$el, [
      'ivu-select-dropdown',
      'ivu-dropdown-transfer'
    ]);
    if (dropdown) dropdown.style.overflow = 'visible';
    if (this.setPlacementBottomStart) this.placement = 'bottom-start';
  }

  @Prop({ default: false }) readonly hideTitle!: boolean;
  @Prop({ default: 20 }) readonly rootIconSize!: number;
  // 是否将菜单置于底部（在菜单显示在顶部的时候为true）
  @Prop({ default: false }) readonly setPlacementBottomStart!: boolean;

  placement: string = 'right-end';

  get showMenuInHeader() {
    return this.$store.state.setting.showMenuInHeader;
  }
  get headerTheme() {
    return this.$store.state.setting.headerTheme;
  }
  get sidebarTheme() {
    return this.$store.state.setting.sidebarTheme;
  }
  get textColor() {
    if (this.showMenuInHeader) {
      return getTextColor(this.headerTheme);
    }
    return getTextColor(this.sidebarTheme);
  }

  handleClick(name: string) {
    this.$emit('on-click', name);
  }
  handleMousemove(event: any, children: any) {
    if (this.setPlacementBottomStart) return;
    const { pageY } = event;
    const height = children.length * 38;
    const isOverflow = pageY + height < window.innerHeight;
    this.placement = isOverflow ? 'right-start' : 'right-end';
  }
}
</script>

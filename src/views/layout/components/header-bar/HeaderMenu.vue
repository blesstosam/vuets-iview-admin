<style lang="less">
.header-menu {
  user-select: none;
  margin-left: 20px;
  .menu-collapsed {
    display: flex;
    .ivu-dropdown {
      width: 100%;
      .ivu-dropdown-rel a {
        width: 100%;
      }
      .ivu-select-dropdown {
        width: 150px;
      }
    }
    .collased-menu-dropdown {
      width: 110px;
      height: 64px;
      line-height: 62px;
      // border: 1px solid red;
      margin: 0;
      // line-height: normal;
      font-size: 14px !important;
      white-space: nowrap;
      cursor: pointer;
      transition: background 0.2s ease-in-out;
      &:hover {
        background: rgba(100, 100, 100, 0.1);
      }
      & * {
        color: #515a6e;
      }
      .ivu-menu-item > i {
        margin-right: 12px !important;
      }
      .ivu-menu-submenu > .ivu-menu > .ivu-menu-item > i {
        margin-right: 8px !important;
      }
    }
    .ivu-tooltip {
      width: 110px;
      .ivu-tooltip-rel {
        width: 100%;
      }
      .ivu-tooltip-popper .ivu-tooltip-content {
        .ivu-tooltip-arrow {
          border-right-color: #fff;
        }
        .ivu-tooltip-inner {
          background: #fff;
          color: #495060;
        }
      }
    }
  }
  a.drop-menu-a {
    display: inline-block;
    width: 100%;
    text-align: center !important;
    color: #495060;
  }
  .menu-title {
    padding-left: 6px;
    font-size: 14px;
    vertical-align: middle;
  }
}
</style>
<template>
  <div class="header-menu">
    <div class="menu-collapsed" :list="menuList">
      <template v-for="item in menuList">
        <collapsed-menu
          v-if="item.children && item.children.length > 1"
          :setPlacementBottomStart="true"
          @on-click="handleSelect"
          :hide-title="false"
          :root-icon-size="rootIconSize"
          :icon-size="iconSize"
          :parent-item="item"
          :key="`drop-menu-${item.name}`"
        />
        <Tooltip
          transfer
          v-else
          :content="showTitle(item.children && item.children[0] ? item.children[0] : item)"
          placement="bottom"
          :key="`drop-menu-${item.name}`"
        >
          <a @click="handleSelect(getNameOrHref(item, true))" class="drop-menu-a">
            <common-icon
              :size="rootIconSize"
              :color="textColor"
              :type="item.icon || (item.children && item.children[0].icon)"
            />
            <span class="menu-title" :style="{ color: textColor }">{{
              showTitle(item.children && item.children[0] ? item.children[0] : item)
            }}</span>
          </a>
        </Tooltip>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import CollapsedMenu from '../side-menu/CollapsedMenu.vue';
import Mixin from '../side-menu/mixin';
import { Component, Vue, Prop } from 'vue-property-decorator';
import { MenuItem } from '@/type';
import { Getter } from 'vuex-class';
import { HeaderThemeType } from '@/store/module/setting';
import { getTextColor } from '@/assets/script/util';

@Component({
  components: {
    CollapsedMenu
  },
  mixins: [Mixin]
})
export default class HeaderMenu extends Vue {
  get textColor() {
    return getTextColor(this.headerTheme);
  }
  @Getter('headerTheme') headerTheme!: HeaderThemeType;
  @Getter('menuList') menuList!: Array<MenuItem>;

  @Prop({ default: 18 }) readonly rootIconSize!: number;
  @Prop({ default: 16 }) readonly iconSize!: number;
  @Prop(Boolean) readonly accordion!: boolean;
  @Prop({ default: '' }) activeName!: string;
  @Prop({ default: () => [] }) openNames!: Array<any>;

  handleSelect(name: string) {
    if (name) {
      this.$router.push({ name });
    }
  }
  getOpenedNamesByActiveName(name: string): (string | undefined)[] {
    return this.$route.matched.map(item => item.name).filter(item => item !== name);
  }
}
</script>

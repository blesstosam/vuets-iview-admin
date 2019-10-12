<style lang="less">
.side-menu-wrapper {
  user-select: none;
  margin-right: 18px;

  // 防止菜单搜索的下拉框被遮住
  .ivu-menu {
    z-index: 199 !important;
  }
  .menu-collapsed {
    padding-top: 10px;
    .collased-menu-dropdown {
      width: 100%;
      margin: 0;
      line-height: normal;
      padding: 7px 0 6px 16px;
      clear: both;
      font-size: 12px !important;
      white-space: nowrap;
      list-style: none;
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
    .ivu-dropdown {
      width: 100%;
      .ivu-dropdown-rel a {
        width: 100%;
      }
    }
    .ivu-tooltip {
      width: 100%;
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
    padding: 6px 15px;
    width: 100%;
    text-align: center;
    color: #495060;
  }
  .menu-title {
    padding-left: 6px;
  }
}
</style>
<template>
  <div class="side-menu-wrapper">
    <slot></slot>
    <Menu
      ref="menu"
      v-show="!collapsed"
      :active-name="activeName"
      :open-names="openedNames"
      :accordion="accordion"
      :theme="sidebarTheme"
      width="auto"
      @on-select="handleSelect"
    >
      <template v-for="item in menuList">
        <template v-if="item.children && item.children.length === 1">
          <side-menu-item v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item" />
          <menu-item v-else :name="getNameOrHref(item, true)" :key="`menu-${item.children[0].name}`">
            <common-icon :type="item.children[0].icon || ''" />
            <span>{{ showTitle(item.children[0]) }}</span>
          </menu-item>
        </template>
        <template v-else>
          <side-menu-item v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item" />
          <menu-item v-else :name="getNameOrHref(item)" :key="`menu-${item.name}`">
            <common-icon :type="item.icon || ''" />
            <span>{{ showTitle(item) }}</span>
          </menu-item>
        </template>
      </template>
    </Menu>

    <div class="menu-collapsed" v-show="collapsed" :list="menuList">
      <template v-for="item in menuList">
        <collapsed-menu
          v-if="item.children && item.children.length > 1"
          @on-click="handleSelect"
          :hide-title="true"
          :root-icon-size="rootIconSize"
          :icon-size="iconSize"
          :theme="sidebarTheme"
          :parent-item="item"
          :key="`drop-menu-${item.name}`"
        />
        <Tooltip
          transfer
          v-else
          :content="showTitle(item.children && item.children[0] ? item.children[0] : item)"
          placement="right"
          :key="`drop-menu-${item.name}`"
        >
          <a @click="handleSelect(getNameOrHref(item, true))" class="drop-menu-a" :style="{ textAlign: 'center' }">
            <common-icon
              :size="rootIconSize"
              :color="textColor"
              :type="item.icon || (item.children && item.children[0].icon)"
            />
          </a>
        </Tooltip>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import SideMenuItem from './SideMenuItem.vue';
import CollapsedMenu from './CollapsedMenu.vue';
import { getUnion, getTextColor } from '@/assets/script/util';
import Mixin from './mixin';
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';
import { IMenu, MenuItem } from '@/type';
import { Getter } from 'vuex-class';
import { SidebarThemeType } from '@/store/module/setting';

@Component({
  components: {
    SideMenuItem,
    CollapsedMenu
  },
  mixins: [Mixin]
})
export default class SideMenu extends Vue {
  mounted() {
    this.openedNames = getUnion(this.openedNames, this.getOpenedNamesByActiveName(name));
  }

  get textColor() {
    return getTextColor(this.sidebarTheme);
  }
  @Getter('sidebarTheme') sidebarTheme!: SidebarThemeType;

  @Prop({ default: () => [] }) readonly menuList!: Array<MenuItem>;
  @Prop(Boolean) readonly collapsed!: boolean;
  @Prop({ default: 20 }) readonly rootIconSize!: number;
  @Prop({ default: 16 }) readonly iconSize!: number;
  @Prop(Boolean) readonly accordion!: boolean;
  @Prop({ default: '' }) activeName!: string;

  openedNames: (string | undefined)[] = [];

  @Watch('activeName')
  activeNameChanged(name: string) {
    if (this.accordion) {
      this.openedNames = this.getOpenedNamesByActiveName(name);
    } else {
      this.openedNames = getUnion(this.openedNames, this.getOpenedNamesByActiveName(name));
    }
  }

  @Watch('openedNames')
  openedNamesChanged() {
    this.$nextTick(() => {
      (this.$refs.menu as IMenu).updateOpened();
    });
  }

  @Emit('on-select')
  handleSelect(name: string) {
    return name;
  }

  getOpenedNamesByActiveName(name: string): (string | undefined)[] {
    return this.$route.matched.map(item => item.name).filter(item => item !== name);
  }
}
</script>

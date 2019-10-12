<style lang="stylus" scoped>
.avatar-wrap
  width 230px
  height 64px
  display flex
  align-items center
  .text-wrap
    margin-left 10px
    line-height 1.5
    .logo-title
      font-size: 20px
      text-align: center
      font-weight 600
    & .username
      font-size 14px
      font-weight 400
</style>

<template>
  <div class="avatar-wrap" :class="{ 'avatar-small': !isSidebarOpened && !showMenuInHeader }">
    <!-- <Avatar size="large" :src="userAvatar" v-if="showAvatar" /> -->
    <BlockiesAvatar />
    <div class="text-wrap" v-if="isSidebarOpened || showMenuInHeader" :style="{ color: textColor }">
      <div class="logo-title">{{ $t('appName') }}</div>
      <div class="username">
        <span class="ivu-tag-dot-inner" style="background-color: #2d8cf0"></span>
        {{ username }}
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { SidebarThemeType, HeaderThemeType } from '@/store/module/setting';
import { getTextColor } from '@/assets/script/util';
import BlockiesAvatar from '@/components/BlockiesAvatar.vue';

@Component({
  components: { BlockiesAvatar }
})
export default class SideBarTop extends Vue {
  @Getter('username') readonly username!: string;
  @Getter('avatar') readonly userAvatar!: string;
  @Getter('isSidebarOpened') readonly isSidebarOpened!: boolean;
  @Getter('sidebarTheme') sidebarTheme!: SidebarThemeType;
  @Getter('headerTheme') headerTheme!: HeaderThemeType;

  @Prop({ default: true }) readonly showAvatar!: boolean; // 是否显示头像

  get showMenuInHeader() {
    return this.$store.state.setting.showMenuInHeader;
  }
  get textColor() {
    // 如果是展示在header上 用
    if (this.showMenuInHeader) {
      return getTextColor(this.headerTheme);
    }
    return getTextColor(this.sidebarTheme);
  }
}
</script>

<style lang="stylus">
.custom-bread-crumb
  display: inline-block
  vertical-align: top
  &-dark
    .ivu-breadcrumb
      a
        color white
      & > span:last-child
        color white
  &-primary
    .ivu-breadcrumb
      a
        color white
      & > span:last-child
        color white

@media screen and (max-width: 600px) {
  .custom-bread-crumb {
    display none
  }

}
</style>

<template>
  <div class="custom-bread-crumb" :class="`custom-bread-crumb-${headerTheme}`">
    <Breadcrumb :style="{ fontSize: `${fontSize}px` }">
      <BreadcrumbItem v-for="item in list" :to="item.to" :key="`bread-crumb-${item.name}`">
        <common-icon style="margin-right: 4px;" :type="item.icon || ''" :size="16" />
        <span style="vertical-align: middle">{{ showTitle(item) }}</span>
      </BreadcrumbItem>
    </Breadcrumb>
  </div>
</template>
<script lang="ts">
import { showTitle } from '@/assets/script/util';
import CommonIcon from '@/components//CommonIcon.vue';
import { Component, Vue, Prop } from 'vue-property-decorator';
import { HeaderThemeType } from '@/store/module/setting';
import { Getter } from 'vuex-class';

@Component({
  components: { CommonIcon }
})
export default class CustomBreadCrumb extends Vue {
  @Prop({ default: () => [] }) readonly list!: Array<any>;
  @Prop({ default: 14 }) readonly fontSize!: number;
  @Prop({ default: false }) readonly showIcon!: boolean;

  @Getter('headerTheme') headerTheme!: HeaderThemeType;

  showTitle(item: any) {
    return showTitle(item, this);
  }
  isCustomIcon(iconName: any) {
    return iconName.indexOf('_') === 0;
  }
  getCustomIconName(iconName: any) {
    return iconName.slice(1);
  }
}
</script>

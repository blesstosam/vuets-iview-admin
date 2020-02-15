<template>
  <div class="common-card-title" :class="`card-title-${headerTheme}`">
    <div>
      <Icon :size="16" :type="$route.meta.icon" style="position: relative; top: -1px;" />
      <span> {{ isI18nTitle ? $t($route.meta.title) : $route.meta.title }} </span>
      <div style="font-size: 13px; font-weight: normal;">
        {{ isI18nRemark ? $t($route.meta.remark) : $route.meta.remark }}
      </div>
    </div>
    <div class="action-wrap" style="margin-top: 12px;">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { HeaderThemeType } from '@/store/module/setting';

@Component({})
export default class CommonCardTitle extends Vue {
  @Getter('headerTheme') headerTheme!: HeaderThemeType;

  get isI18nTitle() {
    return this.$route.meta.title.indexOf('menuTitle') !== -1;
  }

  get isI18nRemark() {
    return this.$route.meta.remark.indexOf('remark') !== -1;
  }
}
</script>

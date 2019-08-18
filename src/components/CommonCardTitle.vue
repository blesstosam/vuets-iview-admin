<template>
  <div class="common-card-title" :class="`card-title-${headerTheme}`">
    <div>
      <Icon :size="14" :type="$route.meta.icon" style="position: relative; top: -1px;" />
      <span> {{ $route.meta.title }} </span>
      <div style="font-size: 13px; font-weight: normal;">
        {{ $t($route.meta.remark) }}
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
/* eslint-disable-next-line no-unused-vars */
import { HeaderThemeType } from '@/store/module/setting';

@Component({})
export default class CommonCardTitle extends Vue {
  @Getter('headerTheme') headerTheme!: HeaderThemeType;
}
</script>

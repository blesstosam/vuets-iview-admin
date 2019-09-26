<style scoped lang="stylus">
.span-style{
  color: #979797 !importent;
  cursor: pointer;
}
.no-select{
  user-select: none;
  color: #979797;
}
</style>
<template>
  <strong>
    <span :class="isNoData ? '' : 'span-style'" class="no-select">
      {{ isNoData ? $t('noData') : $t('networkError') }}
    </span>
    <Icon
      v-if="!isNoData"
      type="md-refresh"
      @click="handleEmit"
      style="margin-left:6px; background-color:#979797;"
      size="18"
    />
  </strong>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';

@Component({})
export default class RespStatus extends Vue {
  // 有两种状态 一种是 nodata 一种是网络异常 network error
  @Prop() isNoData!: boolean;

  @Emit('click')
  handleEmit() {
    return;
  }
}
</script>

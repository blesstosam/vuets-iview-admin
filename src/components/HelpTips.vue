<style scoped lang="stylus">
.tips {
  font-size: 12px;
  color: #fff;
}
</style>
<template>
  <Tooltip placement="bottom" max-width="200" :transfer="true">
    <Icon size="16" type="ios-help-circle" />
    <p slot="content" class="tips">{{ tips }}</p>
  </Tooltip>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component
export default class HelpTips extends Vue {
  @Prop(String) readonly tips!: string;
}
</script>

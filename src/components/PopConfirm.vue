<style lang="stylus">
.ivu-poptip-confirm .ivu-poptip-body .ivu-icon
  // 解决 iview 的一个小bug
  left 16px !important
</style>

<template>
  <Poptip v-on="$listeners" v-bind="$attrs" :placement="placement" confirm :title="confirmMsg">
    <Button type="error" size="small">删除</Button>
  </Poptip>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class PopConfirm extends Vue {
  @Prop({ default: '确定要删除吗？' }) readonly confirmMsg!: string;
  @Prop({ default: 'left-end' }) readonly placement!: string;
}
</script>

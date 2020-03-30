<style lang="stylus">
.ivu-poptip-popper
  & .ivu-poptip-title
    text-align: left
</style>

<template>
  <Poptip v-model="show" width="300" v-on="$listeners" v-bind="$attrs" :title="title" word-wrap>
    <template slot="title">
      <Icon size="16" type="ios-help-circle" color="#f90" style="margin-right: 8px" />
      <strong>{{ title }}</strong>
    </template>
    <slot name="action"> </slot>
    <template slot="content">
      <div>
        <slot name="desc"></slot>
        <Divider v-if="$slots.desc" />
        <Button type="text" @click="cancle">{{ cancleText }}</Button>
        <Button type="primary" @click="ok" :loading="loading">{{ okText }}</Button>
      </div>
    </template>
  </Poptip>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class PopConfirm extends Vue {
  @Prop({ default: '确定要删除吗？' }) readonly title!: string;

  @Prop({ default: '确定' }) readonly okText!: string;
  @Prop({ default: '取消' }) readonly cancleText!: string;

  @Prop() onOk!: Function;
  @Prop() onCancle!: Function;

  show = false;
  loading = false;

  async ok() {
    this.loading = true;
    if (this.onOk) {
      await this.onOk();
    }
    this.loading = false;
    this.show = false;
  }

  async cancle() {
    if (this.onCancle) {
      await this.cancle();
    }
    this.show = false;
  }
}
</script>

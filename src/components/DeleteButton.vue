<template>
  <Poptip v-on="$listeners" v-bind="$attrs" :placement="placement" confirm :title="confirmMsg">
    <Button type="error" size="small">删除</Button>
  </Poptip>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class DeleteButton extends Vue {
  @Prop({ default: '确定要删除吗？' }) readonly confirmMsg!: string;
  @Prop({ default: 'left-end' }) readonly placement!: string;
}
</script>

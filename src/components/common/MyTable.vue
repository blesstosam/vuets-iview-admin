<style scoped lang="stylus"></style>
<template>
  <div class="table-footer">
    <Table v-bind="$attrs">
      <template slot="action" slot-scope="{ row }">
        <TableAction tooltip-type="ipSetting" tooltip-content="ip段设置" @click="isModalShow = true" />
        <TableAction tooltip-type="delete" tooltip-content="删除" @click="handleDel(row)" />
      </template>

      <template slot="footer" style="text-align: center;">
        <span>网络异常，请点击刷新</span><Icon type="md-refresh" />
      </template>
    </Table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';

@Component({})
export default class MyTable extends Vue {
  @Prop() tooltipType!: 'ipSetting';

  @Prop() tooltipContent!: string;
  @Emit('click')
  handleEmit() {
    return;
  }
}
</script>

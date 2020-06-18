<style>
.retry-btn {
  color: #1890ff;
  cursor: pointer;
}
.no-data {
  color: #ccc;
}
</style>
<template>
  <div class="query-component">
    <div v-if="loading">
      <slot name="loading" :loading="loading">加载中...</slot>
    </div>

    <div v-if="error && !loading">
      <slot name="error">
        <div>
          <span>{{ error.msg }}</span>
          <span class="retry-btn" @click="retry">请点击重试！</span>
        </div>
      </slot>
    </div>

    <div v-if="isNil(data) && !loading && !error" class="no-data">
      <slot name="nodata">
        暂无数据！
      </slot>
    </div>

    <div v-if="!isNil(data) && !loading">
      <!-- 默认slot -->
      <slot :data="data">
        {{ data }}
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
import { AjaxResponse } from '../type';

@Component
export default class Query extends Vue {
  @Prop({ required: true }) request!: () => Promise<{ originalRes: AjaxResponse; data: any }>;

  loading = false;
  error: { code: number; msg: string } | null = null;
  data: { [k: string]: string } | Array<{ [k: string]: string }> | null = null;

  created() {
    this.innnerReq();
  }

  async innnerReq() {
    this.loading = true;
    const res = await this.request();
    this.loading = false;
    if (res.originalRes.code === 200) {
      this.data = res.data;
    } else {
      this.error = {
        code: res.originalRes.code,
        msg: res.originalRes.msg
      };
    }
  }

  retry() {
    this.innnerReq();
    this.handleRetry();
  }

  isNil(val: any) {
    return val === null || val === undefined;
  }

  @Emit('on-retry')
  handleRetry() {}
}
</script>

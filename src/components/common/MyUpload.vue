<template>
  <Upload
    style="margin-left: 72px; margin-bottom: 20px;"
    :action="uploadFilePath"
    :headers="{ token }"
    :on-success="handleSuccess"
    :on-format-error="handleErrorFile"
    :on-exceeded-size="handleMaxSize"
    :on-remove="handleRemove"
    :max-size="1 * 1024"
    :show-upload-list="false"
  >
    <Button size="small" icon="ios-cloud-upload-outline">上传预览图</Button>
  </Upload>
</template>

<script lang="ts">
import { Vue, Component, Emit } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { baseUrl } from '@/api/server';

@Component({})
export default class MyUpload extends Vue {
  uploadFilePath: string = `${baseUrl}`;
  @Getter('token') readonly token!: string;

  handleSuccess(resp: any) {
    if (resp.code !== 200) {
      this.$Message.error(resp.msg);
      return;
    }
    // 触发emit
    this.handleSuccessResp(resp);
  }

  @Emit('on-success')
  handleSuccessResp(resp: any) {
    return resp;
  }

  handleRemove(cb: any) {
    cb && cb();
  }
  handleErrorFile() {
    this.$Message.error('图片格式不正确!');
  }
  handleMaxSize() {
    this.$Message.warning('图片大小超出限制!');
  }
}
</script>

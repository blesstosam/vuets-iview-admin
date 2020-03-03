<style lang="stylus" scoped>
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}

.upload-finish:hover .demo-upload-list-cover {
  display: block;
}

.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}

.upload-img {
  width: 100%;
  vertical-align: top;
}
</style>
<template>
  <div>
    <Upload
      ref="upload"
      :show-upload-list="false"
      :on-success="handleSuccess"
      :default-file-list="defaultFileList"
      :format="['jpg', 'jpeg', 'png']"
      :max-size="1024"
      :headers="{ token, orgCode }"
      :on-format-error="handleErrorFile"
      :on-progress="handleProgress"
      :on-exceeded-size="handleMaxSize"
      :before-upload="handleBeforeUpload"
      type="drag"
      :action="uploadFilePath"
      style="display: inline-block;width:58px"
    >
      <div style="width: 58px;height:58px;line-height: 58px;">
        <Progress v-if="showProgress" :percent="percentage" hide-info></Progress>
        <Icon v-else-if="!currentFileSrc" type="ios-camera" size="20"></Icon>
        <div v-else class="upload-finish">
          <img class="upload-img" :src="currentFileSrc" />
          <div class="demo-upload-list-cover">
            <Icon type="ios-eye-outline" @click.stop="handleView"></Icon>
            <Icon type="ios-trash-outline" @click.stop="handleRemove"></Icon>
          </div>
        </div>
      </div>
    </Upload>
    <Modal title="图片查看" v-model="showModal">
      <img :src="currentFileSrc" v-if="showModal" style="width: 100%" />
    </Modal>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Emit, Ref, Prop, Watch } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { Upload } from 'view-design';
import { baseUrl } from '@/api/server';
// import { OSS_UPLOAD } from '@/api/system-management/uri';
const OSS_UPLOAD = '';
interface DefaultFile {
  name: string;
  url: string;
}
@Component
export default class UploadIcon extends Vue {
  @Prop({
    default() {
      return [];
    }
  })
  readonly defaultFileList!: DefaultFile[];
  @Ref('upload') readonly uploadComponent!: Upload;
  @Getter('token') readonly token!: string;
  @Getter('orgCode') readonly orgCode!: string;
  /**
   * @description: 模态框显示
   */
  showModal: boolean = false;
  uploadFilePath: string = `${baseUrl}${OSS_UPLOAD}`;
  /**
   * @description: 当前文件路径
   */
  currentFileSrc: string = '';
  /**
   * @description: 进度条展示
   */
  showProgress: boolean = false;
  /**
   * @description: 进度比例
   */
  percentage: number = 0;

  @Watch('defaultFileList', { deep: true })
  onDefaultFileListChange(val: DefaultFile[]) {
    if (val[0]) {
      this.currentFileSrc = val[0].url;
    } else {
      this.currentFileSrc = '';
    }
  }
  mounted() {
    if (this.defaultFileList[0]) {
      this.currentFileSrc = this.defaultFileList[0].url;
    }
  }
  handleView() {
    this.showModal = true;
  }
  handleBeforeUpload() {
    this.showProgress = true;
  }
  handleProgress(event: ProgressEvent, file: any) {
    this.percentage = file.percentage;
  }
  handleRemove() {
    this.currentFileSrc = '';
    (this.uploadComponent as any).fileList.splice(0, 1);
    this.handleSuccessResp();
  }
  handleSuccess(resp: any) {
    this.showProgress = false;
    if (resp.code !== 200) {
      this.$Message.error(resp.msg);
      return;
    }
    this.currentFileSrc = resp.link;
    // 触发emit
    this.handleSuccessResp();
  }

  @Emit('on-success')
  handleSuccessResp() {
    return this.currentFileSrc;
  }
  handleErrorFile() {
    this.$Message.error('文件格式不对');
  }
  handleMaxSize() {
    this.$Message.warning('文件大小超出限制');
  }
}
</script>

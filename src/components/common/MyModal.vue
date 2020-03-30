<template>
  <div>
    <Modal v-model="isShow" v-on="$listeners" v-bind="$attrs">
      <div slot="footer">
        <Button @click="isShow = false">关闭</Button>
      </div>
    </Modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';

@Component
export default class MyModal extends Vue {
  // 父组件传递的值 用于初始化 isShow
  @Prop({ default: false }) isModalShow!: boolean;

  // 用于绑定v-model
  get isShow() {
    return this.isModalShow;
  }
  set isShow(val) {
    this.handleEmit(val);
  }
  @Emit('update:isModalShow')
  handleEmit(val: boolean) {
    return val;
  }

  @Watch('isShow')
  handleShowModal(val: boolean) {
    if (!val) return;
    // 当显示modal组件的时候 do something
  }
}
</script>

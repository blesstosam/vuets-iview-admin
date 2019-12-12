<style lang="stylus">
.json-modal .vjs-tree.is-root {
  overflow: hidden
}
</style>
<template>
  <Modal v-model="show" width="600" class-name="json-modal">
    <p slot="header">详情</p>
    <json-viewer :value="jsonObj"></json-viewer>
    <div slot="footer">
      <Button @click="show = false" style="margin-right: 12px;">{{ $t('common.close') }}</Button>
      <CopyButton :content="jsonStr" />
    </div>
  </Modal>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import CopyButton from './CopyButton.vue';
//@ts-ignore
import JsonViewer from 'vue-json-viewer';

@Component({
  components: { CopyButton, JsonViewer }
})
export default class JsonViewModal extends Vue {
  show: boolean = false;
  @Prop({ default: {} }) readonly jsonObj!: object;
  @Prop({ default: '' }) readonly jsonStr!: string;

  showModal() {
    this.show = true;
  }
}
</script>

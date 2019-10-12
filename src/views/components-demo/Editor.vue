<style lang="stylus">
.ql-editor-wrap
  .ql-container
    min-height 400px
    border 0 !important
  & .ql-toolbar
    border-top 0 !important
    border-left 0 !important
    border-right 0 !important
</style>

<template>
  <div>
    <Card class="ql-editor-wrap" :bordered="false" dis-hover>
      <CommonCardTitle />
      <quill-editor
        style="min-height: 400px;"
        v-model="content"
        ref="myQuillEditor"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)"
        @change="onEditorChange($event)"
      >
      </quill-editor>
    </Card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CommonCardTitle from '@/components/CommonCardTitle.vue';

import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import { quillEditor } from 'vue-quill-editor';

@Component({
  components: { quillEditor, CommonCardTitle }
})
export default class Editor extends Vue {
  content: string = 'hello world!';
  editorOption: Object = {};
  mounted() {}
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  onEditorBlur(quill: any) {}
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  onEditorFocus(quill: any) {}
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  onEditorReady(quill: any) {}
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  onEditorChange({ quill, html, text }: { quill: any; html: string; text: string }) {
    this.content = html;
  }
}
</script>

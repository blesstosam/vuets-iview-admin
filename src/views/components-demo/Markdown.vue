<style lang="stylus"></style>

<template>
  <Card dis-hover :bordered="false">
    <CommonCardTitle />
    <Editor
      :value="editorText"
      :html="editorHtml"
      :options="options"
      previewStyle="vertical"
      :usageStatistics="false"
      :useCommandShortcut="true"
    />
  </Card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import 'tui-editor/dist/tui-editor.css';
import 'tui-editor/dist/tui-editor-contents.css';
import 'codemirror/lib/codemirror.css';
import { Editor } from '@toast-ui/vue-editor';
import CommonCardTitle from '@/components/CommonCardTitle.vue';

@Component({
  components: { Editor, CommonCardTitle }
})
export default class Markdown extends Vue {
  editorText: string = '';
  editorHtml: string = '';
  options: Object = {
    // hideModeSwitch: true,
    useCommandShortcut: true,
    useDefaultHTMLSanitizer: true,
    // minHeight: '200px',
    usageStatistics: false
  };
}
</script>

<template>
  <Button icon="md-copy" v-on="$listeners" class="copy-btn" :data-clipboard-text="content">
    {{ $t('common.copy') }}
  </Button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import ClipboardJS from 'clipboard';

@Component
export default class CopyButton extends Vue {
  mounted() {
    const clipboard = new ClipboardJS('.copy-btn');
    clipboard.on('success', (e: any) => {
      this.$Message.info('已复制');
      e.clearSelection();
    });
  }
  @Prop({ default: '' }) readonly content!: string;
}
</script>

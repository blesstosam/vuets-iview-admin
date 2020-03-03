<template>
  <Button type="success" icon="md-download" v-on="$listeners">
    {{ $t('common.export') }}
  </Button>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ExportButton extends Vue {}
</script>

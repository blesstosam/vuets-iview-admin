<template>
  <Button type="info" icon="md-add" v-on="$listeners">
    {{ $t('common.add') }}
  </Button>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class AddButton extends Vue {}
</script>

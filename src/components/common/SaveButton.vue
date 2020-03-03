<template>
  <Button type="primary" v-on="$listeners" v-bind="$attrs">
    {{ $t('common.save') }}
  </Button>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class SaveButton extends Vue {}
</script>

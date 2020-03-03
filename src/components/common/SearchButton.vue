<template>
  <Button type="primary" icon="ios-search" v-on="$listeners" v-bind="$attrs">
    {{ $t('common.search') }}
  </Button>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class SearchButton extends Vue {}
</script>

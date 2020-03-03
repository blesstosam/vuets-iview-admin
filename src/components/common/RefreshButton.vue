<template>
  <Button icon="md-refresh" v-on="$listeners" shape="circle" v-bind="$attrs"></Button>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class RefreshButton extends Vue {}
</script>

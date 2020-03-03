<template>
  <Button type="warning" :icon="hasIcon ? 'md-refresh' : ''" v-on="$listeners" v-bind="$attrs">
    {{ $t('common.reset') }}
  </Button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class ResetButton extends Vue {
  @Prop({ default: true }) readonly hasIcon!: boolean;
}
</script>

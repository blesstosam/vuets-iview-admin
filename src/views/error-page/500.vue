<template>
  <error-content code="500" :desc="$t('page500Desc')" :src="src" />
</template>

<script lang="ts">
import ErrorContent from './ErrorContent.vue';
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: { ErrorContent }
})
export default class Error500 extends Vue {
  src: string = require('@/assets/img/error-page/error-500.svg');
}
</script>

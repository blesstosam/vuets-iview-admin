<template>
  <error-content code="404" :desc="$t('page404Desc')" :src="src" />
</template>

<script lang="ts">
import ErrorContent from './ErrorContent.vue';
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: { ErrorContent }
})
export default class Error404 extends Vue {
  src: string = require('@/assets/img/error-page/error-404.svg');
}
</script>

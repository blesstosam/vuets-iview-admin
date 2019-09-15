<template>
  <error-content code="401" :desc="$t('page401Desc')" :src="src" />
</template>

<script lang="ts">
import ErrorContent from './ErrorContent.vue';
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: { ErrorContent }
})
export default class Error401 extends Vue {
  src: string = require('@/assets/img/error-page/error-401.svg');
}
</script>

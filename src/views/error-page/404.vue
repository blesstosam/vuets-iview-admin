<template>
  <error-content code="404" desc="Oh~~您的页面好像飞走了~" :src="src" />
</template>

<script lang="ts">
// import error404 from '@/assets/img/error-page/error-404.svg'
import ErrorContent from './ErrorContent.vue';
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: { ErrorContent }
})
export default class Error404 extends Vue {
  src: string = require('@/assets/img/error-page/error-404.svg');
}
</script>

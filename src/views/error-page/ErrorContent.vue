<template>
  <div class="error-page">
    <div class="content-con">
      <img :src="src" :alt="code" />
      <div class="text-con">
        <h4>{{ code }}</h4>
        <h5>{{ desc }}</h5>
      </div>
      <back-btn-group class="back-btn-group"></back-btn-group>
    </div>
  </div>
</template>

<script lang="ts">
import './error.less';
import BackBtnGroup from './BackBtnGroup.vue';
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  components: { BackBtnGroup }
})
export default class ErrorContent extends Vue {
  @Prop(String) readonly code!: string;
  @Prop(String) readonly desc!: string;
  @Prop(String) readonly src!: string;
}
</script>

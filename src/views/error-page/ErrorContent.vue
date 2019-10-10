<style lang="less">
.error-page {
  width: 100%;
  height: 100%;
  position: relative;
  background: #f8f8f9;
  .content-con {
    width: 700px;
    height: 500px;
    margin: 0 auto;
    img {
      display: block;
      width: 75%;
      height: 100%;
    }
    .text-con {
      position: absolute;
      left: 0px;
      top: 0px;
      h4 {
        position: absolute;
        left: 0px;
        top: 0px;
        font-size: 80px;
        font-weight: 700;
        color: #348eed;
      }
      h5 {
        position: absolute;
        width: 700px;
        left: 0px;
        top: 100px;
        font-size: 20px;
        font-weight: 700;
        color: #67647d;
      }
    }
    .back-btn-group {
      position: absolute;
      right: 0px;
      bottom: 20px;
    }
  }
}
</style>
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

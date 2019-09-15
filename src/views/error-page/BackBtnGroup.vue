<template>
  <div>
    <Button size="large" type="text" @click="backHome">{{ $t('backToHome') }}</Button>
    <Button size="large" type="text" @click="backPrev">{{ $t('backToPreviousPage') }}</Button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class BackBtnGroup extends Vue {
  $config: any;

  // mounted() {
  //   this.timer = setInterval(() => {
  //     if (this.second === 0) this.backPrev();
  //     else this.second--;
  //   }, 1000);
  // }

  // beforeDestroy() {
  //   clearInterval(this.timer);
  // }

  second: number = 100;
  timer: any = null;

  backHome() {
    this.$router.replace({
      name: this.$config.homeName
    });
  }
  backPrev() {
    this.$router.go(-1);
  }
}
</script>

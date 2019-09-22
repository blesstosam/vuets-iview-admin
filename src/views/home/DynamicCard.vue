<style lang="stylus">
.dynamic-card
  .ivu-card-body
    text-align center
  & .value
    font-size 38px
    font-weight 500
  & .tip
    margin-top 8px
</style>

<template>
  <Card dis-hover :bordered="false" class="dynamic-card">
    <p slot="title">{{ title }}</p>
    <div>{{ currentTime }}</div>
    <div class="value"><countTo :startVal="startVal" :endVal="endVal" :duration="2000" /></div>
    <div>{{ subTitle }}</div>
    <div class="tip">
      <Badge status="processing" />
      <span>{{ $t('updateTip', { second: timeToRefresh }) }} </span>
    </div>
  </Card>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
import dayjs from 'dayjs';
import countTo from 'vue-count-to';

const TIME_STEP = 5;

@Component({
  components: { countTo }
})
export default class DynamicCard extends Vue {
  timer!: number;
  timer2!: number;

  created() {
    this.currentTime = dayjs().format('HH:mm:ss');
    this.timer = window.setInterval(() => {
      this.currentTime = dayjs().format('HH:mm:ss');
    }, TIME_STEP * 1000);
    this.timer2 = window.setInterval(() => {
      if (this.timeToRefresh > 1) {
        this.timeToRefresh--;
      } else {
        this.timeToRefresh = 5;
        this.handleRefresh();
      }
    }, 1000);
  }
  destroyed() {
    this.timer && window.clearInterval(this.timer);
  }

  currentTime: string = '';
  timeToRefresh: number = TIME_STEP;

  @Prop({ required: true }) readonly title!: string;
  @Prop({ required: true }) readonly subTitle!: string;
  @Prop({ required: true }) readonly startVal!: number;
  @Prop({ required: true }) readonly endVal!: number;

  @Emit('update-data')
  handleRefresh() {
    return;
  }
}
</script>

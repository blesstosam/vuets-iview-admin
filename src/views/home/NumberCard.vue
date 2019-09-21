<style lang="stylus">
.number-card.ivu-card
  .ivu-card-body
    position relative
    div
      text-align center
      .icon-wrap
        background-color: rgb(230, 247, 255);
        display: inline-block;
        padding: 5px;
        border-radius: 30px
    & .ivu-tooltip
      position absolute
      right 10px
      top: 10px
    & .target-name
      color #808695
      font-size 13px
      margin-bottom 8px
  .value
    font-size 28px
    font-weight 700
    margin 8px 0
</style>

<template>
  <Card dis-hover :bordered="false" class="number-card">
    <Tooltip :content="explanation">
      <div class="question-icon"><Icon color="#ccc" custom="iconfont icon-icon-circle-question" /></div>
    </Tooltip>
    <div>
      <span class="icon-wrap">
        <Icon :type="icon" color="rgb(64, 169, 255)" size="20" />
      </span>
    </div>
    <div class="value">
      <countTo :startVal="startVal" :endVal="endVal" :duration="2000" />
      {{ subfix }}
    </div>
    <div class="target-name">{{ targetName }}</div>
    <div><slot></slot></div>
  </Card>
</template>

<script lang="ts">
import countTo from 'vue-count-to';
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  components: { countTo }
})
export default class NumberCard extends Vue {
  get tooLong() {
    return this.endVal.toString().length >= 8;
  }

  @Prop({ default: 0 }) readonly startVal!: number;
  @Prop({ default: 0 }) readonly endVal!: number;
  @Prop({ default: '' }) readonly targetName!: string;
  @Prop({ default: '' }) readonly subfix!: string;
  @Prop({ default: '' }) readonly explanation!: string;
  @Prop({ required: true }) readonly icon!: string;
}
</script>

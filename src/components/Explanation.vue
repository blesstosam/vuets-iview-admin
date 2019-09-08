<style lang="stylus">
.number-card
  .question-icon
    margin-left 5px
    margin-top 5px
    width 18px
  & .ivu-tooltip-rel
    position static
</style>

<template>
  <div :class="`explanation${index}`">
    <Tooltip :content="content" placement="bottom" max-width="100px">
      <img class="question-icon" src="../assets/img/wen.png" />
    </Tooltip>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class Explanation extends Vue {
  @Prop({ default: '' }) readonly content!: string;
  @Prop({ default: 0 }) readonly index!: number;
}
</script>

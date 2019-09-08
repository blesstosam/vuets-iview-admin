<style scoped>
.number-card {
  /* border: 2px solid #078f8b; */
  border-radius: 20px;
  height: 150px;
  padding: 0 15px 0 15px;
  color: white;
  margin: 25px auto 0px;
  width: 100%;
  transition: all 0.3s;
  min-width: 240px;
}
.number-card > div {
  height: 100%;
  border-radius: 10px;
  position: relative;
  bottom: 20px;
}
.card1 {
  background: #43bfb9;
}
.card2 {
  background: #fe797b;
}
.card3 {
  background: #cc66bb;
}
.card4 {
  background: #d9af5f;
}
.card5 {
  background: #3b9ccc;
}
.card1 .title-wrapper {
  color: #1c4c4a;
}
.card2 .title-wrapper {
  color: #4c2222;
}
.card3 .title-wrapper {
  color: #4c2546;
}
.card4 .title-wrapper {
  color: #4c341a;
}
.card5 .title-wrapper {
  color: #154c4a;
}
.title-wrapper {
  padding-top: 10px;
  padding-left: 30px;
  padding-right: 30px;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
}
.amount {
  font-size: 42px;
  padding-top: 10px;
  text-align: center;
  font-family: Noto Sans;
  font-weight: 600;
}
@media (min-width: 1440px) and (max-width: 1903px) {
  .amount {
    font-size: 38px;
  }
}
</style>

<template>
  <div class="number-card" :class="'number-card-' + (index + 1)">
    <div :class="'card' + (index + 1)">
      <Explanation :content="explanation" :index="index" />

      <div class="title-wrapper">
        <span>{{ title }} {{ subfix === 'RMB' ? '(元)' : `(${subfix})` }}</span>
      </div>
      <div class="amount">
        <span :style="{ fontSize: tooLong ? '35px' : 'inherit' }">
          {{ subfix === 'RMB' ? '¥' : '' }}<countTo :startVal="startVal" :endVal="endVal" :duration="2000"> </countTo>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import countTo from 'vue-count-to';
import Explanation from './Explanation.vue';
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  components: { countTo, Explanation }
})
export default class NumberCard extends Vue {
  get tooLong() {
    return this.endVal.toString().length >= 8;
  }

  @Prop({ default: 0 }) readonly startVal!: number;
  @Prop({ default: 0 }) readonly endVal!: number;
  @Prop({ default: '' }) readonly title!: string;
  @Prop({ default: '' }) readonly subfix!: string;
  @Prop({ default: 1 }) readonly cardIndex!: number;
  @Prop({ default: 0 }) readonly index!: number;
  @Prop({ default: '' }) readonly explanation!: string;
}
</script>

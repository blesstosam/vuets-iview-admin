<template>
  <div>
    <Row>
      <Col :xs="24" :sm="12" :md="6" v-for="(item, index) in totalData" :key="index">
        <NumberCard
          :startVal="item.startVal"
          :endVal="item.targetValue"
          :index="index"
          :cardIndex="(index % 4) + 1"
          :title="item.targetName"
          :subfix="item.targetCell"
          :explanation="item.explanation"
        />
      </Col>
    </Row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NumberCard from '@/components/NumberCard.vue';

@Component({
  components: { NumberCard }
})
export default class Home extends Vue {
  totalData: Array<any> = [
    { startVal: 0, targetValue: 100, targetName: '新增用户', targetCell: '人', explanation: '所有平台中新增用户' },
    { startVal: 0, targetValue: 2000, targetName: '总用户', targetCell: '元', explanation: '所有平台中总用户' },
    { startVal: 0, targetValue: 30000, targetName: '总消费额', targetCell: '元', explanation: '所有平台中总消费额' },
    { startVal: 0, targetValue: 400, targetName: '人均消费额', targetCell: '元', explanation: '所有平台中人均消费额' }
  ];
}
</script>

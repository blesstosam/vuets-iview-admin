<template>
  <div>
    <Row>
      <Col :xs="24" :sm="12" :md="6" v-for="(item, index) in totalData" :key="index">
        <NumberCard
          :endVal="item.targetValue"
          :subfix="item.targetCell"
          :targetName="item.targetName"
          :explanation="item.explanation"
          :icon="item.icon"
        >
          <div v-if="item.growth" style="color: #19be6b; font-weight: 500">
            <Icon type="ios-arrow-up" />
            <span style="vertical-align: middle; margin-left: 2px;">{{ item.growth }}%</span>
          </div>
          <div v-else style="color: #ed4014; font-weight: 500">
            <Icon type="ios-arrow-down" />
            <span style="vertical-align: middle; margin-left: 2px;">{{ item.reduce }}%</span>
          </div>
        </NumberCard>
      </Col>

      <Col :sm="24" :md="16" style="margin-top: 20px">
        <MyChart :chartTypes="chartType" :chartData="chartData" @change-chart-type="changeChartType" />
      </Col>
    </Row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NumberCard from './NumberCard.vue';
import MyChart from './MyChart.vue';
import { getChartDataByWeek } from '@/api/home/index';

@Component({
  components: { NumberCard, MyChart }
})
export default class Home extends Vue {
  async created() {
    this.reqChartData();
  }

  totalData: Array<any> = [
    {
      startVal: 0,
      targetValue: 320,
      targetName: '新增用户',
      targetCell: '人',
      explanation: '所有平台中新增用户',
      icon: 'ios-people',
      growth: 110
    },
    {
      startVal: 0,
      targetValue: 2020,
      targetName: '总用户',
      targetCell: '人',
      explanation: '所有平台中总用户',
      icon: 'ios-people',
      growth: 20
    },
    {
      startVal: 0,
      targetValue: 310000,
      targetName: '总消费额',
      targetCell: '元',
      explanation: '所有平台中总消费额',
      icon: 'logo-bitcoin',
      reduce: 20
    },
    {
      startVal: 0,
      targetValue: 6060,
      targetName: '人均消费额',
      targetCell: '元',
      explanation: '所有平台中人均消费额',
      icon: 'logo-bitcoin',
      growth: 10
    }
  ];

  chartType = {
    id: '1',
    targetName: '盈利统计',
    chartStyle: 'line',
    chartName: 'income',
    unit: '(元)',
    respStatus: 'noData'
  };

  chartData = {
    columns: ['日期', '上周盈利统计', '本周盈利统计'],
    rows: []
  };

  changeChartType(chartStyle: string, chartName: string) {
    this.chartType.chartStyle = chartStyle;
    this.chartType.chartName = chartName;
  }

  async reqChartData() {
    const resp = await getChartDataByWeek({ target: this.chartType.chartName });
    if (resp.code !== 200) {
      this.chartType.respStatus = 'netWorkError';
      return;
    }
    if (resp.data && resp.data.rows.length) {
      this.chartType.respStatus = 'hasData';
      this.chartData = resp.data;
    }
  }
}
</script>

<template>
  <div>
    <Row>
      <Col :xs="24" :sm="12" :md="6" v-for="(item, index) in cardData" :key="index">
        <NumberCard
          :endVal="item.targetValue"
          :subfix="item.targetCell"
          :targetName="item.targetName"
          :explanation="item.explanation"
          :icon="item.icon"
          :style="{ 'margin-right': index !== 3 ? '12px' : 0 }"
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
    </Row>

    <Row style="margin-top: 20px">
      <Col :sm="24" :md="16" style="padding-right: 12px;">
        <MyChart
          :loading="chartLoading"
          :chartTypes="chartType"
          :chartData="chartData"
          @change-chart-type="changeChartType"
        />
      </Col>
      <Col :sm="24" :md="8">
        <DynamicCard
          style="height: 240px;"
          :startVal="onlineUserNumberOld"
          :endVal="onlineUserNumber"
          title="当前在线"
          subTitle="在线登录人数"
          @update-data="handleUpdateData"
        />
        <Card style="height: 228px; margin-top: 12px;" dis-hover :bordered="false" class="my-chart-wrap">
          <p slot="title">当前活跃度</p>
          <div style="display: flex; justify-content: space-around;">
            <div style="margin-top: 20px;">
              <i-circle :percent="88" stroke-color="#5cb85c" :size="110">
                <i-circle :percent="66" stroke-color="#ff5500" :size="80"> </i-circle>
              </i-circle>
            </div>
            <div style="font-size: 13px; padding-top: 50px;">
              <div><Badge status="success" />活跃度：88%</div>
              <div><Badge status="error" />留存率：66%</div>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NumberCard from './NumberCard.vue';
import MyChart from './MyChart.vue';
import { getChartDataByWeek, getOnlineUser, getOverviewData } from '@/api/home/index';
import DynamicCard from './DynamicCard.vue';

@Component({
  components: { NumberCard, MyChart, DynamicCard }
})
export default class Home extends Vue {
  async created() {
    this.reqChartData();
    this.reqOverview();
  }

  cardData: Array<any> = [];

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
  chartLoading: boolean = false;

  onlineUserNumber: number = 0;
  onlineUserNumberOld: number = 0;

  changeChartType(chartStyle: string, chartName: string) {
    this.chartType.chartStyle = chartStyle;
    this.chartType.chartName = chartName;
  }

  async reqOverview() {
    const resp = await getOverviewData();
    if (resp.code !== 200) {
      return;
    }
    this.cardData = resp.data;
  }

  async reqChartData() {
    this.chartLoading = true;
    const resp = await getChartDataByWeek({ target: this.chartType.chartName });
    this.chartLoading = false;
    if (resp.code !== 200) {
      this.chartType.respStatus = 'netWorkError';
      return;
    }
    if (resp.data && resp.data.rows.length) {
      this.chartType.respStatus = 'hasData';
      this.chartData = resp.data;
    }
  }

  async handleUpdateData() {
    const resp = await getOnlineUser();
    if (resp.code !== 200) {
      return;
    }
    this.onlineUserNumberOld = this.onlineUserNumber;
    this.onlineUserNumber = resp.data;
  }
}
</script>

<style lang="stylus">
.my-chart-wrap
  .ivu-card-body
    position relative
  .icon-style
    position: absolute;
    right: 27px;
    top: 18px;
    z-index: 10;
    height: 60px;

    img:nth-child(1)
      margin-right: 8px
  & .no-data-chart
    text-align center
    margin-top 30px
</style>
<template>
  <Card style="width: 100%; height: 480px;" dis-hover :bordered="false" class="my-chart-wrap">
    <p slot="title">{{ chartTypes.targetName }}</p>
    <div v-if="chartData.rows.length > 0">
      <span v-if="chartTypes.chartStyle === 'line'" class="icon-style">
        <img @click="changeChart('line', chartTypes.chartName)" src="@/assets/img/line_active.png" alt />
        <img @click="changeChart('histogram', chartTypes.chartName)" src="@/assets/img/tiao.png" alt />
      </span>

      <span v-else class="icon-style">
        <img @click="changeChart('line', chartTypes.chartName)" src="@/assets/img/line.png" alt />
        <img @click="changeChart('histogram', chartTypes.chartName)" src="@/assets/img/tiao_active.png" alt />
      </span>

      <ve-line
        v-if="chartTypes.chartStyle === 'line'"
        :data="chartData"
        :yAxis="getyAxis(chartTypes.unit)"
        :dataZoom="dataZoom"
        :extend="extend"
        ref="chartLine"
      />

      <ve-histogram
        v-else
        :data="chartData"
        :yAxis="getyAxis(chartTypes.unit)"
        :dataZoom="dataZoom"
        :extend="extendBar"
        ref="chartHistogram"
      />
    </div>

    <div v-else class="no-data-chart">
      <StatusResp
        :isNoData="chartTypes.respStatus === 'noData'"
        @click="chartTypes.isNoDataOrInt ? '' : handleReqData"
      />
    </div>
    <Spin size="large" fix v-if="loading" />
  </Card>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator';
import StatusResp from '@/components/RespStatus.vue';
import { Getter } from 'vuex-class';

interface ChartType {
  id: string;
  targetName: string; // 盈利统计
  chartStyle: 'line' | 'histogram'; // 1代表是折线图  2代表是条形图
  chartName: string;
  unit: string; // 单位：(元)
  respStatus: 'hasData' | 'noData' | 'networkError'; // nodata: 暂无数据 | networkerror: 网络异常
}

@Component({
  components: {
    StatusResp
  }
})
export default class MyChart extends Vue {
  @Getter('isSidebarOpened') isSidebarOpened!: boolean;

  @Prop({ required: true }) readonly chartTypes!: ChartType;
  @Prop({ default: [], required: true }) readonly chartData!: any;
  @Prop({ default: false }) readonly loading!: boolean;

  @Emit('req-data')
  handleReqData() {
    return;
  }

  @Emit('change-chart-type')
  changeChart() {
    return;
  }

  @Watch('isSidebarOpened')
  toggleSideBar() {
    setTimeout(() => {
      if (this.chartTypes.chartStyle === 'line') {
        (this.$refs.chartLine as any).echarts.resize();
      } else {
        (this.$refs.chartHistogram as any).echarts.resize();
      }
    }, 200);
  }

  getyAxis(name: string) {
    let yAxis = {
      // 单位样式
      name,
      nameGap: 30,
      nameTextStyle: {
        padding: [0, 30, -10, 0],
        fontWeight: 'bold',
        fontSize: 14
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#999999'
        }
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: '#999999' //坐标轴字体颜色??
        }
      },
      axisTick: {
        show: false //坐标轴刻度  不显示
      }
    };
    return yAxis;
  }

  dataZoom: Array<object> = [
    // {
    //   type: 'inside'
    // start: 0,
    // end: 7 //初始化滚动条
    // },
    {
      type: 'slider',
      show: true,
      showDataShadow: true,
      backgroundColor: 'rgba(47,69,84,0)', //组件的背景颜色
      dataBackground: {
        lineStyle: { color: '#00fff0' }, //阴影的线条样式
        areaStyle: { color: 'rgba(128, 128, 128, 0.6)', opacity: 0.6 } //阴影的填充样式
      },
      fillerColor: 'rgba(238,238,238,0.4)', //选中范围的填充颜色
      xAxisIndex: [0],
      left: '5%',
      right: '5%',
      bottom: 5,

      textStyle: {
        color: '#ccc'
      }
    }
  ];

  extend: object = {
    legend: {
      type: 'scroll',
      pageIconColor: '#F5F5F5'
      // x: 'center',
      // y: '20px'
      // textStyle: {
      //   color: ['#36bbb5', '#fd7270', '#fcb609', '#f6b37f', '#4d96f0', '#e4007f']
      // }
    },
    series: {
      type: 'line',
      smooth: true, //曲线平滑
      radius: ['50%', '80%'],
      roseType: 'area',
      symbolSize: 8, //折线放大
      showSymbol: true
    },
    color: ['#57C5E6', '#36DBCE', '#fcb609', '#f6b37f', '#4d96f0', '#e4007f'], //调色盘颜色
    yAxis: {
      // splitNumber:8,
      nameGap: 30,
      nameTextStyle: {
        padding: [10, 30, -10, 0],
        fontWeight: 'bold',
        fontSize: 14
      },
      splitLine: {
        // 分割线
        show: true,
        lineStyle: {
          color: '#e7e7e7'
        }
      },
      axisLine: {
        lineStyle: {
          color: '#000' //坐标轴字体颜色
        }
      }
    }
  };

  extendBar: object = {
    series: {
      type: 'bar',
      barMinHeight: 2
    }
  };
}
</script>

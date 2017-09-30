<template>
  <div class="echarts">
    <IEcharts :option="bar" :loading="loading"></IEcharts>
  </div>
</template>
<script type="text/babel">
  import IEcharts from 'vue-echarts-v3/src/full.vue';
  import http from '../../../assets/js/http.js';

  export default {
    name: 'view',
    components: {
      IEcharts,
    },
    props: {},
    data: () => ({
      loading: false,
      bar: {
        color: ["#13CE66", "#F7BA2A", "#FF4949"],
        tooltip: {
          trigger: 'axis',
          formatter: '{b} <br/>{a}:{c}个',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
//          left: '20%',
//          right: '25%',
          containLabel: true
        },
        title: {
          text: '关键词统计',
          left: "7%",
          top: 10
        },
        xAxis: [
          {
            formatter: '{b}<br/>{a}:{c}',
            type: 'category',
            data: [],
            axisLabel: {
              interval: 0,
              rotate: -20,
              formatter: function (value) {
                return value + "类关键词";
              }
            },
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            color: ["#13CE66", "#F7BA2A", "#FF4949"],
            name: '共',
            type: 'bar',
            barWidth: '17%',
            data: [],
          }
        ]
      },

    }),
    created() {
      this.keyword();
    },
    methods: {

      queryData() {
        this.keyword();
      },
      keyword() {
        const that = this;
        this.apiGet('keyword/KeywordCount').then((data) => {
          this.handelResponse(data, (data, msg) => {
            that.bar.series[0].data = data.count;
            that.bar.xAxis[0].data = data.name;
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        },)
      },

    },
    mixins: [http]

  };
</script>


<style scoped>
  .echarts {
    width: 30.5%;
    height: 400px;
    padding-right: 10px;
    display: block;
    margin: 20px;
    margin-left: 15px;
    margin-right: 25px;
    margin-top: 0px;

  }
</style>

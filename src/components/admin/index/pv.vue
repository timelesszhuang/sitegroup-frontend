<template>
  <div class="echarts">
    <IEcharts :option="bar" :loading="loading" @ready="onReady" @click="onClick"></IEcharts>
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
        color: ["#20a0ff", "#13CE66", "#F7BA2A", "#FF4949", "#61a0a8", "#BBFFFF", "#FF1493", "#FF34B3", "#FF00FF", '#FFDAB9'],
        title: {
          text: '浏览量统计',
          left: "7%",
          top:10
        },
        tooltip: {
          formatter: '{b} <br/>{a}:{c}次',
          trigger: 'axis'
        },
        legend: {
          bottom: 'bottom',
          data: []
        },
        grid: {
          right: '15%',
          bottom: '20%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [],
          axisLabel: {
            interval: 0,
            rotate: -25,
          },
          axisLine: {show: false},
          splitNumber: 100,
          splitLine: {
            show: true,
          },
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '浏览量',
            type: 'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          },
        ]
      },

    }),
    created() {
      this.doRandom();
    },
    methods: {
      queryData() {
        this.doRandom();
      },
      doRandom() {
        const that = this;
        this.apiGet('count/show').then((data) => {
          this.handelResponse(data, (data, msg) => {
            that.bar.legend.data = data.type;
            that.bar.xAxis.data = data.time;
            that.bar.series = data.type;

          }, (data, msg) => {
            this.$Message.error(msg);
          })
        },)

//        that.loading = !that.loading;
      },
      onReady(instance) {
      },
      onClick(event, instance, echarts) {
      }
    },
    mixins: [http]

  };
</script>



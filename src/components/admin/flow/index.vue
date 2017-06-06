<template>
  <div class="echarts">
    <IEcharts :option="bar" :loading="loading" @ready="onReady" @click="onClick"></IEcharts>
    <button @click="doRandom">Random</button>
  </div>
</template>

<script type="text/babel">
  import IEcharts from 'vue-echarts-v3/src/full.vue';
  import http from '../../../assets/js/http.js';
  export default {
    name: 'view',
    components: {
      IEcharts
    },
    props: {
    },
    data: () => ({
      loading: false,
      bar: {
        title: {
          text: 'ECharts Hello World'
        },
        tooltip: {},
        series: [{
          name: 'Sales',
          type: 'pie',
          data: [
//            {value:335, name:'直接访问'},
//            {value:310, name:'邮件营销'},
          ]
        }]
      }
    }),
    methods: {
      doRandom() {
        const that = this;
        let data = [];
        this.apiGet('count').then((data) => {
          this.handelResponse(data, (data, msg) => {
            that.bar.series[0].data = [
            {value:335, name:'直接访问'},
            {value:310, name:'邮件营销'},
            ];
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        },)
//        that.loading = !that.loading;
      },
      onReady(instance) {
        console.log(instance);
      },
      onClick(event, instance, echarts) {
        console.log(arguments);
      }
    },
    mixins: [http]

  };
</script>

<style scoped>
  .echarts {
    width: 800px;
    height: 400px;
  }
</style>

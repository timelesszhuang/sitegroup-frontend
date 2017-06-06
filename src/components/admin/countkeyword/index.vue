<template>
  <div class="echarts">
    <div style="margin-left: 35%;padding-top:1%;padding-bottom:2%">
      <Row>
        <Col span="12">
        <Date-picker type="daterange" v-model="time" placement="bottom-end" placeholder="选择日期查询" ></Date-picker>
        </Col>
        &nbsp;<Button type="primary" @click="queryData">查询</Button>
      </Row>

    </div>
    <IEcharts :option="bar" :loading="loading" @ready="onReady" @click="onClick"></IEcharts>
    <!--<button @click="doRandom">Random</button>-->
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
        color:["#20a0ff","#13CE66","#F7BA2A","#FF4949","#61a0a8","#BBFFFF","#FF1493","#FF34B3","#FF00FF",'#FFDAB9'],
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },

        series: [{
          name:'搜索关键词',
          type:'pie',
          radius: ['40%', '55%'],
          label: {
            emphasis: {
              show: false,
              textStyle: {
                fontSize: '12',
                fontWeight: 'bold'
              }
            }
          },
          data: [

          ]
        }]
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
        let data = {
          params: {
            time:this.time
          }}
        this.apiGet('countkeyword',data).then((data) => {
          this.handelResponse(data, (data, msg) => {
            that.bar.series[0].data = data;
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
    width: 900px;
    margin: 0 auto;
    height: 500px;
  }
</style>

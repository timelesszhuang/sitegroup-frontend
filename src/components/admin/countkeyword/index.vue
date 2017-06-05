<template>
  <div>
    <div style="margin-left: 35%;padding-top:1%;padding-bottom: 5%">
      <Row>
        <Col span="6">
        <Date-picker type="daterange" v-model="time" placement="bottom-end" placeholder="选择日期查询" ></Date-picker>
        </Col>
        &nbsp;
        <Button type="primary" @click="queryData">查询</Button>
      </Row>
    </div>
    <vue-highcharts :options="options" :data="data" ref="lineCharts"></vue-highcharts>
  </div>
</template>
<script>
  import VueHighcharts from 'vue2-highcharts';
  import http from '../../../assets/js/http.js';
  export default{
    components: {
      VueHighcharts
    },
    created () {
      this.getData();
    },
    data(){
      return{
        legend: {
          enabled: false
        },
        time:"",
        data:[],
        options: {
          chart: {
            type: 'pie'
          },
          title: {
            text: '搜索关键词占比'
          },
          subtitle: {
            text: ''
          },
          tooltip: {
            crosshairs: true,
            shared: true,
            headerFormat: '{series.name}<br>',
            pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
          },
          credits: {
            enabled: false
          },
          plotOptions: {
            spline: {
              marker: {
                radius: 4,
                lineColor: '#666666',
                lineWidth: 1
              }
            }
          },
          series: []

        }
      }
    },
    methods:{
      getData() {
        let data = {
          params: {
            time: this.time
          }

        }
//        console.log(this.time)
        this.apiGet('countkeyword',data).then((data) => {
          this.handelResponse(data, (data, msg) => {
            this.load(data)
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        },)
      },
      queryData(){
        this.getData();
      },
      load(data){
        let lineCharts = this.$refs.lineCharts;
        lineCharts.delegateMethod('showLoading', 'Loading...');
        setTimeout(() => {
          lineCharts.addSeries({"name":"关键词",data:data});
          lineCharts.hideLoading();
        }, 1000)
      }
    },
    mixins: [http]
  }
</script>

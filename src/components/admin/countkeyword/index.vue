<template>
  <div class="echarts">
    <div style="margin-left: 35%;padding-top:1%;padding-bottom:2%">
      <Row>
        <Col span="12">
        <Date-picker type="daterange" v-model="time" placement="bottom-end" placeholder="选择日期查询" ></Date-picker>
        </Col>
        &nbsp;<Button type="primary" @click="queryData">查询</Button>
      </Row>
      <Select v-model="site_id" style="width: 200px;" label-in-value filterable clearable>
        <Option v-for="item in site" :value="item.id" :label="item.text" :key="item">
          {{ item.text }}
        </Option>
      </Select>
    </div>
    <IEcharts :option="bar" :loading="loading" @ready="onReady" @click="onClick"></IEcharts>
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
      site:[],
      site_id:"",
      loading: false,
      bar: {
        color:["#20a0ff","#13CE66","#F7BA2A","#FF4949","#61a0a8"],
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
      this.getSite((data) => {
        this.site = data
      });
    },
    methods: {
      getSite(){
        this.apiGet('Site/getSites').then((res) => {
          this.handelResponse(res, (data, msg) => {
            this.site = data
//            console.log(this.site)
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (res) => {
          //处理错误信息
          this.$Message.error('网络异常，请稍后重试。');
        })
      },
      queryData() {
        this.doRandom();
      },
      doRandom() {
        const that = this;
        let data = {
          params: {
            time:this.time,
            site_id:this.site_id,
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

<template>
  <div  style="background-color:#f5f7f9;margin-top:-30px;margin:-20px" >
    <div>
        <Row  style="background-color: white;margin: 20px;margin-top: 15px;margin-bottom: 15px":gutter="10" type="flex" justify="center"  class="code-row-bg">
          <Col span="4" >
          <div style="height: 130px;padding: 15px">
            <div style="padding-bottom: 10px">
            <Icon style="font-size: 30px;" type="podium"></Icon>
             <span style="display: inline-block;margin-left:15px;font-size: 25px;color: #FF0000;">{{pv}}</span>
            </div>
            <div style="font-size: 15px;">今日浏览量（pv)</div>
            <div style="margin-top: 10px;width:120px;border:3px solid rgba(255, 223, 37, 1);"></div>
          </div>
          </Col>
          <Col span="4">
          <div style="height: 130px;padding: 15px">
            <div style="padding-bottom: 10px">
              <Icon  style="font-size: 30px;"type="bug"></Icon>
              <span style="display: inline-block;margin-left:15px;font-size: 25px;color: #66FFFF;">{{useragent}}</span>
            </div>
            <div style="font-size: 15px;">今日爬取（spider）</div>
            <div style="margin-top: 10px;width:120px;border:3px solid  rgba(51, 204, 255, 1);"></div>
          </div>

          </Col>
          <Col span="4">
          <div style="height: 130px;padding: 15px">
            <div style="padding-bottom: 10px">
              <Icon style="font-size: 30px;" type="android-person-add"></Icon>
              <span style="display: inline-block;margin-left:15px;font-size: 25px;color: #003399;">{{article}}</span>
            </div>
            <div style="font-size: 15px;">今日添加文章数量</div>
            <div style="margin-top: 10px;width:120px;border:3px solid   rgba(51, 0, 204, 1);"></div>
          </div>
          </Col>

          <Col span="4">
          <div style="height: 130px;padding: 15px">
            <div style="padding-bottom: 10px">
              <Icon style="font-size: 30px;" type="ios-search-strong"></Icon>
              <span style="display: inline-block;margin-left:15px;font-size: 25px;color: #FF6600;">{{shuaidan}}</span>
            </div>
            <div style="font-size: 15px;">今日询盘数量</div>
            <div style="margin-top: 10px;width:120px;border:3px solid  rgba(255, 102, 102, 1);"></div>
          </div>
          </Col>

          <Col span="4">
          <div style="height: 130px;padding: 15px">
            <div style="padding-bottom: 10px">
              <Icon style="font-size: 30px;" type="ios-book"></Icon>
              <span style="display: inline-block;margin-left:15px;font-size: 25px;color: #199ED8;">{{shoulu}}</span>
            </div>
            <div style="font-size: 15px;">文章收录总量</div>
            <div style="margin-top: 10px;width:120px;border:3px solid   rgba(0, 0, 255, 1);"></div>
          </div>
          </Col>
        </Row>
      </div>
      <div style="width:100%;height: 315px;box-sizing: border-box" >
        <pv ref="pv"  style="height: 315px;background-color:white;display: inline-block" ></pv>
        <engine ref="engine" style="height: 315px;background-color:white;display: inline-block"></engine>
        <keyword ref="keyword" style="height: 315px;background-color:white;display: inline-block"></keyword>
      </div>
      <div >
        <Row :gutter="60" style="margin: 10px">
          <Col span="11"  style="background-color: white;margin:10px;height: 250px">
          <h2><Icon type="ios-calendar-outline"></Icon>&nbsp;&nbsp;营销模式</h2>
          <Carousel autoplay v-model="value2">
            <CarouselItem v-for="(item,index) in marketdata" :key="index">
              <div @click="show(index)" style="height: 200px;cursor:pointer"><img style="display:block;margin: 0 auto" :src=formatter_str(item.img) alt=""></div>
            </CarouselItem>
          </Carousel>
          </Col>

          <Col span="12"  style="background-color: white;margin:10px;height: 250px">
          <div style="padding: 30px">
            <div style="padding: 6px"><h1>乐销易技术服务中心</h1></div>
            <div style="padding: 6px"> <span style="font-size: 15px"><Icon type="paper-airplane"></Icon>&nbsp;&nbsp;北京易至信科技有限公司</span></div>

            <div style="padding: 6px"><span style="font-size: 15px"><Icon type="android-call"></Icon>&nbsp;&nbsp;0531-88554123</span></div>

            <div style="padding: 6px">  <span style="font-size: 15px"><Icon type="ios-telephone-outline"></Icon> &nbsp;&nbsp; 4006360163</span></div>

            <div style="padding: 6px"> <span style="font-size: 15px"> <Icon type="ios-email-outline"></Icon>&nbsp;&nbsp;  jishu@cio.club</span></div>
          </div>

          </Col>
        </Row>

      </div>
    <eventshow ref="show" :form="editinfo"></eventshow>
  </div>
</template>
<script type="text/babel">
  import http from '../../../assets/js/http.js';
  import sitetype from './sitecount.vue';
  import engine from './enginecount.vue';
  import pv from './pv.vue';
  import eventshow from '../marketingmodel/show.vue';
  import keyword from './keyword.vue';

  export default {
    data () {
      return {
        value2: 0,
        pv:0,
        article:0,
        shuaidan:0,
        useragent:0,
        marketdata:[],
        shoulu:0,
        editinfo:[]
 }
    },

    name: 'view',
    components: {
      sitetype,
      engine,
      pv,
      eventshow,
      keyword
    },
    created(){
     this.getpublictype();
     this.getFourMarket();
    },

    methods:{
      formatter_str(str) {
//      console.log("api.salesman.cc" + str);
        return "http://api.salesman.cc/" + str;
      },
      getpublictype(){
        this.apiGet('admin/countDatas').then((res) => {
          this.handelResponse(res, (data, msg) => {
            this.article = data.article;
            this.pv = data.pv;
            this.shuaidan = data.shuaidan;
            this.useragent = data.useragent;
            this.shoulu = data.shoulu
          }, (data, msg) => {

            this.$Message.error(msg);
          })
        }, (res) => {
          //处理错误信息
          this.$Message.error('网络异常，请稍后重试。');
        })
      },
      getFourMarket(){
        this.apiGet('admin/getFourMarket').then((res) => {
          this.handelResponse(res, (data, msg) => {
            this.marketdata = data
             console.log(data)
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (res) => {
          //处理错误信息
          this.$Message.error('网络异常，请稍后重试。');
        })
      },
      show(index) {
        let editid = this.marketdata[index].id
        this.apiGet('admin/Marketingmode/' + editid).then((res) => {
          this.handelResponse(res, (data, msg) => {
            this.editinfo = data
            this.modal = false;
            this.$refs.show.modal = true
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (res) => {
          //处理错误信息
          this.$Message.error('网络异常，请稍后重试。');
        })

      },
    },
    mixins: [http]
  };
</script>
<style scoped>

</style>

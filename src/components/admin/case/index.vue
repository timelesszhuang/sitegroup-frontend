<template>
  <div>
    <div class="top">
      案例中心:
      <Select v-model="industry_id" clearable label-in-value
              style="width:150px;text-align: left" placeholder="请选择行业分类">
        <Option v-for="item in industry" :value="item.id" :label="item.name" :key="item">
          {{ item.name }}
        </Option>
      </Select>
      <Input v-model="keyword" placeholder="案例关键词" style="width: 300px"></Input>
      <Input v-model="content" placeholder="全文检索" style="width: 300px"></Input>
      <Button type="primary" @click="queryData">查询</Button>
    </div>
    <div class="content" style="margin-top:10px;">
      <div style="width:90%;margin: 0px auto">
        <Row>
          <Col span="6" v-for="(item,index) in datas" :key="index">
          <div class="siteborder" style="cursor: pointer" @click="show(index)">
            <div class="sitewidth" :style=choose_bgimg(index)>
              <div class="siteclass">
                <p style="font-size:18px" :title=item.title>{{item.title}}</p>
                <p style="font-size: 15px" title="关键词">{{item.keyword}}</p>
              </div>
            </div>
            <div class="sitebottom">
              <Icon type="ios-navigate-outline"></Icon> <span style="font-size: 13px;display: inline-block;margin-right: 15px"> {{item.industry_name}}</span> <Icon type="ios-paperplane"></Icon><span  style="font-size: 13px">{{item.source}}</span>
            </div>
          </div>
          </Col>
        </Row>
      </div>
      <br>
    </div>
    <div class="content" style="margin-top:10px;">
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="total" :current="current" @on-change="changePage" @on-page-size-change="changePageSize"
                show-total
                show-elevator ></Page>
        </div>
      </div>
    </div>
    <caseshow ref="show" :form="editinfo"></caseshow>
  </div>
</template>
<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';
  import caseshow from './show.vue';
  export default {
    data () {
      return {
        self: this,
        border: true,
        stripe: true,
        showheader: true,
        showIndex: true,
        size: 'small',
        current: 1,
        total: 0,
        page: 1,
        rows: 8,
        title: '',
        datas: [],
        editinfo: {},
        industry:[],
        industry_id:'',
        keyword:'',
        content:''
      }
    },
    components: {caseshow},
    created () {
      this.getData();
      this.getIndustry();
    },
    methods: {
      choose_bgimg(index) {
        let background=this.$store.state.background.backgroundcolor;
        index = index % background.length
        return background[index]
      },
      getData() {
        let data = {
          params: {
            page: this.page,
            rows: this.rows,
            industry_id:this.industry_id,
            keyword:this.keyword,
            content:this.content
          }
        }
        this.apiGet('admin/CaseCenter/', data).then((data) => {
          this.handelResponse(data, (data, msg) => {
            this.datas = data.rows
            this.total = data.total;
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (data) => {
          this.$Message.error('网络异常，请稍后重试');
        })
      },
      getIndustry(){
        this.apiGet('admin/getIndustry').then((res) => {
          this.handelResponse(res, (data, msg) => {
            this.industry = data;
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (res) => {
          //处理错误信息
          this.$Message.error('网络异常，请稍后重试。');
        });
      },
      show(index){
        let editid = this.datas[index].id
        this.apiGet('admin/CaseCenter/' + editid).then((res) => {
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
      changePage(page){
        this.page = page;
        this.getData();
      },
      changePageSize(pagesize){
        this.rows = pagesize;
        this.getData();
      },
      queryData(){
        this.getData();
      },
    },
    computed: {

    },
    mixins: [http]
  }
</script>
<style>
  .siteborder {
    width: 100%;
    max-width: 281px;
    border: 2px solid #07d0d3;
    margin: 5px;
    padding: 3px;
  }

  .siteclass {
    text-align: center;
    width: 100%;
    color: #ffffff;
    font-size: 20px;
    font-weight: bold;
    padding-top: 60px
  }

  .siteclass a {
    color: #ffffff;
    font-size: 18px;
  }

  .sitebottom {
    padding: 5px;
    text-align: center;
  }

  .sitewidth {
    height: 203px;
  }
</style>

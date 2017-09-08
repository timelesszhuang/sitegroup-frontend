<template>
  <div>
    <div class="top">
      事件营销:
      <Input v-model="title" placeholder="营销标题" style="width:120px;"></Input>
      <Select v-model="industry_id" clearable label-in-value
              placeholder="要查询的行业" style="width:150px;text-align: left">
        <Option v-for="item in industry" :value="item.id" :label="item.name" :key="item">
          {{ item.name }}
        </Option>
      </Select>
      <Input v-model="keyword" placeholder="要查询的关键词" style="width: 120px"></Input>
      <Input v-model="content" placeholder="要查询营销模式内容" style="width: 300px"></Input>
      <Button type="primary" @click="queryData">查询</Button>
    </div>
    <div class="content" style="margin-top:10px;">
      <!--<Table :context="self" :border="border" :stripe="stripe" :show-header="showheader"-->
      <!--:size="size" :data="datas" :columns="tableColumns" style="width: 100%">-->
      <!--</Table>-->
      <Row class="pad">
        <div v-for="(item,index) in datas">
          <Col span="8" style="padding: 20px; ">
          <div style="width:100%;" @click="show(index)"><img class="imgsize"
                                                             style="margin:0 auto;padding-right:5px;display: block "
                                                             :src=formatter_str(item.img) target="_blank"></div>
          <div
            style="text-align:center;font-size:15px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;cursor:pointer "
            :title=item.title>{{item.title}}
          </div>
          <div
            style="text-align:center;font-size:15px;text-overflow:ellipsis;white-space:nowrap;cursor:pointer;height: auto "
          >
            <span style="color:red;font-size:10px"><i>关键词:</i></span>
            {{item.keyword}}&nbsp;
            <div>
              <span style="color:red;font-size: 10px"><i>行业分类:</i></span>
              {{item.industry_name}}&nbsp;
            <!--<span style="color:red;font-size: 10px"><i>阅读次数:</i>{{item.readcount}}&nbsp;</span>-->
            </div>
          </div>
          </Col>
        </div>
      </Row>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="total" :page-size="rows" :current="current" @on-change="changePage"
                @on-page-size-change="changePageSize"
                show-total
                show-elevator></Page>
        </div>
      </div>
    </div>
    <eventshow ref="show" :form="editinfo"></eventshow>
  </div>
</template>
<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';
  import eventshow from './show.vue';

  export default {
    data() {
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
        rows: 9,
        title: '',
        datas: [],
        editinfo: {},
        industry: [],
        industry_id: '',
        keyword: '',
        content: '',
        img: 1111,
      }
    },
    components: {eventshow},
    created() {
      this.getData();
      this.getIndustry();
    },
    methods: {
      formatter_str(str) {
        return ROOTHOST + str;
      },
      getData() {
        let data = {
          params: {
            page: this.page,
            rows: this.rows,
            title: this.title,
            industry_id: this.industry_id,
            keyword: this.keyword,
            content: this.content
          }
        }
        this.apiGet('admin/Marketingmode', data).then((data) => {
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
      getIndustry() {
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

      show(index) {
        let editid = this.datas[index].id
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
      changePage(page) {
        this.page = page;
        this.getData();
      },
      changePageSize(pagesize) {
        this.rows = pagesize;
        this.getData();
      },
      queryData() {
        this.getData();
      },
    },
    computed: {},
    mixins: [http]
  }
</script>
<style>
  .imgsize {
    cursor: pointer;
  }

  @media screen and (min-width: 1501px) {
    .imgsize {
      width: 230px;
      height: 350px;
    }

    .pad {
      padding-left: 220px;
      padding-right: 220px;
    }
  }

  /*1100分辨率（大于960px，小于1199px）*/
  @media screen and (min-width: 1200px) and (max-width: 1500px) {
    .imgsize {
      width: 200px;
      height: 300px;
      cursor: pointer
    }

    .pad {
      padding-left: 150px;
      padding-right: 150px;
    }
  }

  /*1100分辨率（大于960px，小于1199px）*/
  @media screen and (min-width: 960px) and (max-width: 1199px) {
    .imgsize {
      width: 220px;
      height: 300px;
      cursor: pointer
    }

    .pad {
      padding-left: 80px;
      padding-right: 80px;
    }
  }

  /*880分辨率（大于768px，小于959px）*/

  @media screen and (min-width: 768px) and (max-width: 959px) {
    .imgsize {
      width: 200px;
      height: 250px;
      cursor: pointer
    }

    .pad {
      padding-left: 30px;
      padding-right: 30px;
    }
  }

  /*720分辨率（大于480px，小于767px）*/

  @media only screen and (min-width: 480px) and (max-width: 767px) {

    .imgsize {
      width: 200px;
      height: 250px;
      cursor: pointer
    }

    .pad {
      padding-left: 40px;
      padding-right: 40px;
    }
  }

  /*440分辨率以下（小于479px）*/

  @media only screen and (max-width: 479px) {
    .imgsize {
      width: 200px;
      height: 250px;
      cursor: pointer
    }

    .pad {
      padding-left: 30px;
      padding-right: 30px;
    }
  }


</style>

<template>
  <div>
    <div class="top">
      标题:
      <Input v-model="title" placeholder="请输入文章标题" style="width:300px;"></Input>
      <Select v-model="keyword_type" style="width:200px">
        <Option-group  v-for="(item,index) in keywordtype" :label="index" :key="item">
          <Option v-for="items in item" :value="items.id" :key="items.value">{{ items.text }}</Option>
        </Option-group>
      </Select>
      <Button type="primary" @click="queryData">查询</Button>
    </div>
    <div class="content" style="margin-top:10px;">
      <Table :context="self" :border="border" :stripe="stripe" :show-header="showheader"
             :size="size" :data="datas" :columns="tableColumns" style="width: 100%">
      </Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page v-show="page_show" :total="total" :current="current" :page-size="pageSize" @on-change="changePage"
                @on-page-size-change="changePageSize"
                show-total
                show-elevator show-sizer></Page>
        </div>
      </div>
    </div>
    <wechatarticlesave ref="save" :form="editinfo" ></wechatarticlesave>
    <!--<articleshow ref="show" :form="editinfo"></articleshow>-->
  </div>

</template>

<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js'
  import common from '../../../assets/js/common.js'
  import wechatarticlesave from './save.vue'
//  import articleshow from './show.vue'

  export default {
    data () {
      return {
        page_show: true,
        self: this,
        border: true,
        stripe: true,
        current: 1,
        showheader: true,
        showIndex: true,
        size: 'small',
        total: 0,
        page: 1,
        rows: 10,
        pageSize: 10,
        title: '',
        article_type: 0,
        datas: [],
        editinfo: {},
        keyword_type:"",
        keywordtype:[],
        typeNameArr:[]
      }
    },
    components: {wechatarticlesave},
    created () {
      this.getData();
//      this.getArticleType((data) => {
//        this.articletypelist = data
//      });
      this.getKeyword((data) => {
        this.keywordtype = data
      });
    },
    methods: {
      getData() {
        let data = {
          params: {
            page: this.page,
            rows: this.rows,
            title: this.title,
            keyword_id: this.keyword_type
          }
        }
        this.apiGet('sys/wecatArticle', data).then((data) => {
          this.handelResponse(data, (data, msg) => {
            this.datas = data.rows
            this.total = data.total;
            this.pageSize = 10
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (data) => {
          this.$Message.error('网络异常，请稍后重试');
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
        this.page = 1
        this.page_show = false
        this.getData();
        this.page_show = true
      },
      edit(index){
        this.getArticle(index);
        this.$refs.save.modal = true
      },
      show(index){
        this.getArticle(index);
        this.$refs.show.modal = true
      },
      getArticle(index){
        let editid = this.datas[index].id
        this.apiGet('sys/wecatArticleOne/' + editid).then((res) => {
          this.handelResponse(res, (data, msg) => {
            this.editinfo = data
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (res) => {
          //处理错误信息
          this.$Message.error('网络异常，请稍后重试。');
        })
      },
      getKeyword(func) {
        this.apiGet('sys/weixinKeyList').then((res) => {
          this.handelResponse(res, (data, msg) => {
            func(data)
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (res) => {
          //处理错误信息
          this.$Message.error('网络异常，请稍后重试。');
        });
      },
      remove(index){
        //需要删除确认
        let id = this.datas[index].id
        let _this = this
        this.$Modal.confirm({
          title: '确认删除',
          content: '您确定删除该记录?',
          okText: '删除',
          cancelText: '取消',
          onOk: (index) => {
            _this.apiPost('sys/deleteWecatArticle/'+id, ).then((res) => {
              _this.handelResponse(res, (data, msg) => {
                _this.getData()
                _this.$Message.success(msg);
              }, (data, msg) => {
                _this.$Message.error(msg);
              })
            }, (res) => {
              //处理错误信息
              _this.$Message.error('网络异常，请稍后重试');
            })
          },
          onCancel: () => {
            return false
          }
        })
      },
    },
    computed: {
      tableColumns()
      {
        let columns = [];
        if (this.showCheckbox) {
          columns.push({
            type: 'selection',
            width: 60,
            align: 'center'
          })
        }
        if (this.showIndex) {
          columns.push({
            type: 'index',
            width: 60,
            align: 'center'
          })
        }
        columns.push({
          title: '标题',
          key: 'title',
          sortable: true
        });
        columns.push({
          title: '关键词',
          key: 'keyword',
          sortable: true
        });
        columns.push({
          title: '简介',
          width:'300px',
          key: 'summary',
          sortable: true
        });
        columns.push({
          title: '来源',
          key: 'source',
          sortable: true
        });
        columns.push({
          title: '添加时间',
          key: 'scrapytime',
          sortable: true
        });
//        columns.push({
//          title: '分类名称',
//          key: 'articletype_name',
//          sortable: true
//        });
//        columns.push({
//          title: '作者',
//          key: 'auther',
//          sortable: true
//        });
        columns.push(
          {
            title: '操作',
            key: 'action',
            align: 'center',
            fixed: 'right',
            render (row, column, index) {
              return `<i-button type="success" size="small" @click="edit(${index})">修改</i-button>
                      <i-button type="error" size="small" @click="remove(${index})">删除</i-button>&nbsp;`;
            }
          }
        );
        return columns;
      }
    },
    mixins: [http, common]
  }

</script>
<style>


</style>

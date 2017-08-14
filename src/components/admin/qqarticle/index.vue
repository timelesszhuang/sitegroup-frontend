<template>
  <div>
    <div class="top">
      标题:
      <Input v-model="title" placeholder="请输入文章标题" style="width:300px;"></Input>
      文章分类:
      <Select v-model="keyword_type" style="width: 200px;" label-in-value filterable clearable>
        <Option v-for="item in keywordtype" :value="item.id" :label="item.text" :key="item">
          {{ item.text }}
        </Option>
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
    <wechatarticlesave ref="save" :articletype="articletypelist" :form="editinfo" ></wechatarticlesave>
  </div>

</template>

<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js'
  import common from '../../../assets/js/common.js'
  import wechatarticlesave from './save.vue'
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
        keyword_type:0,
        datas: [],
        editinfo: {},
        articletypelist: [],
        keywordtype:[]
      }
    },
    components: {wechatarticlesave},
    created () {
      this.getData();
      this.getArticleType((data) => {
        this.articletypelist = data
      });
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
            type_id: this.keyword_type
          }
        }
        this.apiGet('qq/article', data).then((data) => {
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
      getKeyword(func) {
        this.apiGet('article/articleAllType').then((res) => {
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
      getArticle(index){
        let editid = this.datas[index].id
        this.apiGet('qq/getOneArticle/' + editid).then((res) => {
          this.handelResponse(res, (data, msg) => {
            this.editinfo = data
//            console.log(data.url)
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (res) => {
          //处理错误信息
          this.$Message.error('网络异常，请稍后重试。');
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
          title: '分类',
          key: 'type_name',
          sortable: true
        });
        columns.push({
          title: '来源',
          key: 'source',
          sortable: true
        });
        columns.push({
          title: '发布时间',
          key: 'create_time',
          sortable: true
        });
        columns.push(
          {
            title: '操作',
            key: 'action',
            align: 'center',
            fixed: 'right',
            render (row, column, index) {
              return `<i-button type="success" size="small" @click="edit(${index})">添加到文章库</i-button>`;
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

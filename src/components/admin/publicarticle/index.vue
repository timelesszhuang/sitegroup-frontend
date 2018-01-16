<template>
  <div>
    <div class="top">
      <Input v-model="title" @on-change="changeTitle" placeholder="标题查询" style="width:300px;"></Input>
      <Button type="primary" @click="queryData">查询</Button>
    </div>
    <div class="content" style="margin-top:10px;">
      <Table :context="self" :border="border" :stripe="stripe" :show-header="showheader"
             :size="size" :data="datas" :columns="tableColumns" style="width: 100%">
      </Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="total" :current="current" @on-change="changePage" @on-page-size-change="changePageSize"
                show-total
                show-elevator show-sizer></Page>
        </div>
      </div>
    </div>
    <!--<articleadd ref="add" :tagname="tagname"></articleadd>-->
    <!--<articlesave ref="save" :tagname="tagname" :form="editinfo"></articlesave>-->
    <publicarticlesave ref="save" :form="editinfo" :tagname="tagname" :articletype="articletypelist"></publicarticlesave>
  </div>
</template>

<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js'
  import common from '../../../assets/js/common.js'
  import publicarticlesave from '../article/save.vue'

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
        rows: 10,
        title: '',
        datas: [],
        editinfo: {
          title_color:""
        },
        articletypelist: [],
        tagname:[],
        tag_id:0,
      }
    },
    components: {publicarticlesave},
    created() {
      this.getData();
      this.getArticleType((data) => {
        this.articletypelist = data
      });
      this.gettag();
    },
    methods: {
      getData() {
        let data = {
          params: {
            page: this.page,
            rows: this.rows,
            title:this.title
          }
        }
        this.apiGet('library/article', data).then((data) => {
          this.handelResponse(data, (data, msg) => {
            this.datas = data.rows
            this.total = data.total;
            console.log(this.datas)
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (data) => {
          this.$Message.error('网络异常，请稍后重试');
        })
      },
      changeTitle(){
        this.page = 1
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
      edit(index) {
        this.getArticle(index);
        this.$refs.save.modal = true
      },
      gettag() {
        let data = {
          type: "article",
        }
        this.apiPost('admin/gettags', data).then((res) => {
          this.handelResponse(res, (data, msg) => {
            this.tagname = data
            this.modal = false;
          }, (data, msg) => {
            this.modal_loading = false;
            this.$Message.error(msg);
          })
        }, (res) => {
          //处理错误信息
          this.modal_loading = false;
          this.$Message.error('网络异常，请稍后重试。');
        })
      },
      getArticle(index) {
        let editid = this.datas[index].id
        this.apiGet('library/getOneArticle/' + editid).then((res) => {
          this.handelResponse(res, (data, msg) => {
            data.readcount = 0;
            data.is_collection = 20
            data.title_color = '';
            this.editinfo = data
            this.editinfo.thumbnails = data.thumbnail
            this.editinfo.url = data.preurl
            this.editinfo.summary = data.summary
            this.editinfo.come_from = data.comefrom
            this.editinfo.auther = data.author
            let tempNUmber = [];
            this.editinfo.tag_id = tempNUmber
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
      tableColumns() {
        let columns = [];
        let _this = this
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
          title: '缩略图',
          key: 'thumbnail',
          width:'180px',
          render(h, params) {
            if (params.row.thumbnail) {
              return h('img', {
                attrs: {
                  src: params.row.thumbnail,
                  title: params.row.title,
                  style: 'max-width:150px;'
                },
              })
            }
            return '';
          },
        });
        columns.push({
          title: '标题',
          key: 'title',
          width:"300px",
        });
        columns.push({
          title: '分类',
          key: 'type',
          render(h, params) {
            if (params.row.type) {
              let type = params.row.type;
              if(type == 'article'){
                return '文章'
              }
              if(type == 'quesrtion'){
                return '问答'
              }
              if(type == 'product'){
                return '产品'
              }
              if(type == 'other'){
                return '其他'
              }//类型 article 文章 quesrtion 问答 product 产品 other 其他
            }
            return '';
          },
        });
        columns.push({
          title: '来源',
          key: 'comefrom',
        });
        columns.push({
          title: '发布时间',
          key: 'addtime',
          sortable: true
        });
        columns.push(
          {
            title: '操作',
            key: 'action',
            align: 'center',
            fixed: 'right',
            render(h, params) {
              return h('div', [
                h('Button', {
                  props: {
                    size: 'small'
                  },
                  attrs: {
                    type: 'info'
                  },
                  on: {
                    click: function () {
                      //不知道为什么这个地方不是我需要的this
                      _this.edit(params.index)
                    }
                  }
                }, '转移至文章库')
              ]);
            }

          }
        );
        return columns;
      }
    },
    mixins: [http,common]
  }
</script>

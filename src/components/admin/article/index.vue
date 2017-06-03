<template>
  <div>
    <div class="top">
      标题:
      <Input v-model="title" placeholder="请输入文章标题" style="width:300px;"></Input>
      文章分类:
      <Select v-model="article_type" style="width: 200px;" label-in-value filterable clearable>
        <Option v-for="item in articletypelist" :value="item.id" :label="item.name" :key="item">
          {{ item.name }}
        </Option>
      </Select>
      <Button type="primary" @click="queryData">查询</Button>
      <Button type="success" @click="add">添加</Button>
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
    <articleadd ref="add" :articletype="articletypelist"></articleadd>
    <articlesave ref="save" :form="editinfo" :articletype="articletypelist"></articlesave>
    <articleshow ref="show" :form="editinfo"></articleshow>
  </div>

</template>

<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';
  import common from '../../../assets/js/common.js';
  import articleadd from './add.vue';
  import articlesave from './save.vue';
  import articleshow from './show.vue';

  export default {
    data () {
      return {
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
        title: '',
        article_type: 0,
        datas: [],
        editinfo: {},
        articletypelist: []
      }
    },
    components: {articleadd, articlesave, articleshow},
    created () {
      this.getData();
      this.getArticleType((data) => {
        this.articletypelist = data
      });
    },
    methods: {
      getData() {
        let data = {
          params: {
            page: this.page,
            rows: this.rows,
            title: this.title,
            article_type: this.article_type
          }
        }
        this.apiGet('article', data).then((data) => {
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
      add(){
        this.$refs.add.modal = true
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
        this.apiGet('article/' + editid).then((res) => {
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
            _this.apiDelete('article/', id).then((res) => {
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
      changeSync(index, is_sync){
        //需要删除确认
        let id = this.datas[index].id
        let _this = this
        let data = {
          'is_sync': is_sync,
          id:id
        }
        if(data.is_sync == 10){
          this.$Modal.confirm({
            title: '确认禁用',
            content: '您确定禁用该活动?',
            okText: '禁用',
            cancelText: '取消',
            onOk: (index) => {
              _this.apiPost('article/sync', data).then((res) => {
                _this.handelResponse(res, (data, msg) => {
                  _this.getData();
                  _this.$Message.success(msg);
                }, (data, msg) => {
                  _this.$Message.error(msg);
                })
              }, (res) => {
                //处理错误信息
                _this.$Message.error('网络异常，请稍后重试。');
              })
            },
            onCancel: () => {
              return false
            }
          })
        }else if(is_sync==20){
          this.$Modal.confirm({
            title: '确认启用',
            content: '您确定启用该活动?',
            okText: '启用',
            cancelText: '取消',
            onOk: (index) => {
              _this.apiPost('article/sync', data).then((res) => {
                _this.handelResponse(res, (data, msg) => {
                  _this.getData();
                  _this.$Message.success(msg);
                }, (data, msg) => {
                  _this.$Message.error(msg);
                })
              }, (res) => {
                //处理错误信息
                _this.$Message.error('网络异常，请稍后重试。');
              })
            },
            onCancel: () => {
              return false
            }
          })
        }


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
          title: '分类名称',
          key: 'articletype_name',
          sortable: true
        });
        columns.push({
          title: '作者',
          key: 'auther',
          sortable: true
        });
        columns.push(
          {
            title: '操作',
            key: 'action',
            align: 'center',
            fixed: 'right',
            render (row, column, index) {
                var btn='';
                if(row.site_id != '0') {
                  var btn = `<i-button type="primary" size="small" @click="changeSync(${index},'10')">同步</i-button>`;
                  if (row.is_sync == '10' ) {
                    //20 表示禁用 按钮应该为启用
                    btn = `<i-button type="error" size="small" title="不同步" @click="changeSync(${index},'20')">取消</i-button>`;
                  }
                }
              return `<i-button type="success" size="small" @click="edit(${index})">修改</i-button>
<i-button type="info" size="small" @click="show(${index})">预览</i-button>
                      <i-button type="error" size="small" @click="remove(${index})">删除</i-button>&nbsp;` + btn;
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

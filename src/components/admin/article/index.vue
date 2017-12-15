<template>
  <div>
    <div class="top">
      标题:
      <Input v-model="title" placeholder="请输入文章标题" style="width:300px;"></Input>
      文章分类:
      <Select v-model="article_type" style="width: 250px;" label-in-value filterable clearable>
        <Option disabled value="">
          分类名—标签
        </Option>
        <Option v-for="item in articletypelist" :value="item.id" :label="item.name" :key="item">
          <span>{{ item.text }}</span>
        </Option>
      </Select>
      <Button type="primary" @click="queryData">查询</Button>
      <Button type="success" @click="add">添加</Button>
      <Button type="error" @click="importadd">csv导入</Button>
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
                show-elevator show-sizer>
          </Page>
        </div>
      </div>
    </div>
    <articleadd ref="add" :articletype="articletypelist"></articleadd>
    <articlesave ref="save" :form="editinfo" :articletype="articletypelist"></articlesave>
    <articleshow ref="show" :form="editinfo"></articleshow>
    <articlecsv ref="csvimport" :articletype="articletypelist"></articlecsv>
    <showhtml ref="showhtml" :form="showhtmldata"></showhtml>
  </div>

</template>

<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js'
  import common from '../../../assets/js/common.js'
  import articleadd from './add.vue'
  import articlesave from './save.vue'
  import articleshow from './show.vue'
  import articlecsv from './csvimport.vue'
  import showhtml from './showhtml.vue'

  export default {
    data() {
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
        articletypelist: [],
        showhtmldata: []
      }
    },
    components: {articleadd, articlesave, articleshow, showhtml, articlecsv},
    created() {
      this.getData();
      this.getArticleType((data) => {
        this.articletypelist = data
      });
    },
    methods: {
      setArticleType(data) {
        this.articletypelist = data
      },
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
            this.pageSize = 10
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (data) => {
          this.$Message.error('网络异常，请稍后重试');
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
        this.page = 1
        this.page_show = false
        this.getData();
        this.page_show = true
      },
      add() {
        this.$refs.add.modal = true
      },
      importadd() {
        this.$refs.csvimport.modal = true
        this.$refs.csvimport.csvclose()
      },
      edit(index) {
        this.getArticle(index);
        this.$refs.save.modal = true
      },
      show(index) {
        this.getArticle(index);
        this.$refs.show.modal = true
      },
      getArticle(index) {
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
      error(nodesc) {
        this.$Notice.error({
          title: '预览模板页被浏览器拦截,请允许',
          desc: nodesc ? '' : ''
        });
      },
      remove(index) {
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
      showhtml(index) {
        let data = this.datas[index]
        this.apiPost('articleshowhtml', data).then((res) => {
          this.handelResponse(res, (data, msg) => {
            if (data.length == 1) {
              let open = window.open(data[0].url);
              if (!open) {
                this.error(false);
              }
            } else {
              this.showhtmldata = data;
              this.$refs.showhtml.modal = true
            }
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
      changeSync(index, is_sync) {
        //需要删除确认
        let id = this.datas[index].id
        let _this = this
        let data = {
          'is_sync': is_sync,
          id: id
        }
        if (data.is_sync == 10) {
          this.$Modal.confirm({
            title: '确认同步',
            content: '您确定同步该活动?',
            okText: '确定',
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
        } else if (data.is_sync == 20) {
          this.$Modal.confirm({
            title: '确认取消同步',
            content: '您确定取消该活动?',
            okText: '确定',
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
        columns.push({
          title: 'ID',
          key: 'id',
          width: 60,
          align: 'center'
        })
        columns.push({
          title: '标题',
          sortable: true,
          render(h, params) {
            return h('span', {
              attrs: {
                title: params.row.title,
                style:"color:"+params.row.title_color
              },
            },params.row.title )
          }
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
        columns.push({
          title: '添加时间',
          key: 'create_time',
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
                    type: 'primary'
                  },
                  on: {
                    click: function () {
                      //不知道为什么这个地方不是我需要的this
                      _this.edit(params.index)
                    }
                  }
                }, '修改'),
                h('Button', {
                  props: {
                    size: 'small'
                  },
                  attrs: {
                    type: 'info',
                    style: 'margin-left:3px',
                  },
                  on: {
                    click: function () {
                      //不知道为什么这个地方不是我需要的this
                      _this.showhtml(params.index)
                    }
                  }
                }, '页面预览'),
                h('Button', {
                  props: {
                    size: 'small'
                  },
                  attrs: {
                    type: 'default',
                    style: 'margin-left:3px',
                  },
                  on: {
                    click: function () {
                      //不知道为什么这个地方不是我需要的this
                      _this.showhtml(params.index)
                    }
                  }
                }, '查看'),

              ]);
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

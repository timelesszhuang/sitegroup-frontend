<template>
  <div>
    <div class="top">
      问答:
      <Input v-model="content" placeholder="问答" style="width:300px;"></Input>
      问答分类:
      <Select v-model="type_id" style="width:200px;position: relative;z-index: 10000;"
              label-in-value  filterable clearable  placeholder="根据分类查询"   >
        <Option-group  v-for="(item,index) in questiontypelist" :label="index" :key="item">
          <Option v-for="items in item"  :value="items.id" :label="items.name" :key="index">{{ items.name }}</Option>
        </Option-group>
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
                show-elevator>
          </Page>
        </div>
      </div>
    </div>
    <questionadd ref="add" :questiontype="questiontypelist"></questionadd>
    <questionsave ref="save" :form="editinfo" :questiontype="questiontypelist"></questionsave>
    <showhtml ref="showhtml" :form="showhtmldata"></showhtml>
  </div>

</template>

<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';
  import common from '../../../assets/js/common';
  import questionadd from './add.vue';
  import questionsave from './save.vue';
  import showhtml from './showhtml.vue'

  export default {
    data() {
      return {
        self: this,
        border: true,
        stripe: true,
        showheader: true,
        showIndex: true,
        size: 'small',
        total: 0,
        page: 1,
        current: 1,
        rows: 10,
        content: '',
        type_id: 0,
        datas: [],
        editinfo: {},
        questiontypelist: [],
        showhtmldata: []
      }
    },
    components: {questionadd, questionsave, showhtml},
    created() {
      //该 函数封装在 common 中
      this.getQuestionType((data) => {
        this.questiontypelist = data
      });
      this.getData();
    },
    methods: {
      setQuestionTypelist(data) {
        this.questiontypelist = data
      },
      getData() {
        let data = {
          params: {
            page: this.page,
            rows: this.rows,
            content: this.content,
            type_id: this.type_id
          }
        }
        this.apiGet('question', data).then((data) => {
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
      add() {
        this.$refs.add.modal = true
      },
      error(nodesc) {
        this.$Notice.error({
          title: '预览模板页被浏览器拦截,请允许',
          desc: nodesc ? '' : ''
        });
      },
      edit(index) {
        let editid = this.datas[index].id
        this.apiGet('question/' + editid).then((res) => {
          this.handelResponse(res, (data, msg) => {
            delete  data.create_time;
            delete  data.update_time;
            this.editinfo = data
            this.modal = false;
            this.$refs.save.clearQuestionType
            this.$refs.save.modal = true
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (res) => {
          //处理错误信息
          this.$Message.error('网络异常，请稍后重试。');
        })
      },
      showhtml(index) {
        let data = this.datas[index]
        this.apiPost('questionshowhtml', data).then((res) => {
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
            _this.apiDelete('question/', id).then((res) => {
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
      }
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
          title: '问题',
          key: 'question',
          sortable: true
        });
        columns.push({
          title: '分类',
          key: 'type_name',
          sortable: true
        });
        columns.push({
          title: '添加时间',
          key: 'create_time'
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
                    type: 'error',
                    style: 'margin-left:3px',
                  },
                  on: {
                    click: function () {
                      //不知道为什么这个地方不是我需要的this
                      _this.remove(params.index)
                    }
                  }
                }, '删除'),
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

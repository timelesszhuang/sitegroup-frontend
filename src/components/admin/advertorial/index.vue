<template>
  <div>
    <div class="top">
      软文:
      <Input v-model="title" placeholder="请输入标题" style="width:300px;"></Input>
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
                show-ele vator show-sizer></Page>
        </div>
      </div>
    </div>
    <advertorialadd ref="add" :origintype="origintype"></advertorialadd>
    <advertorialsave ref="save" :origintype="origintype" :form="editinfo"></advertorialsave>
  </div>
</template>

<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';
  import advertorialadd from './add.vue';
  import advertorialsave from './save.vue';

  export default {
    data() {
      return {
        title: '',
        self: this,
        border: true,
        size: 'small',
        stripe: true,
        showheader: true,
        showIndex: true,
        current: 1,
        total: 0,
        page: 1,
        rows: 10,
        datas: [],
        editinfo: {},
        media: [],
        origintype: []
      }
    },
    components: {
      advertorialadd, advertorialsave
    },
    created() {
      this.getData();
      this.getorigintype();
    },
    methods: {
      edit(index) {
        let editid = this.datas[index].id
        this.apiGet('admin/softText/' + editid).then((res) => {
          this.handelResponse(res, (data, msg) => {
            this.editinfo = data
            this.modal = false;
            this.$refs.save.modal = true
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (res) => {
          //处理错误信息
          this.$Message.error('网络异常，请稍后重试。');
        })
      },
      queryData() {
        this.getData();
      },
      add() {
        this.$refs.add.modal = true
      },
      getData() {
        let data = {
          params: {
            page: this.page,
            rows: this.rows,
            title: this.title
          }
        }
        this.apiGet('admin/softText', data).then((data) => {
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
      getorigintype() {
        this.apiGet('admin/getOrigin').then((res) => {
          this.handelResponse(res, (data, msg) => {
            this.origintype = data
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
            _this.apiDelete('admin/softText/', id).then((res) => {
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
          title: '标题',
          key: 'title',
          sortable: true
        });
        columns.push({
          title: '媒体',
          key: 'media_name',
          sortable: true
        });
        columns.push({
          title: '审核状态',
          align: 'center',
          render(h, params) {
            if (params.row.is_check == 2) {
              return h('div', [
                h('Icon', {
                  props: {
                    type: 'checkmark'
                  },
                  attrs: {
                    title: '已审核通过',
                    style: 'color:#2db7f5;font-size: 18px'
                  },
                })
              ]);
            }
            return h('div', [
              h('Icon', {
                props: {
                  type: 'close-round'
                },
                attrs: {
                  title: '未审核',
                  style: 'color:red;font-size: 18px'
                },
              })
            ]);
          },
          sortable: true
        });
        columns.push({
          title: '时间',
          key: 'create_time',
          sortable: true
        });
        columns.push(
          {
            title: '操作',
            key: 'action',
            width: 150,
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
    mixins: [http]
  }
</script>

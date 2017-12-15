<template>
  <div>
    <div class="top">
      分类名:
      <Input v-model="name" placeholder="图集名" style="width:300px;"></Input>
      <Button type="primary" @click="queryData">查询</Button>
      <Button type="success" @click="add">添加</Button>
    </div>
    <div>
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
    <padd ref="add" ></padd>
    <psave ref="save"  :form="editinfo"></psave>
    <editimg ref="editimg" :form="imginfo"></editimg>
  </div>
</template>

<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';
  import padd from './add.vue';
  import psave from './save.vue';
  import editimg from './editimg.vue';


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
        name: '',
        datas: [],
        editinfo: {},
        imginfo: {},
      }
    },
    components: {padd, psave, editimg},
    created() {
      this.getData();
    },
    methods: {
      getData() {
        let data = {
          params: {
            page: this.page,
            rows: this.rows,
            name: this.name,
            type_id: this.type_id
          }
        }
        this.apiGet('imglist', data).then((data) => {
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
      start(params) {
        let editid = params.row.id
        let _this = this
        this.$Modal.confirm({
          title: '确认',
          content: '您确定启用',
          okText: '确认',
          cancelText: '取消',
          onOk: () => {
            _this.apiGet('changeimgliststatus/' + editid + "/10").then((res) => {
              _this.handelResponse(res, (data, msg) => {
                _this.getData()
                _this.$Message.success(msg);
              }, (data, msg) => {
                _this.modal_loading = false;
                _this.$Message.error(msg, 5);
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
      stop(params) {
        let editid = params.row.id
        let _this = this
        this.$Modal.confirm({
          title: '确认',
          content: '您确定禁用',
          okText: '确认',
          cancelText: '取消',
          onOk: () => {
            _this.apiGet('changeimgliststatus/' + editid + "/20").then((res) => {
              _this.handelResponse(res, (data, msg) => {
                _this.getData()
                _this.$Message.success(msg);
              }, (data, msg) => {
                _this.modal_loading = false;
                _this.$Message.error(msg, 5);
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
      edit(index) {
        let editid = this.datas[index].id
        this.apiGet('imglist/' + editid).then((res) => {
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
      editimg(index) {
        let editid = this.datas[index].id
        this.apiGet('getimgser/' + editid).then((res) => {
          this.handelResponse(res, (data, msg) => {
            this.imginfo = data
            if (data.imglist && data.imglist.length) {
              this.$refs.editimg.is_show = true;
            } else {
              this.$refs.editimg.is_show = false;
            }
            this.$refs.editimg.img = '';
            this.$refs.editimg.modal = true
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (res) => {
          //处理错误信息
          this.$Message.error('网络异常，请稍后重试。');
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
          width:'150',
          title: '图集名称',
          key: 'name',
        });

        columns.push({
          title: '英文名称',
          key: 'en_name',
          sortable: true
        });
        columns.push(
          {
            title: '操作',
            key: 'action',
            width: 350,
            align: 'center',
            fixed: 'right',
            render(h, params) {
              let statusbutton = '';
              if (params.row.status == '20') {
                //20 状态为禁用 应该启用
                statusbutton = h('Button', {
                  props: {
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  attrs: {
                    type: 'info'
                  },
                  on: {
                    click: function () {
                      _this.start(params)
                    }
                  }
                }, '启用')
              } else {
                statusbutton = h('Button', {
                  props: {
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  attrs: {
                    type: 'error'
                  },
                  on: {
                    click: function () {
                      _this.stop(params)
                    }
                  }
                }, '禁用')
              }
              return h('div', [
                h('Button', {
                  props: {
                    size: 'small'
                  },
                  attrs: {
                    type: 'primary'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: function () {
                      if (params.row.url) {
                        _this.urledit(params.index)
                      } else {
                        _this.edit(params.index)
                      }
                    }
                  }
                }, '修改'),
                h('Button', {
                  props: {
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  attrs: {
                    type: 'info'
                  },
                  on: {
                    click: function () {
                      _this.editimg(params.index)
                    }
                  }
                }, '修改图集'),
                statusbutton
              ]);
            },
          }
        );
        return columns;
      }
    },
    mixins: [http]
  }
</script>

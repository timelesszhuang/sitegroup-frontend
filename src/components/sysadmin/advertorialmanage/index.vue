<template>
  <div>
    <div class="top">
      软文:
      <Input v-model="title" placeholder="请输入标题" style="width:300px;"></Input>
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
                show-ele vator show-sizer></Page>
        </div>
      </div>
    </div>
    <advertorialsave ref="save" :origintype="origintype" :form="editinfo"></advertorialsave>
  </div>
</template>

<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';
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
        media:[],
        origintype:[]
      }
    },
    components: {
   advertorialsave
    },
    created() {
      this.getData();
      this.getorigintype();
    },
    methods: {
      edit(index) {
        let editid = this.datas[index].id
        this.apiGet('sys/softText/' + editid).then((res) => {
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

      getData() {
        let data = {
          params: {
            page: this.page,
            rows: this.rows,
            title: this.title
          }
        }
        this.apiGet('sys/softText', data).then((data) => {
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
        this.apiGet('sys/softGetOrigin').then((res) => {
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
            _this.apiDelete('sys/softText/', id).then((res) => {
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
      changeStatus(index, status){
        //需要删除确认
        let id = this.datas[index].id
        let _this = this
        let data = {
          'status': status,
          id: id
        }
        if (data.status == 1) {
          this.$Modal.confirm({
            title: '取消审核权限',
            content: '您确定取消?',
            okText: '确定',
            cancelText: '取消',
            onOk: (index) => {
              _this.apiGet('sys/setCheck/'+id+'/'+status, data).then((res) => {
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
        } else if (data.status == 2) {
          this.$Modal.confirm({
            title: '确认通过审核',
            content: '您确定通过审核?',
            okText: '确认',
            cancelText: '取消',
            onOk: (index) => {
              _this.apiGet('sys/setCheck/'+id+'/'+status, data).then((res) => {
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
          key: 'title',
          width: '100',
          render(h, params) {
            if (params.row.is_check == '2') {
              return h('div', [
                h('Icon', {
                  props: {
                    type: 'checkmark'
                  },
                  attrs: {
                    title: '启用',
                    style: 'color:green'
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
                  title: '禁用',
                  style: 'color:red'
                },
              })
            ]);
          },
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
          width: 300,
          align: 'center',
          fixed: 'right',
          render(h, params) {
          let statusbutton = '';
          if (params.row.is_check == '2') {
            //20 状态为禁用 应该启用
            statusbutton = h('Button', {
              props: {
                size: 'small'
              },
              attrs: {
                type: 'error'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: function () {
                  _this.changeStatus(params.index,'1')
                }
              }
            }, '否决审核')
          }else{
            statusbutton = h('Button', {
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
                  _this.changeStatus(params.index,'2')
                }
              }
            }, '通过审核')
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
                  _this.edit(params.index)

                }
              }
            }, '修改'),
            statusbutton,

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

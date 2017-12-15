<template>
  <div>
    <div class="top">
      用户管理:
      <Input v-model="name" placeholder="" style="width:300px;"></Input>
      <Button type="primary" @click="queryData">查询</Button>
      <Button type="success" @click="add">添加</Button>
      <Button type="error" @click="changePwd()">修改管理员密码</Button>
    </div>
    <div class="content" style="margin-top:10px;">
      <Table :context="self" :border="border" :stripe="stripe" :show-header="showheader"
             :size="size" :data="datas" :columns="tableColumns" style="width: 100%">
      </Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="total" :current="current" @on-change="changePage" @on-page-size-change="changePageSize"
                show-total
                show-elevator></Page>
        </div>
      </div>
    </div>
    <siteuseradd ref="add"></siteuseradd>
    <siteusersave ref="save" :form="editinfo"></siteusersave>
    <changepwd ref="changePwd"></changepwd>
  </div>
</template>

<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';
  import siteuseradd from './add.vue';
  import siteusersave from './save.vue';
  import changepwd from '../../Account/Changepwd.vue';

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
        editinfo: {}
      }
    },
    components: {siteuseradd, siteusersave, changepwd,},
    created() {
      this.getData();
    },
    methods: {
      changePwd() {
        this.$refs.changePwd.modal = true
      },
      getData() {
        let data = {
          params: {
            page: this.page,
            rows: this.rows,
            name: this.name
          }
        }
        this.apiGet('siteuser', data).then((data) => {
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
      edit(index) {
        let editid = this.datas[index].id
        this.apiGet('siteuser/' + editid).then((res) => {
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
      changeStatus(index, is_on) {
        //需要删除确认
        let id = this.datas[index].id
        let _this = this
        let data = {
          'is_on': is_on,
          id: id
        }
        if (data.is_on == 20) {
          this.$Modal.confirm({
            title: '确认禁用',
            content: '您确定禁用该活动?',
            okText: '禁用',
            cancelText: '取消',
            onOk: (index) => {
              _this.apiPut('siteuser/enable', data).then((res) => {
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
        } else if (is_on == 10) {
          this.$Modal.confirm({
            title: '确认启用',
            content: '您确定启用该活动?',
            okText: '启用',
            cancelText: '取消',
            onOk: (index) => {
              _this.apiPut('siteuser/enable', data).then((res) => {
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
        let _this = this
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
          title: '账号名',
          key: 'account',
          sortable: true
        });
        columns.push({
          title: '昵称',
          key: 'name',
          sortable: true
        });
        columns.push({
          title: '邮箱',
          key: 'email',
        });
        columns.push(
          {
            title: '状态',
            key: 'action',
            align: 'center',
            fixed: 'center',
            render(h, params) {
              if (params.row.is_on == '10') {
                return h('div', [
                  h('Icon', {
                    props: {
                      type: 'checkmark'
                    },
                    attrs: {
                      title: '已启用',
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
                    title: '已禁用',
                    style: 'color:red'
                  },
                })
              ]);
            },
          }
        );
        columns.push(
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            fixed: 'right',
            render(h, params) {
              let onbutton = '';
              if (params.row.is_on == '20') {
                onbutton = h('Button', {
                  props: {
                    size: 'small'
                  },
                  attrs: {
                    type: 'primary',
                    style: 'margin-left:3px',
                  },
                  on: {
                    click: function () {
                      //不知道为什么这个地方不是我需要的this
                      _this.changeStatus(params.index, '10')
                    }
                  }
                }, '启用');
              } else {
                onbutton = h('Button', {
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
                      _this.changeStatus(params.index, '20')
                    }
                  }
                }, '禁用');
              }
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
                onbutton
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

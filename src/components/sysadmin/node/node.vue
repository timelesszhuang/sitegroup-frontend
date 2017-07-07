<template>
  <div>
    <div style="margin: 10px">
      <Button type="success" shape="circle" icon="plus" @click="add">添加节点</Button>
    </div>
    <Table :context="self" :border="border" :stripe="stripe" :show-header="showheader"
           :size="size" :data="nodelist" :columns="tableColumns3" style="width: 100%">
    </Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="total" :current="current" @on-change="changePage" show-total
              show-elevator></Page>
      </div>
    </div>
    <!--用户添加操作-->
    <Nodeadd ref="add" :company="companylist" :user="userlist"></Nodeadd>
    <Nodeedit ref="edit" :form="editinfo" :company="companylist" :user="userlist"></Nodeedit>
  </div>
</template>
<script>
  import http from '../../../assets/js/http.js';
  import Nodeadd from './nodeadd.vue';
  import Nodeedit from './nodeedit.vue';
  export default {
    data () {
      return {
        self: this,
        border: true,
        stripe: true,
        showheader: true,
        size: 'small',
        total: 0,
        current: 1,
        pagesize: 10,
        name: '',
        nodelist: [],
        editinfo: {},
        userlist: [],
        companylist: [],
      }
    },
    components: {Nodeadd, Nodeedit},
    created () {
      this.getData();
      this.getCompany();
      this.getUser();
    },
    methods: {
      getUser(){
        this.apiGet('user/getAll').then((res) => {
          this.handelResponse(res, (data, msg) => {
//            console.log(data)
            this.userlist = data;
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (res) => {
          //处理错误信息
          this.$Message.error('网络异常，请稍后重试。');
        });
      },
      getCompany(){
        this.apiGet('company/getAll').then((res) => {
          this.handelResponse(res, (data, msg) => {
            this.companylist = data;
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (res) => {
          //处理错误信息
          this.$Message.error('网络异常，请稍后重试。');
        });
      },
      //获取数据
      getData(){
        let data = {
          params: {
            'page': this.current,
            'rows': this.pagesize,
            /*            'name': this.name,
             'industry_id': this.industry_id*/
          }
        };
        this.apiGet('node', data).then((data) => {
          this.handelResponse(data, (data, msg) => {
//            console.log(data)
            this.nodelist = data.rows
            this.total = data.total;
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (data) => {
          this.$Message.error('网络异常，请稍后重试');
        })
      },
      queryData(){
        this.getData();
      },
      changePage(page){
        this.current = page;
        this.getData();
      },
      changePageSize(pagesize){
        this.pagesize = pagesize
        this.getData()
      },
      add(){
        this.$refs.add.modal = true
      },
      edit(index){
        //　需要删除确认
        //　获取资源信息
        let editid = this.nodelist[index].id
        this.apiGet('node/' + editid).then((res) => {
          this.handelResponse(res, (data, msg) => {
            delete  data.create_time;
            delete  data.update_time;
            this.editinfo = data
            this.modal = false;
            this.$refs.edit.modal = true
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (res) => {
          //处理错误信息
          this.$Message.error('网络异常，请稍后重试。');
        })
      },
      on (index) {
        //需要删除确认
        let id = this.nodelist[index].id
        let _this = this
        let data = {
          params: {
            id: id,
            status: 'on'
          }
        };
        this.$Modal.confirm({
          title: '确认启用节点',
          content: '您确定启用该节点?',
          okText: '启用',
          cancelText: '取消',
          onOk: (index) => {
            _this.apiGet('node/status/', data).then((res) => {
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
      off(index){
        let id = this.nodelist[index].id
        let _this = this
        let data = {
          params: {
            id: id,
            status: 'off'
          }
        };
        this.$Modal.confirm({
          title: '确认禁用',
          content: '您确定禁用该节点?',
          okText: '禁用',
          cancelText: '取消',
          onOk: (index) => {
            _this.apiGet('node/status/', data).then((res) => {
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
      tableColumns3()
      {
        let columns = [
          {
            type: 'index', width: 60, align: 'center'
          },
          {
            title: '节点名', key: 'name', sortable: true
          },
          {
            title: '节点信息', key: 'detail', sortable: true
          },
          {
            title: '所属公司', key: 'com_name', sortable: true
          },
          {
            title: '绑定登录名', key: 'user_name'
          },
          {
            title: '添加时间', key: 'create_time',
          }
        ];
        columns.push(
          {
            title: '账号状态',
            key: 'status',
            align: 'center',
            render (row, column, index) {
              if (row.status == 'on') {
                return '<span style="font-weight: bold;" title="启用"><Icon type="ios-checkmark-empty" size="30"></Icon></span>';
              } else {
                return '<span style="color: red;font-weight: bold;" title="禁用"><Icon type="ios-close-empty" size="30" ></Icon> </span>'
              }
            }
          }),
          columns.push(
            {
              title: '操作',
              key: 'action',
              width: 150,
              align: 'center',
              fixed: 'right',
              render (row, column, index) {
                let btn = ''
                if (row.status == 'off') {
                  btn = `<i-button type="error" size="small" @click="on(${index})">启用</i-button>`;
                } else {
                  btn = `<i-button type="error" size="small" @click="off(${index})">禁用</i-button>`;
                }
                return `<i-button type="primary" size="small" @click="edit(${index})">修改</i-button> ` + btn;

              }
            }
          );
        return columns;
      }
    },
    mixins: [http]
  }
</script>

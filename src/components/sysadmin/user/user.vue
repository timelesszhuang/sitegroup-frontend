<template>
  <div>
    <div style="margin: 10px">
      用户类型：
      <Radio-group v-model="usertype" type="button">
        <Radio label="all">全部</Radio>
        <Radio label="1">系统管理员</Radio>
        <Radio label="2">节点管理员</Radio>
      </Radio-group>
      公司名：
      <Input v-model="name" placeholder="要查询的公司名" style="width: 300px"></Input>
      <Button type="primary" icon="ios-search" @click="queryData">搜索</Button>
      <Button type="success" shape="circle" icon="plus" @click="add">添加用户</Button>
    </div>
    <Table :context="self" :border="border" :stripe="stripe" :show-header="showheader"
           :size="size" :data="userlist" :columns="tableColumns3" style="width: 100%">
    </Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="total" :current="current" @on-change="changePage" @on-page-size-change="changePageSize" show-total
              show-elevator ></Page>
      </div>
    </div>
    <!--用户添加操作-->
    <Useradd ref="add"></Useradd>
    <Useredit ref="edit" :form="editinfo"></Useredit>
  </div>
</template>
<script>
  import http from '../../../assets/js/http.js';
  import Useradd from './useradd.vue';
  import Useredit from './useredit.vue';
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
        userlist: [],
        usertype: 'all',
        editinfo: {},
      }
    },
    components: {Useradd, Useredit},
    created () {
      this.getData();
    },
    methods: {
      //获取数据
      getData(){
        let usertype = '';
        if (this.usertype != 'all') {
          usertype = this.usertype;
        }
        let data = {
          params: {
            'page': this.current,
            'rows': this.pagesize,
            'type': usertype,
            'name': this.name
          }
        };
        this.apiGet('User', data).then((data) => {
          this.handelResponse(data, (data, msg) => {
            this.userlist = data.rows
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
        let editid = this.userlist[index].id
        this.apiGet('user/' + editid).then((res) => {
          this.handelResponse(res, (data, msg) => {
            data.pwd = '';
            data.pwd2 = '';
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
      remove (index) {
        //需要删除确认
        let id = this.userlist[index].id
        let _this = this
        this.$Modal.confirm({
          title: '确认删除',
          content: '您确定删除该记录?',
          okText: '删除',
          cancelText: '取消',
          onOk: (index) => {
            _this.apiDelete('user/', id).then((res) => {
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
    }
    ,
    computed: {
      tableColumns3()
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
          title: '登录名',
          key: 'user_name',
          sortable: true
        });
        columns.push({
          title: '公司名',
          key: 'name'
        });
        columns.push({
          title: '类型',
          key: 'type_name',
          sortable: true,
          filters: [
            {
              label: '系统管理员',
              value: 1
            },
            {
              label: '节点管理员',
              value: 2
            }
          ],
          filterMultiple: false,
          filterMethod (value, row) {
            if (value === 1) {
              return row.type == 1;
            } else if (value === 2) {
              return row.type == 2;
            }
          }
        });
        columns.push(
          {
            title: '联系人',
            key: 'contacts',
          }
        );
        columns.push(
          {
            title: '手机号码',
            key: 'mobile',
          }
        );
        columns.push(
          {
            title: '固话',
            key: 'tel',
          }
        );
        columns.push(
          {
            title: '微信号',
            key: 'wechat',
          }
        );
        columns.push(
          {
            title: '邮箱',
            key: 'email',
          }
        );
        columns.push({
          title: '创建时间',
          key: 'create_time'
        });
        columns.push(
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            fixed: 'right',
            render (row, column, index) {
              return `<i-button type="primary" size="small" @click="edit(${index})">修改</i-button>   <i-button type="error" size="small" @click="remove(${index})">删除</i-button>`;
            }
          }
        );
        return columns;
      }
    }
    ,
    mixins: [http]
  }
</script>

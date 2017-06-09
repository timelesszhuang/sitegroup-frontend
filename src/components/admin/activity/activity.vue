<template>
  <div>
    <div class="top">
      活动:
      <Input v-model="name" placeholder="请输入活动名" style="width:300px;"></Input>
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
    <activityadd ref="add"></activityadd>
    <activitysave ref="save" :form="editinfo"></activitysave>
  </div>

</template>

<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';
  import common from '../../../assets/js/common.js';
  import activityadd from './activityadd.vue';
  import activitysave from './activitysave.vue';

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
        name: '',
        datas: [],
        editinfo: {}
      }
    },
    components: {activityadd, activitysave},
    created () {
      this.getData();
    },
    methods: {
      getData() {
        let data = {
          params: {
            page: this.page,
            rows: this.rows,
            name: this.name,
          }
        }
        this.apiGet('activity', data).then((data) => {
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
        this.getActivity(index);
        this.$refs.save.modal = true
      },
      getActivity(index){
        let editid = this.datas[index].id
        this.apiGet('activity/' + editid).then((res) => {
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
      changeStatus(index, status){
        //需要删除确认
        let id = this.datas[index].id
        let _this = this
        let data = {
          'status': status,
          'id': id
        }
        let msg = '启用'
        if (status == '20') {
          msg = '禁用'
        }
        this.$Modal.confirm({
          title: '确认' + msg,
          content: '您确定' + msg + '该活动?',
          okText: msg,
          cancelText: '取消',
          onOk: (index) => {
            _this.apiPut('activity/changeActivityStatus/', data).then((res) => {
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
          title: '活动/主题名',
          key: 'name',
          sortable: true
        });
        columns.push({
          title: '详情',
          key: 'detail',
          sortable: true
        });
        columns.push(
          {
            title: '状态',
            key: 'action',
            align: 'center',
            fixed: 'center',
            render (row, column, index) {
              if (row.status == '20') {
                //20 表示禁用 按钮应该为启用
                return '禁用'
              }
              return '启用'
            }
          }
        );
        columns.push({
          title: '创建时间',
          key: 'create_time',
          sortable: true
        });
        columns.push(
          {
            title: '操作',
            key: 'action',
            align: 'center',
            fixed: 'right',
            render (row, column, index) {
              var btn = `<i-button type="error" size="small" @click="changeStatus(${index},'20')">禁用</i-button>`;
              if (row.status == '20') {
                //20 表示禁用 按钮应该为启用
                btn = `<i-button type="error" size="small" @click="changeStatus(${index},'10')">启用</i-button>`;
              }
              return `<i-button type="primary" size="small" @click="edit(${index})">修改</i-button> ` + btn;
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

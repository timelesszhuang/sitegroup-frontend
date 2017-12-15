<template>
  <div>
    <div class="top" style="margin-left: 10px">
      <Button type="success" @click="add">添加配置</Button>
    </div>
    <div class="content" style="margin-top:10px;margin-left: 5px;margin-right: 5px">
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
    <customefromadd ref="add"></customefromadd>
    <customefromcode ref="code" :form="getinfo"></customefromcode>
    <customefromsave ref="save" :info="info" :form="editinfo" :field1="field1" :field2="field2" :field3="field3"
                     :field4="field4"></customefromsave>
  </div>
</template>

<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';
  import customefromadd from './add.vue';
  import customefromsave from './save.vue';
  import customefromcode from './code.vue';

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
        field1: {},
        field2: {},
        field3: {},
        field4: {},
        getinfo: "",
        info: {}

      }
    },
    components: {customefromadd, customefromsave, customefromcode},
    methods: {
      init() {
        this.getData();
      },
      getData() {
        let data = {
          params: {
            page: this.page,
            rows: this.rows,
            name: this.name
          }
        }
        this.apiGet('admin/userdefinedform', data).then((data) => {
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
        this.apiGet('admin/userdefinedform/' + editid).then((res) => {
          this.handelResponse(res, (data, msg) => {
            this.editinfo = data
            this.info = data.form_info;
            this.field1 = data.form_info.field1
            this.field2 = data.form_info.field2
            this.field3 = data.form_info.field3
            this.field4 = data.form_info.field4
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
      getcode(index) {
        let getid = this.datas[index].id
        this.apiGet('admin/userdefinedformcode/' + getid).then((res) => {
          this.handelResponse(res, (data, msg) => {
            this.getinfo = data
            this.modal = false;
            this.$refs.code.modal = true
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (res) => {
          //处理错误信息
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
            _this.apiDelete('code/', id).then((res) => {
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
          title: '配置用途',
          key: 'detail',
          sortable: true
        });
        columns.push(
          {
            title: '操作',
            key: 'action',
            width: 200,
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
                    type: 'primary',
                    style: 'margin-left:3px',
                  },
                  on: {
                    click: function () {
                      //不知道为什么这个地方不是我需要的this
                      _this.getcode(params.index)
                    }
                  }
                }, '获取代码'),
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

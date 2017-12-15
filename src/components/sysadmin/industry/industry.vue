<template>
  <div>
    <div style="margin: 10px">
      行业：
      <Input v-model="name" placeholder="行业" style="width: 300px"></Input>
      <Button type="primary" icon="ios-search" @click="queryData">搜索</Button>
      <Button type="success" shape="circle" icon="plus" @click="add">添加行业</Button>
    </div>
    <Table :context="self" :border="border" :stripe="stripe" :show-header="showheader"
           :size="size" :data="industrylist" :columns="tableColumns" style="width: 100%">
    </Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="total" :current="current" @on-change="changePage" show-total
              show-elevator>
        </Page>
      </div>
    </div>
    <!--用户添加操作-->
    <Industryadd ref="add"></Industryadd>
    <Industryedit ref="edit" :form="editinfo"></Industryedit>
  </div>
</template>
<script>
  import http from '../../../assets/js/http.js';
  import Industryadd from './industryadd.vue';
  import Industryedit from './industryedit.vue';

  export default {
    data() {
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
        industrylist: [],
        editinfo: {},
      }
    },
    components: {Industryadd, Industryedit},
    created() {
    },
    methods: {
      //获取数据
      getData() {
        let data = {
          params: {
            'page': this.current,
            'rows': this.pagesize,
            'name': this.name
          }
        };
        this.apiGet('industry', data).then((data) => {
          this.handelResponse(data, (data, msg) => {
            this.industrylist = data.rows
            this.total = data.total;
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (data) => {
          this.$Message.error('网络异常，请稍后重试');
        })
      },
      queryData() {
        this.getData();
      },
      changePage(page) {
        this.current = page;
        this.getData();
      },
      changePageSize(pagesize) {
        this.pagesize = pagesize
        this.getData()
      },
      add() {
        this.$refs.add.modal = true
      },
      edit(index) {
        //　需要删除确认
        //　获取资源信息
        let editid = this.industrylist[index].id
        this.apiGet('industry/' + editid).then((res) => {
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
      remove(index) {
        //需要删除确认
        let id = this.industrylist[index].id
        let _this = this
        this.$Modal.confirm({
          title: '确认删除',
          content: '您确定删除该记录?',
          okText: '删除',
          cancelText: '取消',
          onOk: (index) => {
            _this.apiDelete('industry/', id).then((res) => {
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
      tableColumns() {
        let columns = [
          {
            type: 'index', width: 60, align: 'center'
          },
          {
            title: '行业名', key: 'name', sortable: true
          },
          {
            title: '行业详情', key: 'detail'
          },
          {
            title: '排序', key: 'sort',
          },
          {
            title: '添加时间', key: 'create_time',
          }
        ];
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
                  style: {
                    marginRight: '5px'
                  },
                  attrs: {
                    type: 'primary'
                  },
                  on: {
                    click: function () {
                      _this.edit(params.index)
                    }
                  }
                }, '修改'),
                h('Button', {
                  props: {
                    size: 'small'
                  },
                  attrs: {
                    type: 'error'
                  },
                  on: {
                    click: function () {
                      _this.remove(params.index)
                    }
                  }
                }, '删除'),
              ]);
            },
          }
        );
        return columns;
      }
    }
    ,
    mixins: [http]
  }
</script>

<template>
  <div>
    <div class="top">
      媒体管理:
      <Input v-model="name" placeholder="请输入媒体名字" style="width:300px;"></Input>
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
    <mediaadd ref="add"  :origintype="origintype" :mediatype="mediatype"></mediaadd>
    <mediatypesave ref="save"  :origintype="origintype" :mediatype="mediatype" :form="editinfo"></mediatypesave>
  </div>
</template>

<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';
  import mediaadd from './add.vue';
  import mediatypesave from './save.vue';

  export default {
    data() {
      return {
        name: '',
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
        origintype:[],
        mediatype:[]
      }
    },
    components: {
      mediaadd, mediatypesave
    },
    created() {
      this.getData();
      this.getmediatype();
      this.getorigintype()

    },
    methods: {
      getData() {
        let data = {
          params: {
            page: this.page,
            rows: this.rows,
            name: this.name
          }
        }
        this.apiGet('sys/media', data).then((data) => {
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
        this.apiGet('sys/mediaOrigin').then((res) => {
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
      getmediatype() {
        this.apiGet('sys/getMediaType').then((res) => {
          this.handelResponse(res, (data, msg) => {
            this.mediatype = data
            console.log(data)
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (res) => {
          //处理错误信息
          this.$Message.error('网络异常，请稍后重试。');
        })
      },

      edit(index) {
        let editid = this.datas[index].id
        this.apiGet('sys/media/' + editid).then((res) => {
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
            _this.apiDelete('sys/media/', id).then((res) => {
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
      queryData() {
        this.getData();
      },
      add() {
        this.$refs.add.modal = true
      },

      changePage(page) {
        this.page = page;
        this.getData();
      },
      changePageSize(pagesize) {
        this.rows = pagesize;
        this.getData();
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
          title: '媒体名称',
          key: 'name',
          sortable: true
        });
        columns.push({
          title: '媒体分类名称',
          key: 'media_type_name',
          sortable: true
        });
        columns.push({
          title: '地区',
          key: 'origin',
          sortable: true
        });
        columns.push({
          title: '市场价',
          key: 'market_price',
          sortable: true
        });
        columns.push({
          title: '代理价',
          key: 'assitant_price',
          sortable: true
        });
        columns.push({
          title: '实际销售价',
          key: 'sale_price',
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
            width: 200,
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
    },
    mixins: [http]
  }
</script>

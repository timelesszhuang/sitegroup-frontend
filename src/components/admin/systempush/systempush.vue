<template>
  <div>
    <div class="content" style="margin-top:10px;">
      <Table :context="self" :border="border" :stripe="stripe" :show-header="showheader"
             :size="size" :data="datas" :columns="tableColumns" @on-row-click="showMessage" style="width: 100%">
      </Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="total" :current="current" @on-change="changePage" @on-page-size-change="changePageSize"
                show-total
                show-elevator></Page>
        </div>
      </div>
      <Alert type="error">点击查看信息</Alert>
    </div>
    <Modal v-model="systemMessage" width="900" title="信息">
      <div style="width:auto;margin: 0 auto;font-size: 20px;text-align: center"> {{title}}</div>
      <div v-html="content" style="font-size: 20px;padding:10px;min-height: 300px">


      </div>

    </Modal>
  </div>

</template>

<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';

  export default {
    data() {
      return {
        systemMessage: false,
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
        datas: [],
        title: '',
        content: '',

      }
    },
    created() {
      this.getData();
    },
    methods: {
      showMessage(row) {
        this.systemMessage = true
        this.title = row.title;
        this.content = row.content
        this.changeSta(row.id)
      },
      changeSta(id) {
        this.apiGet('admin/systemNotice/' + id).then((data) => {
          this.handelResponse(data, (data, msg) => {
            this.getData();
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
      getData() {
        let data = {
          params: {
            page: this.page,
            rows: this.rows,
          }
        }
        this.apiGet('admin/systemNotice', data).then((data) => {
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
    },
    computed: {
      tableColumns() {
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
          title: '标题',
          key: 'title',
          sortable: true
        });
        columns.push({
          title: '状态',
          align: 'center',
          render(row, index) {
            if (!row.readid) {
              var type = "未查看";
              return type;
            } else {
              var type = "已查看";
              return type;
            }
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
                    type: 'default'
                  },
                  on: {
                    click: function () {
                      //不知道为什么这个地方不是我需要的this
                      _this.showMessage(params.row)
                    }
                  }
                }, '查看')
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

<style scoped>
  .ivu-modal-content {
    width: 900px;
  }

</style>


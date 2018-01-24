<template>
  <div>
    <div class="top">
      节点选择:
      <Select v-model="node_id" style="width:300px" label-in-value filterable clearable>
        <Option v-for="item in nodetype" :value="item.id" :label="item.name" :key="item">{{ item.name }}</Option>
      </Select>
      <Button type="primary" @click="queryData">查询</Button>
    </div>
    <div class="content" style="margin-top:10px;">
      <Table :context="self" :border="border" :stripe="stripe" :show-header="showheader"
             :size="size" :data="datas" :columns="tableColumns" style="width: 99%">
      </Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="total" :current="current" @on-change="changePage" @on-page-size-change="changePageSize"
                show-total
                show-ele vator show-sizer></Page>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';

  export default {
    data() {
      return {
        total: 0,
        self: this,
        border: true,
        stripe: true,
        showheader: true,
        showIndex: true,
        size: 'small',
        page: 1,
        rows: 10,
        pageSize: 10,
        name: '',
        datas: [],
        current: 1,
        selectDate: '',
        node_id: '',
        keyword_type: '',
        nodetype: [],
        currentKeyId: 0
      }
    },
    created() {
      this.getData()
      this.NodeList()
    },
    methods: {
      changeKeyword(key) {
        this.currentKeyId = key
      },
      NodeList() {
        this.apiGet('sys/getNodelist').then((data) => {
          this.handelResponse(data, (data, msg) => {
            this.nodetype = data
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
      getData() {
        let data = {
          params: {
            page: this.page,
            rows: this.rows,
            node_id:this.node_id
          }
        }
        this.apiGet('sys/voice_cdr', data).then((data) => {
          this.handelResponse(data, (data, msg) => {
            this.datas = data.rows
            this.total = data.total;
            this.pageSize = 10
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (data) => {
          this.$Message.error('网络异常，请稍后重试');
        })
      }
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
          title: '客户的电话号码',
          key: 'telnum',
          width: 200,
          align: 'center'
        });
        columns.push({
          title: '接通状态',
          key: 'status',
          align: 'center',
          width: 90,
          render(h, params) {
            if (params.row.status == '10') {
              return h('div', [
                h('Icon', {
                  props: {
                    type: 'checkmark'
                  },
                  attrs: {
                    title: '接通',
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
                  title: '未接通',
                  style: 'color:red'
                },
              })
            ]);
          },
        });
        columns.push({
          title: '电话开始时间',
          key: 'timestart',
          align: 'center',
          width: 150
        });
        columns.push({
          title: '电话结束时间',
          key: 'timeend',
          align: 'center',
          width: 150
        });
        columns.push({
            title: '录音',
            key: 'rec_name',
            align: 'center',
            render(h, params) {
              return h('audio',
                {
                  attrs: {
                    'controls': 'true',
                    'preload': 'none'
                  },
                }, [
                  h('source', {
                    props: {
                      size: 'small'
                    },
                    attrs: {
                      'src': params.row.rec_name,
                    },
                  })
                ]
              )
            }
          }
        );
        columns.push({
          title: '添加时间',
          key: 'create_time',
          width: 150,
          align: 'center',
        });
        return columns;
      }
    },
    mixins: [http]
  }
</script>
<style>
  em {
    color: red;
  }

</style>

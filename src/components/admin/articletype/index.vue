<template>
  <div>
    <div class="top">
      分类名:
      <Input v-model="name" placeholder="文章分类名" style="width:300px;"></Input>
      <Button type="primary" @click="queryData">查询</Button>
      <Button type="success" @click="add">添加</Button>
    </div>
    <div>
      <br>
      <Alert type="success">
        注意：标签用于 在添加栏目的时候 区分文章分类
      </Alert>
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
    <articleadd ref="add"></articleadd>
    <articlesave ref="save" :form="editinfo"></articlesave>
  </div>
</template>

<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';
  import articleadd from './add.vue';
  import articlesave from './save.vue';

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
    components: {articleadd, articlesave},
    created() {
      this.getData();
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
        this.apiGet('articletype', data).then((data) => {
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
        this.apiGet('articletype/' + editid).then((res) => {
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
          title: '分类名',
          key: 'name',
          sortable: true
        });
        columns.push({
          title: '英文名',
          key: 'alias',
          sortable: true
        });
        columns.push({
          title: '描述',
          key: 'detail'
        });
        columns.push({
          title: '标签',
          key: 'tag'
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
                    type: 'primary'
                  },
                  on: {
                    click: function () {
                      //不知道为什么这个地方不是我需要的this
                      _this.edit(params.index)
                    }
                  }
                }, '修改')
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

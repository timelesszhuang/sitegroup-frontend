<template>
  <div>
    <div class="content" style="margin-top:10px;">
      <Table :context="self" :border="border" :stripe="stripe" :show-header="showheader"
             :size="size" :data="datas" :columns="tableColumns" @on-row-click="showMessage(datas)" style="width: 100%">
      </Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="total" :current="current" @on-change="changePage" @on-page-size-change="changePageSize"
                show-total
                show-elevator show-sizer></Page>
        </div>
      </div>
    </div>
    <Modal v-model="errorMessage" title="错误信息">
      <p>错误信息: {{message}}</p>
      <p>操作: {{operator}}</p>
      <p>站点: {{site_name}}</p>
    </Modal>
  </div>

</template>

<script type="text/ecmascript-6">
  import http from '../../assets/js/http.js';
  export default {
    data() {
      return {
        errorMessage: false,
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
        message: '',
        operator: '',
        site_name: '',
      }
    },
    created() {
      this.getData();
    },
    methods: {
      showMessage(item){
        this.errorMessage = true
        this.operator = item[0].operator;
        this.message = item[0].msg
        this.site_name = item[0].site_name
        this.changeStatus(item[0].id)
      },
      changeStatus(id){
        let _this = this;
        this.apiPost('article/changeErrorStatus/' + id).then((data) => {
          this.handelResponse(data, (data, msg) => {
            _this.getData();
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
      getData() {
        let data = {
          params: {
            page: this.page,
            rows: this.rows,
          }
        }
        this.apiGet('article/getErrorInfo', data).then((data) => {
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
          title: '信息',
          key: 'msg',
          sortable: true
        });
        columns.push({
          title: '状态',
          key: 'status',
          sortable: true
        });
        columns.push({
          title: '操作过程',
          key: 'operator',
          sortable: true
        });
        return columns;
      }
    },
    mixins: [http]
  }

</script>
<style>


</style>

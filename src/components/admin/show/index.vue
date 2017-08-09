<template>
  <div>
    <div class="top">
      <Select v-model="site_id" style="margin-left:40%;width:300px;" label-in-value filterable clearable>
        <Option v-for="item in site" :value="item.id" :label="item.text" :key="item">
          {{ item.text }}
        </Option>
      </Select>
      <Button type="primary" @click="queryData">查询</Button>
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
  </div>
</template>

<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';
  export default {
    data () {
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
        site: [],
        site_id: "",
      }
    },
    components: {},
    created () {
      this.getData();
      this.getSite((data) => {
        this.site = data
      });
    },
    methods: {
      getSite(){
        this.apiGet('Site/getSites').then((res) => {
          this.handelResponse(res, (data, msg) => {
            this.site = data
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (res) => {
          //处理错误信息
          this.$Message.error('网络异常，请稍后重试。');
        })
      },
      queryData() {
        this.getData();
        this.getSite((data) => {
          this.site = data
        });
      },
      getData() {
        let data = {
          params: {
            page: this.page,
            rows: this.rows,
            site_id: this.site_id
          }
        }
        this.apiGet('pv', data).then((data) => {
          this.handelResponse(data, (data, msg) => {
            this.datas = data.rows
            this.total = data.total;
          }, (data, msg) => {
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
          title: '省市',
          key: 'Provincecities',
          sortable: true
        });
        columns.push({
          title: 'IP地址',
          key: 'ip',
          sortable: true
        });
        columns.push({
          title: '来源页',
          key: 'referer',
          sortable: true
        });
        columns.push({
          title: '访问时间',
          key: 'update_time',
          sortable: true
        });
        return columns;
      }
    },
    mixins: [http]
  }
</script>

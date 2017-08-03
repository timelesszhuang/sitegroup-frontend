<template>
  <div>
    <div class="top">
      <Row>
        <Col span="7">
        关键词查询:
        <Input v-model="mainkeyword_name" placeholder="请输入关键词" style="width:300px;"></Input>
        </Col>
        <Col span="7">
        URL:
        <Input v-model="url" placeholder="请输入URL" style="width:300px;"></Input>
        </Col>
        <Col span="4">
        <Date-picker v-model="selectDate"   type="date" placeholder="选择日期" style="width: 200px"></Date-picker>
        </Col>
        <Col span="1">
        <Button type="primary" @click="queryData">查询</Button>
        </Col>
      </Row>


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
        name:'',
        datas: [],
        current: 1,
        mainkeyword_name:'',
        selectDate:'',
        url:''
      }
    },
    created() {
      this.getData()
    },
    methods: {
      changePage(page){
        this.page = page;
        this.getData();
      },
      changePageSize(pagesize){
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
            mainkeyword_name: this.mainkeyword_name,
            time:this.selectDate,
            url:this.url
          }
        }
        this.apiGet('admin/searchkeywords', data).then((data) => {
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
        columns.push({
          title: 'A类关键词',
          key: 'mainkeyword_name',
          width: 130,
          sortable: true,
          fixed: 'left'
        });
        columns.push({
          title: '总排名',
          key: 'all_order',
          width: 90,
          sortable: true,
          fixed: 'left'
        });
        columns.push({
          title: '页码',
          key: 'page',
          width: 130,
          sortable: true,
          fixed: 'left'
        });
        columns.push({
          title: '本页排名',
          key: 'page_order',
          width: 90,
          sortable: true,
        });
        columns.push({
          title: '链接',
          key: 'trueUrl',
          render (row, column, index) {
            console.log(row)
            return `<a href="`+row.a_href+`" target="_blank">`+row.a_text+`</i-button>`;
          }
        });
        columns.push({
          title: '标题',
          key: 'emtitle',
          sortable: true
        });
        columns.push({
          title: '关键词',
          key: 'keywords',
          sortable: true
        });
        columns.push({
          title: '描述',
          key: 'description',
          sortable: true
        });
        columns.push({
          title: '时间',
          key: 'create_time',
          sortable: true,
          fixed: 'right',
        });
        return columns;
      }
    },
    mixins: [http]
  }
</script>
<style>
  em{
    color:red;
  }

</style>

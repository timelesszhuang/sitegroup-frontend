<template>
  <div>
    <div class="top">
      <Row>
        <Col span="5">
        主关键词：
        <Select v-model="keyword_type" style="width:200px" @on-change="changeKeyword">
          <Option v-for="items in keywordtype" :value="items.id" :key="items.text">{{ items.text }}</Option>
        </Select>
        </Col>
        <Col span="5">
        URL:
        <Input v-model="url" placeholder="请输入URL" style="width:200px;"></Input>
        </Col>
        <Col span="5">
        <Date-picker v-model="selectDate"   type="date" placeholder="选择日期" style="width: 200px"></Date-picker>
        </Col>
        <Col span="5">
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
        name: '',
        datas: [],
        current: 1,
        selectDate: '',
        url: '',
        keyword_type: '',
        keywordtype: {},
        currentKeyId: 0
      }
    },
    created() {
      this.getData()
      this.mainKeywordList()
    },
    methods: {
      changeKeyword(key) {
        this.currentKeyId = key
      },
      mainKeywordList() {
        this.apiGet('admin/mainkeyword').then((data) => {
          this.handelResponse(data, (data, msg) => {
            this.keywordtype = data
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
            time: this.selectDate,
            mainkeyword_id: this.currentKeyId,
            url: this.url
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
      tableColumns() {
        let columns = [];
        if (this.showCheckbox) {
          columns.push({
            type: 'selection',
            align: 'center'
          })
        }
        columns.push({
          title: 'A类关键词',
          key: 'mainkeyword_name',
          sortable: true,
          fixed: 'left'
        });
        columns.push({
          title: '总排名',
          key: 'all_order',
          fixed: 'left',
          width:80
        });
        columns.push({
          title: '页码',
          key: 'page',
          fixed: 'left',
          width:80
        });
        columns.push({
          title: '页排名',
          key: 'page_order',
          fixed: 'left',
          width:80
        });
        columns.push({
          title: '链接',
          key: 'trueUrl',
          width:150,
          render(row, column, index) {
            return `<a href="` + row.a_href + `" target="_blank">` + row.a_text + `</i-button>`;
          }
        });
        columns.push({
          title: '标题',
          key: 'emtitle',
          width: 150,
          sortable: true
        });
        columns.push({
          title: '关键词',
          key: 'keywords',
          width: 350,
          sortable: true
        });
        columns.push({
          title: '描述',
          width: 350,
          key: 'description',
          sortable: true
        });
        columns.push({
          title: '时间',
          key: 'create_time',
          width:100,
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
  em {
    color: red;
  }

</style>

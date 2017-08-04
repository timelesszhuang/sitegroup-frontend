<!--该组件使用 饿了么 tree 实现-->
<template>
  <div>
    <div class="top">
      关键词查询:
      <Select v-model="keyword_type" style="width:200px" @on-change="changeKeyword">
        <Option v-for="items in keywordtype" :value="items.id" :key="items.text">{{ items.text }}</Option>
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
                show-ele vator show-sizer></Page>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
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
        currentKeyId:0,
        keywordtype:{},
        keyword_type:'',
      };
    },
    created() {
      this.getData()
      this.mainKeywordList()
    },
    methods: {
      changeKeyword(key) {
        this.currentKeyId=key
      },
      mainKeywordList() {
        this.apiGet('admin/mainkeyword').then((data) => {
          this.handelResponse(data, (data, msg) => {
            this.keywordtype=data
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
      queryData() {
        this.getData();
      },
      getData() {
        let data = {
          params: {
            page: this.page,
            rows: this.rows,
            mainkeyword_id:this.currentKeyId,
          }
        }
        this.apiGet('admin/mainkeywords', data).then((data) => {
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
        if (this.showIndex) {
          columns.push({
            type: 'index',
            width: 60,
            align: 'center'
          })
        }
        columns.push({
          title: '关键词',
          key: 'keyword',
          sortable: true
        });
        columns.push({
          title: 'A类关键词',
          key: 'mainkeyword_name',
          sortable: true
        });
        columns.push({
          title: '出现次数',
          key: 'count',
          sortable: true
        });
        columns.push({
          title: '时间',
          key: 'create_time',
          sortable: true
        });
        return columns;
      }
    },
    mixins: [http]
  };
</script>

<!--该组件使用 饿了么 tree 实现-->
<template>
  <div>
    <div class="top">
      关键词查询:
      <Input v-model="mainkeyword_name" placeholder="请输入关键词" style="width:300px;"></Input>
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
    <!--<wechatkadd ref="add" :types="wechatKeywordType"></wechatkadd>-->
    <!--<wechatksave ref="save" :form="editinfo" :types="wechatKeywordType"></wechatksave>-->
  </div>
</template>


<script>
  import http from '../../../assets/js/http.js';
  import keywordUpload from './keywordupload.vue';
  import AkeywordAdd from './Akeywordadd.vue';

  export default {
//    components: {keywordUpload, AkeywordAdd},
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
        mainkeyword_name:''
      };
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
      add() {

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
            keyword_id: this.keyword_type
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

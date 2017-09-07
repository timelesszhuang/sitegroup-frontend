<template>
  <div>
    <div class="top">
     事件营销:
      <Input v-model="title" placeholder="营销标题" style="width:120px;"></Input>
      <Select v-model="industry_id" clearable label-in-value
              placeholder="要查询的行业"    style="width:150px;text-align: left">
        <Option v-for="item in industry" :value="item.id" :label="item.name" :key="item">
          {{ item.name }}
        </Option>
      </Select>
      <Input v-model="keyword" placeholder="要查询的关键词" style="width: 120px"></Input>
      <Input v-model="content" placeholder="要查询营销模式内容" style="width: 300px"></Input>
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
    <eventshow ref="show" :form="editinfo"></eventshow>
  </div>
</template>
<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';
  import eventshow from './show.vue';
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
        title: '',
        datas: [],
        editinfo: {},
        industry:[],
        industry_id:'',
        keyword:'',
        content:''
      }
    },
    components: {eventshow},
    created () {
      this.getData();
      this.getIndustry();
    },
    methods: {
      getData() {
        let data = {
          params: {
            page: this.page,
            rows: this.rows,
            title: this.title,
            industry_id:this.industry_id,
            keyword:this.keyword,
            content:this.content
          }
        }
        this.apiGet('admin/Marketingmode', data).then((data) => {
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
      getIndustry(){
        this.apiGet('admin/getIndustry').then((res) => {
          this.handelResponse(res, (data, msg) => {
            this.industry = data;
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (res) => {
          //处理错误信息
          this.$Message.error('网络异常，请稍后重试。');
        });
      },
      show(index){
        let editid = this.datas[index].id
        this.apiGet('admin/Marketingmode/' + editid).then((res) => {
          this.handelResponse(res, (data, msg) => {
            this.editinfo = data
            this.modal = false;
            this.$refs.show.modal = true
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (res) => {
          //处理错误信息
          this.$Message.error('网络异常，请稍后重试。');
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
          title: '标题',
          key: 'title',
          sortable: true
        });
        columns.push({
          title: '行业',
          key: 'industry_name',
          sortable: true
        });
        columns.push({
          title: '关键词',
          key: 'keyword',
          sortable: true
        });
        columns.push({
          title: '阅读次数',
          key: 'readcount',
          sortable: true
        });
        columns.push(
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            fixed: 'right',
            render (row, column, index) {
              return `
            <i-button type="error" size="small" @click="show(${index})">查看</i-button>`;
            }
          }
        );

        return columns;
      }
    },
    mixins: [http]
  }
</script>

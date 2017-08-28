<template>
  <div>
    <div class="top">
      <Input v-model="search" placeholder="名称" style="width:160px;"></Input>
      <Select v-model="detail" style="width:160px;" label-in-value filterable clearable>
        <Option v-for="item in userdefine" :value="item.id" :label="item.detail" :key="item">
          {{ item.detail }}
        </Option>
      </Select>
      <Select v-model="site_id" style="width:300px;" label-in-value filterable clearable>
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
    <info ref="info" :field1="field1" :field2="field2" :field3="field3" :field4="field4" ></info>
  </div>
</template>

<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';
  import info from './info.vue';
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
        field1:'',
        field2:'',
        field3:'',
        field4:'',
        userdefine:[],
        search:'',
        detail:''
      }
    },
    components: {info
    },
    created () {
      this.getData();
      this.getSite((data) => {
        this.site = data
      });
      this.getuserdefine((data) => {
        this.userdefine = data
        console.log(this.userdefine)
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
      getuserdefine(){
        this.apiGet('admin/userdefine').then((res) => {
          this.handelResponse(res, (data, msg) => {
            this.userdefine = data
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (res) => {
          //处理错误信息
          this.$Message.error('网络异常，请稍后重试。');
        })
      },
      getData() {
        let data = {
          params: {
            page: this.page,
            rows: this.rows,
            site_id: this.site_id,
            detail:this.detail,
            search:this.search
          }
        }
        this.apiGet('Rejection', data).then((data) => {
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
      showCheck(index) {
        this.field1=this.datas[index].field1;
        this.field2=this.datas[index].field2;
        this.field3=this.datas[index].field3;
        this.field4=this.datas[index].field4;
        this.$refs.info.modal=true;
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
          title: '字段一',
          key: 'field1',
          sortable: true
        });
        columns.push({
          title: '字段二',
          key: 'field2',
          sortable: true
        });
        columns.push({
          title: '字段三',
          key: 'field3',
          sortable: true
        });
        columns.push({
          title: '字段四',
          key: 'field4',
          sortable: true
        });
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
          title: '时间',
          key: 'create_time',
          sortable: true
        });
        columns.push(
          {
            title: '操作',
            key: 'action',
            align: 'center',
            fixed: 'right',
            render (row, column, index) {
              return `<i-button type="primary" size="small" @click="showCheck(${index})">查看</i-button>`;
            }
          }
        );
        return columns;
      }
    },
    mixins: [http]
  }
</script>

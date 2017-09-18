<template>
  <div>
    <div class="top">
     营销模式:
      <Input v-model="title" placeholder="营销标题" style="width:150px;"></Input>
      <Select v-model="industry_id" clearable label-in-value
              placeholder="要查询的行业"   style="width:150px;text-align: left">
        <Option v-for="item in industry" :value="item.id" :label="item.name" :key="item">
          {{ item.name }}
        </Option>
      </Select>
      <Input v-model="keyword" placeholder="要查询的关键词" style="width: 150px"></Input>
      <Input v-model="content" placeholder="要查询营销模式内容" style="width: 300px"></Input>
      <Button type="primary" @click="queryData">查询</Button>
      <Button type="success" @click="add">添加</Button>
    </div>
    <div class="content" style="margin-top:10px;">
      <Table :context="self" :border="border" :stripe="stripe" :show-header="showheader"
             :size="size" :data="datas" :columns="tableColumns" style="width: 100%">
      </Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="total" :current="current" @on-change="changePage" @on-page-size-change="changePageSize"
                show-total
                show-elevator ></Page>
        </div>
      </div>
    </div>
    <marketingadd ref="add" :industry="industry"></marketingadd>
    <marketingsave ref="save" :industry="industry" :form="editinfo"></marketingsave>
    <eventshow ref="show" :form="editinfo"></eventshow>
  </div>
</template>
<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';
  import marketingadd from './add.vue';
  import marketingsave from './save.vue';
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
        content:'',
        keyword:''
      }
    },
    components: {marketingadd,marketingsave,eventshow},
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
            content:this.content,
            keyword:this.keyword
          }
        }
        this.apiGet('sys/Marketingmode', data).then((data) => {
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
        this.apiGet('industry/getIndustry').then((res) => {
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
        this.apiGet('sys/Marketingmode/' + editid).then((res) => {
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
      add(){
        this.$refs.add.modal = true
      },
      edit(index){
        let editid = this.datas[index].id
        this.apiGet('sys/Marketingmode/' + editid).then((res) => {
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
      remove(index){
        //需要删除确认
        let id = this.datas[index].id
        let _this = this
        this.$Modal.confirm({
          title: '确认删除',
          content: '您确定删除该记录?',
          okText: '删除',
          cancelText: '取消',
          onOk: (index) => {
            _this.apiDelete('sys/Marketingmode/', id).then((res) => {
              _this.handelResponse(res, (data, msg) => {
                _this.getData()
                _this.$Message.success(msg);
              }, (data, msg) => {
                _this.$Message.error(msg);
              })
            }, (res) => {
              //处理错误信息
              _this.$Message.error('网络异常，请稍后重试');
            })
          },
          onCancel: () => {
            return false
          }
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
            align: 'center',
            fixed: 'right',
            render (row, column, index) {
              return `<i-button type="primary" size="small" @click="edit(${index})">修改</i-button>
            <i-button type="error" size="small" @click="remove(${index})">删除</i-button>
<i-button type="error" size="small" @click="show(${index})">查看</i-button>
`;
            }
          }
        );
        return columns;
      }
    },
    mixins: [http]
  }
</script>

<template>
  <div>
    <div style="margin: 10px">
      公司名：
      <Input v-model="name" placeholder="要查询的公司名" style="width: 300px"></Input>
      <Select v-model="industry_id" clearable label-in-value
              style="width:150px;text-align: left">
        <Option v-for="item in industry" :value="item.id" :label="item.name" :key="item">
          {{ item.name }}
        </Option>
      </Select>
      <Button type="primary" icon="ios-search" @click="queryData">搜索</Button>
      <Button type="success" shape="circle" icon="plus" @click="add">添加公司</Button>
    </div>
    <Table :context="self" :border="border" :stripe="stripe" :show-header="showheader"
           :size="size" :data="companylist" :columns="tableColumns3" style="width: 100%">
    </Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="total" :current="current" @on-change="changePage" show-total
              show-elevator></Page>
      </div>
    </div>
    <!--用户添加操作-->
    <Useradd ref="add" :industry="industry"></Useradd>
    <Useredit ref="edit" :form="editinfo" :industry="industry"></Useredit>
  </div>
</template>
<script>
  import http from '../../../assets/js/http.js';
  import Useradd from './companyadd.vue';
  import Useredit from './companyedit.vue';
  export default {
    data () {
      return {
        self: this,
        border: true,
        stripe: true,
        showheader: true,
        size: 'small',
        total: 0,
        current: 1,
        pagesize: 10,
        name: '',
        companylist: [],
        usertype: 'all',
        editinfo: {},
        industry: [],
        industry_id: ''
      }
    },
    components: {Useradd, Useredit},
    created () {
      this.getData();
      this.getIndustry();
    },
    methods: {
      getIndustry(){
        this.apiGet('industry/getIndustry').then((res) => {
          this.handelResponse(res, (data, msg) => {
            this.industry = data;
          }, (data, msg) => {
            this.$Message.error('没有获取到');
          })
        }, (res) => {
          //处理错误信息
          this.$Message.error('网络异常，请稍后重试。');
        });
      },
      //获取数据
      getData(){
        let data = {
          params: {
            'page': this.current,
            'rows': this.pagesize,
            'name': this.name,
            'industry_id': this.industry_id
          }
        };
        this.apiGet('company', data).then((data) => {
          this.handelResponse(data, (data, msg) => {
//            console.log(data)
            this.companylist = data.rows
            this.total = data.total;
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (data) => {
          this.$Message.error('网络异常，请稍后重试');
        })
      },
      queryData(){
        this.getData();
      },
      changePage(page){
        this.current = page;
        this.getData();
      },
      changePageSize(pagesize){
        this.pagesize = pagesize
        this.getData()
      },
      add(){
        this.$refs.add.modal = true
      },
      edit(index){
        //　需要删除确认
        //　获取资源信息
        let editid = this.companylist[index].id
        this.apiGet('company/' + editid).then((res) => {
          this.handelResponse(res, (data, msg) => {
            delete  data.create_time;
            this.editinfo = data
            this.modal = false;
            this.$refs.edit.modal = true
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (res) => {
          //处理错误信息
          this.$Message.error('网络异常，请稍后重试。');
        })
      },
      remove (index) {
        //需要删除确认
        let id = this.companylist[index].id
        let _this = this
        this.$Modal.confirm({
          title: '确认删除',
          content: '您确定删除该记录?',
          okText: '删除',
          cancelText: '取消',
          onOk: (index) => {
            _this.apiDelete('company/' + id).then((res) => {
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
      },
    }
    ,
    computed: {
      tableColumns3()
      {
        let columns = [
          {
            type: 'index', width: 60, align: 'center'
          },
          {
            title: '公司名', key: 'name', sortable: true
          },
          {
            title: '公司简称', key: 'short_name'
          },
          {
            title: '行业', key: 'industry_name',
          },
          {
            title: 'url', key: 'url',
          },
          {
            title: '法人', key: 'artificialperson',
          },
          {
            title: '主营', key: 'manbusiness',
          },

          {
            title: '添加时间', key: 'create_time',
          }
        ];
        columns.push(
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            fixed: 'right',
            render (row, column, index) {
              return `<i-button type="primary" size="small" @click="edit(${index})">修改</i-button>   <i-button type="error" size="small" @click="remove(${index})">删除</i-button>`;
            }
          }
        );
        return columns;
      }
    },
    mixins: [http]
  }


</script>

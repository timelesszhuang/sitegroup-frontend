<template>
  <div>
    <div class="top">
     企业号关键词管理:
      <Input v-model="name" placeholder="请输入关键词" style="width:300px;"></Input>
      <Select v-model="keyword_typename"  style="width: 200px;" label-in-value filterable clearable >
        <Option v-for="item in wechatKeywordType" :value="item.id" :label="item.text" :key="item">
          {{ item.text }}
        </Option>
      </Select>
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
                show-ele vator show-sizer></Page>
        </div>
      </div>
    </div>
    <wechatkadd ref="add" :types="wechatKeywordType"></wechatkadd>
    <wechatksave ref="save" :form="editinfo" :types="wechatKeywordType"></wechatksave>
  </div>
</template>

<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';
  import wechatkadd from './add.vue';
  import wechatksave from './save.vue';
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
        editinfo: {},
        wechatKeywordType:{},
        keyword_typename:""
      }
    },
    components: {wechatkadd,wechatksave},
    methods: {
      init(){
        this.getData();
        this.getTypes();
      },
      getTypes() {
        this.apiPost('sys/getKeyTypeList').then((data) => {
          this.handelResponse(data, (data, msg) => {
                this.wechatKeywordType=data
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (data) => {
          this.$Message.error('网络异常，请稍后重试');
        })
      },
      getData() {
        let data = {
          params: {
            page: this.page,
            rows: this.rows,
            name: this.name,
            keyword_typename:this.keyword_typename
          }
        }
        this.apiGet('sys/getKeyword', data).then((data) => {
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
        this.apiGet('sys/gettype/' + editid).then((res) => {
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
      scrapyStatus(index, scrapystatus){
        //需要删除确认
        let id = this.datas[index].id
        let _this = this
        let data = {
          'scrapystatus': scrapystatus,
          id: id
        }
        if (data.scrapystatus == 20) {
          this.$Modal.confirm({
            title: '停止爬取',
            content: '您确定停止爬取?',
            okText: '停止爬取',
            cancelText: '取消',
            onOk: (index) => {
              _this.apiGet('sys/stopScrapy/'+id, data).then((res) => {
                _this.handelResponse(res, (data, msg) => {
                  _this.getData();
                  _this.$Message.success(msg);
                }, (data, msg) => {
                  _this.$Message.error(msg);
                })
              }, (res) => {
                //处理错误信息
                _this.$Message.error('网络异常，请稍后重试。');
              })
            },
            onCancel: () => {
              return false
            }
          })
        } else if (data.scrapystatus == 10) {
          this.$Modal.confirm({
            title: '确认爬取',
            content: '您确定正常爬取?',
            okText: '确认',
            cancelText: '取消',
            onOk: (index) => {
              _this.apiGet('sys/startScrapy/'+id, data).then((res) => {
                _this.handelResponse(res, (data, msg) => {
                  _this.getData();
                  _this.$Message.success(msg);
                }, (data, msg) => {
                  _this.$Message.error(msg);
                })
              }, (res) => {
                //处理错误信息
                _this.$Message.error('网络异常，请稍后重试。');
              })
            },
            onCancel: () => {
              return false
            }
          })
        }
      },
      changeStatus(index, status){
        //需要删除确认
        let id = this.datas[index].id
        let _this = this
        let data = {
          'status': status,
          id: id
        }
        if (data.status == 20) {
          this.$Modal.confirm({
            title: '取消审核权限',
            content: '您确定取消?',
            okText: '确定',
            cancelText: '取消',
            onOk: (index) => {
              _this.apiGet('sys/stopStatus/'+id, data).then((res) => {
                _this.handelResponse(res, (data, msg) => {
                  _this.getData();
                  _this.$Message.success(msg);
                }, (data, msg) => {
                  _this.$Message.error(msg);
                })
              }, (res) => {
                //处理错误信息
                _this.$Message.error('网络异常，请稍后重试。');
              })
            },
            onCancel: () => {
              return false
            }
          })
        } else if (data.status == 10) {
          this.$Modal.confirm({
            title: '确认通过审核',
            content: '您确定通过审核?',
            okText: '确认',
            cancelText: '取消',
            onOk: (index) => {
              _this.apiGet('sys/startStatus/'+id, data).then((res) => {
                _this.handelResponse(res, (data, msg) => {
                  _this.getData();
                  _this.$Message.success(msg);
                }, (data, msg) => {
                  _this.$Message.error(msg);
                })
              }, (res) => {
                //处理错误信息
                _this.$Message.error('网络异常，请稍后重试。');
              })
            },
            onCancel: () => {
              return false
            }
          })
        }
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
          title: '关键词',
          key: 'name',
          sortable: true
        });
        columns.push({
          title: '分类',
          key: 'type_name',
          sortable: true
        });
        columns.push({
          title: '审核状态',
          align: 'center',
          render(row,index){
            if(row.status==10){
              var type = `<Icon type="checkmark-round" style="color:#2db7f5;font-size: 18px"></Icon>`;
              return type;
            }else{
              var type = `<Icon type="close-round" style="color:red;font-size: 18px"></Icon>`;
              return type;
            }

          },
          sortable: true
        });
        columns.push({
          title: '爬取状态',
          align: 'center',
          render(row,index){
            if(row.scrapystatus==10){
              var type = `<Icon type="checkmark-round" style="color:#2db7f5;font-size: 18px"></Icon>`;
              return type;
            }else{
              var type = `<Icon type="close-round" style="color:red;font-size: 18px"></Icon>`;
              return type;
            }

          },
          sortable: true
        });
        columns.push(
          {
            title: '操作',
            key: 'action',
//            width: 150,
            align: 'center',
            fixed: 'right',
            render (row, column, index) {
              var btn1 = `<i-button type="error" size="small" @click="scrapyStatus(${index},'20')">停止爬取</i-button>`;
                var btn = `<i-button type="primary" size="small" @click="changeStatus(${index},'10')">通过审核</i-button>`;
              if (row.status == '10') {
                //20 表示禁用 按钮应该为启用
                btn = `<i-button type="error" size="small" @click="changeStatus(${index},'20')">否决审核</i-button>`;
              }
              if(row.scrapystatus=='20'){
                btn1 = `<i-button type="error" size="small" @click="scrapyStatus(${index},'10')">正常爬取</i-button>`;
              }
              return `<i-button type="success" size="small" @click="edit(${index})">修改</i-button>&nbsp; &nbsp;` + btn+'&nbsp;&nbsp;'+btn1;
            }
          }
        );
        return columns;
      }
    },
    mixins: [http]
  }
</script>

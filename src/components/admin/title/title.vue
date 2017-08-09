<template>
  <!--该文件是段落的 标题-->
  <div>
    <div class="top">
      标题:
      <Input v-model="title" placeholder="标题" style="width:300px;"></Input>
      <Select v-model="article_type" style="width:300px;"
              label-in-value filterable clearable>
        <Option v-for="item in articletypelist" :value="item.id" :label="item.name" :key="item">
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
                show-elevator show-sizer>
          </Page>
        </div>
      </div>
    </div>
    <titleadd ref="add" :articletype="articletypelist"></titleadd>
    <titlesave ref="save" :form="editinfo" :articletype="articletypelist"></titlesave>
    <titleshow ref="show" :form="editinfo"></titleshow>
  </div>
</template>

<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';
  import common from '../../../assets/js/common.js';
  import titleadd from './titleAdd.vue';
  import titlesave from './titleSave.vue';
  import titleshow from './titleshow.vue';
  export default {
    data () {
      return {
        self: this,
        border: true,
        stripe: true,
        showheader: true,
        showIndex: true,
        article_type: 0,
        size: 'small',
        total: 0,
        page: 1,
        current: 1,
        rows: 10,
        title: '',
        datas: [],
        editinfo: {},
        articletypelist: []
      }
    },
    components: {titleadd, titlesave, titleshow},
    created () {
      this.getScaType((data) => {
        this.articletypelist = data
      });
      this.getData();
    },
    methods: {
      getData() {
        let data = {
          params: {
            page: this.page,
            rows: this.rows,
            title: this.title,
            article_type: this.article_type
          }
        }
        this.apiGet('scatteredTitle', data).then((data) => {
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
        this.apiGet('scatteredTitle/' + editid).then((res) => {
          this.handelResponse(res, (data, msg) => {
            delete  data.create_time;
            delete  data.update_time;
            this.editinfo = data
            this.modal = false;
            this.$refs.save.modal = true
            this.$refs.save.clearTiTleType
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (res) => {
          //处理错误信息
          this.$Message.error('网络异常，请稍后重试。');
        })
      },
      show(index){
        //获取单条数据
        let editid = this.datas[index].id
        this.apiGet('scatteredTitle/getArrticleJoinTitle?id=' + editid).then((res) => {
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
            _this.apiDelete('scatteredTitle/', id).then((res) => {
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
          title: '所属分类',
          key: 'articletype_name'
        });
        columns.push({
          title: '时间',
          key: 'create_time'
        });
        columns.push(
          {
            title: '操作',
            key: 'action',
            align: 'center',
            fixed: 'right',
            render (row, column, index) {
              return `<i-button type="primary" size="small" @click="edit(${index})">修改</i-button> <i-button type="info" size="small" @click="show(${index})">查看</i-button> <i-button type="error" size="small" @click="remove(${index})">删除</i-button>`;
            }
          }
        );
        return columns;
      }
    },
    mixins: [http, common]
  }
</script>

<template>
  <div>
    <div class="top">
      活动:
      <Input v-model="title" placeholder="请输入活动名" style="width:300px;"></Input>
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
                show-elevator show-sizer></Page>
        </div>
      </div>
    </div>
    <activityadd ref="add"></activityadd>
<!--    <activitysave ref="save" :form="editinfo"></activitysave>
    <activityshow ref="show" :form="editinfo"></activityshow>-->
  </div>

</template>

<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';
  import common from '../../../assets/js/common.js';
  import activityadd from './activityadd.vue';
  import activitysave from './save.vue';
  import activityshow from './show.vue';

  export default {
    data () {
      return {
        self: this,
        border: true,
        stripe: true,
        current: 1,
        showheader: true,
        showIndex: true,
        size: 'small',
        total: 0,
        page: 1,
        rows: 10,
        title: '',
        activity_type: 0,
        datas: [],
        editinfo: {},
        activitytypelist: []
      }
    },
    components: {activityadd, activitysave, activityshow},
    created () {
      this.getData();
      this.getArticleType((data) => {
        this.articletypelist = data
      });
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
        this.apiGet('activity', data).then((data) => {
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
        this.$refs.save.modal = true
      },
      show(index){
        this.getArticle(activity);
        this.$refs.show.modal = true
      },
      remove(index){
        //需要删除确认
        let id = this.datas[activity].id
        let _this = this
        this.$Modal.confirm({
          title: '确认删除',
          content: '您确定删除该记录?',
          okText: '删除',
          cancelText: '取消',
          onOk: (index) => {
            _this.apiDelete('activity/', id).then((res) => {
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
          title: '分类名称',
          key: 'activitytype_name',
          sortable: true
        });
        columns.push({
          title: '作者',
          key: 'auther',
          sortable: true
        });
        columns.push(
          {
            title: '操作',
            key: 'action',
            align: 'center',
            fixed: 'right',
            render (row, column, index) {
              return `<i-button type="primary" size="small" @click="edit(${activity})">修改</i-button>
                      <i-button type="info" size="small" @click="show(${activity})">预览</i-button>
                      <i-button type="error" size="small" @click="remove(${activity})">删除</i-button>`;
            }
          }
        );
        return columns;
      }
    },
    mixins: [http, common]
  }

</script>
<style>


</style>

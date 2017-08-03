<template>
  <div>
    <div class="top">
      查询:
      <Input v-model="content" placeholder="问答" style="width:300px;"></Input>
      文章分类:
      <Select v-model="article_type" style="width: 250px;"
              label-in-value filterable clearable>
        <Option disabled :value="0"><span style="font-size: 15px;font-weight: bold">分类名—标签</span></Option>
        <Option v-for="item in articletypelist" :value="item.id" :label="item.name" :key="item">
          {{ item.name }}—{{item.tag}}
        </Option>
      </Select>
      <Button type="primary" @click="queryData">查询分段</Button>
      <Button type="success" @click="add">添加分段</Button>
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
    <scatteredarticleadd ref="add" :articleTypeList="articletypelist"></scatteredarticleadd>
    <scatteredarticlesave ref="save" :form="editinfo" :articleTypeList="articletypelist"></scatteredarticlesave>
  </div>
</template>

<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';
  import common from '../../../assets/js/common.js';
  import scatteredarticleadd from './scatteredarticleadd.vue';
  import scatteredarticlesave from './scatteredarticlesave.vue';
  export default {
    data () {
      return {
        self: this,
        border: true,
        stripe: true,
        showheader: true,
        article_type: 0,
        showIndex: true,
        size: 'small',
        current: 1,
        total: 0,
        page: 1,
        rows: 10,
        content: '',
        datas: [],
        editinfo: {},
        articletypelist: [],
      }
    },
    components: {scatteredarticleadd, scatteredarticlesave},
    created () {
      // 获取文章分类
      this.getArticleType((data) => {
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
            content: this.content,
            article_type: this.article_type
          }
        }
        this.apiGet('scatteredArticle', data).then((data) => {
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
        this.apiGet('scatteredArticle/' + editid).then((res) => {
          this.handelResponse(res, (data, msg) => {
            delete  data.create_time;
            delete  data.update_time;
            this.editinfo = data
            this.modal = false;
            this.$refs.save.clearTitleType
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
            _this.apiDelete('scatteredArticle/', id).then((res) => {
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
          title: '内容',
          key: 'content_paragraph',
          sortable: true
        });
        columns.push({
          title: '所属分类',
          width: 120,
          key: 'articletype_name',
          sortable: true
        });
        columns.push({
          title: '添加时间',
          width: 150,
          key: 'create_time'
        });
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
    mixins: [http, common]
  }
</script>

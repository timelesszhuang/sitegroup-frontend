<template>
  <div>
    <div class="top">
      查询:
      <Input v-model="name" placeholder="分类" style="width:300px;"></Input>
      <Button type="primary" @click="queryData">查询分类</Button>
      <Button type="success" @click="add">添加分类</Button>
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
    <scatteredtypeadd ref="add" :articleTypeList="articletypelist"></scatteredtypeadd>
    <scatteredtypesave ref="save" :form="editinfo" :articleTypeList="articletypelist"></scatteredtypesave>
  </div>
</template>

<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';
  import common from '../../../assets/js/common.js';
  import scatteredtypeadd from './add.vue';
  import scatteredtypesave from './save.vue';
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
        name: '',
        datas: [],
        editinfo: {},
        articletypelist: [],
      }
    },
    components: {scatteredtypeadd,scatteredtypesave},
    created () {
      // 获取文章分类
      this.getArticleType((data) => {
        this.articletypelist = data
      });
//      this.getData();
    },
    methods: {
      getData() {
        let data = {
          params: {
            page: this.page,
            rows: this.rows,
            name: this.name,
          }
        }
        this.apiGet('sca/all', data).then((data) => {
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
        this.apiGet('sca/all/' + editid).then((res) => {
          this.handelResponse(res, (data, msg) => {
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
          title: '分类名',
          key: 'name',
          sortable: true
        });
        columns.push({
          title: '描述',
          key: 'detail',
          sortable: true
        });
        columns.push({
          title: '添加时间',
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
              return `<i-button type="primary" size="small" @click="edit(${index})">修改</i-button>`;
            }
          }
        );
        return columns;
      }
    },
    mixins: [http, common]
  }
</script>

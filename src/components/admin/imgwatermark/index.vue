<template>
  <div>
    <div class="top" style="padding-left: 10px">
      <Button type="success" @click="add">添加</Button>
    </div>
    <div class="content" style="margin-top:10px;margin-left: 5px;margin-right: 5px">
      <Table :context="self" :border="border" :stripe="stripe" :show-header="showheader"
             :size="size" :data="datas" :columns="tableColumns" style="width: 100%">
      </Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="total" :current="current" @on-change="changePage" @on-page-size-change="changePageSize"
                show-total
                show-elevator >
          </Page>
        </div>
      </div>
    </div>
    <imgadd ref="add"></imgadd>
    <imgsave ref="save" :form="editinfo"></imgsave>
  </div>
</template>

<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';
  import imgadd from './add.vue';
  import imgsave from './save.vue';
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
        editinfo: {}
      }
    },
    components: {imgadd, imgsave},
    methods: {
      init() {
        this.getData();
      },
      getData() {
        let data = {
          params: {
            page: this.page,
            rows: this.rows,
            name: this.name
          }
        }
        this.apiGet('admin/siteWaterImage', data).then((data) => {
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
        this.apiGet('admin/siteWaterImage/' + editid).then((res) => {
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
    },
    computed: {
      tableColumns()
      {
        let _this=this
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
          title: '水印图片',
          sortable: true,
          render(h, params) {
            return h('img', {
              attrs: {
                src: params.row.oss_water_image_path,
                title: params.row.detail,
                style: 'max-height: 250px'
              },
            })
          },
        });
        columns.push({
          width:'100',
          title: '图片水印名字',
          key: 'name',
          sortable: true
        });
        columns.push({
          width:'200',
          title: '图片水印信息',
          key: 'detail',
          sortable: true
        });
        columns.push(
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            fixed: 'right',
            render(h, params) {
              return h('div', [
                h('Button', {
                  props: {
                    size: 'small'
                  },
                  attrs: {
                    type: 'primary'
                  },
                  on: {
                    click: function () {
                      //不知道为什么这个地方不是我需要的this
                      _this.edit(params.index)
                    }
                  }
                }, '修改')
              ]);
            }

          }
        );
        return columns;
      }
    },
    mixins: [http]
  }
</script>

<template>
  <div>
    <div class="top">
      分类名:
      <Input v-model="name" placeholder="产品名" style="width:300px;"></Input>
      <Select v-model="type_id" style="width:200px"
              label-in-value  filterable clearable  placeholder="根据分类查询"  >
        <Option-group  v-for="(item,index) in ptype" :label="index" :key="item">
          <Option v-for="items in item"  :value="items.id" :label="items.name" :key="index">{{ items.name }}</Option>
        </Option-group>
      </Select>
      <Button type="primary" @click="queryData">查询</Button>
      <Button type="success" @click="add">添加</Button>
    </div>
    <div>
    </div>
    <div class="content" style="margin-top:10px;">
      <Table :context="self" :border="border" :stripe="stripe" :show-header="showheader"
             :size="size" :data="datas" :columns="tableColumns" style="width: 100%">
      </Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="total" :current="current" @on-change="changePage" @on-page-size-change="changePageSize"
                show-total
                show-elevator>
          </Page>
        </div>
      </div>
    </div>
    <padd ref="add" :ptype="ptype"></padd>
    <psave ref="save" :ptype="ptype" :form="editinfo"></psave>
    <editimg ref="editimg" :form="imginfo"></editimg>
    <showhtml ref="showhtml" :form="showhtmldata"></showhtml>
  </div>
</template>

<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';
  import padd from './add.vue';
  import psave from './save.vue';
  import editimg from './editimg.vue';
  import showhtml from './showhtml.vue'


  export default {
    data() {
      return {
        action: HOST + 'admin/uploadProductSerImg',
        self: this,
        border: true,
        stripe: true,
        showheader: true,
        showIndex: false,
        size: 'small',
        current: 1,
        total: 0,
        page: 1,
        rows: 10,
        name: '',
        datas: [],
        editinfo: {},
        imginfo: {},
        ptype: [],
        type_id: '',
        showhtmldata: []
      }
    },
    components: {padd, psave, editimg, showhtml},
    created() {
      this.getData();
      this.getproducttype()
    },
    methods: {
      getData() {
        let data = {
          params: {
            page: this.page,
            rows: this.rows,
            name: this.name,
            type_id: this.type_id
          }
        }
        this.apiGet('admin/product', data).then((data) => {
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
      changePage(page) {
        this.page = page;
        this.getData();
      },
      changePageSize(pagesize) {
        this.rows = pagesize;
        this.getData();
      },
      queryData() {
        this.getData();
      },
      getproducttype(func) {
        this.apiGet('admin/getProductType').then((res) => {
          this.handelResponse(res, (data, msg) => {
            this.ptype = data;
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (res) => {
          //处理错误信息
          this.$Message.error('网络异常，请稍后重试。');
        });
      },
      add() {
        this.$refs.add.modal = true
      },
      showhtml(index) {
        let data = this.datas[index]
        this.apiPost('productshowhtml', data).then((res) => {
          this.handelResponse(res, (data, msg) => {
            if (data.length == 1) {
              window.open(data[0].url);
            } else {
              this.showhtmldata = data;
              this.$refs.showhtml.modal = true
            }
            this.modal = false;
          }, (data, msg) => {
            this.modal_loading = false;
            this.$Message.error(msg);
          })
        }, (res) => {
          //处理错误信息
          this.modal_loading = false;
          this.$Message.error('网络异常，请稍后重试。');
        })
      },
      edit(index) {
        let editid = this.datas[index].id
        this.apiGet('admin/product/' + editid).then((res) => {
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
      editimg(index) {
        let editid = this.datas[index].id
        this.apiGet('admin/getProductImgList/' + editid).then((res) => {
          this.handelResponse(res, (data, msg) => {
            this.imginfo = data
            if (data.imglist && data.imglist.length) {
              this.$refs.editimg.is_show = true;
            } else {
              this.$refs.editimg.is_show = false;
            }
            this.$refs.editimg.img = '';
            this.$refs.editimg.modal = true
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
      tableColumns() {
        let columns = [];
        let _this = this
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
          title: '缩略图',
          width: '200',
          key: 'base64',
          sortable: true,
          render(h, params) {
            return h('img', {
              attrs: {
                src: params.row.image,
                title: params.row.name,
                style: 'max-width: 190px;max-height: 150px'
              },
            })
          },
        });
        columns.push({
          width: '150',
          title: '编号',
          key: 'sn',
        });

        columns.push({
          title: '产品名称',
          key: 'name',
          sortable: true
        });
        columns.push({
          title: '所属分类',
          key: 'type_name',
          sortable: true
        });
        columns.push({
          title: '收费方式',
          key: 'payway',
          sortable: true
        });
        columns.push(
          {
            title: '操作',
            key: 'action',
            width: 250,
            align: 'center',
            fixed: 'right',
            render(h, params) {
              return h('div', [
                h('Button', {
                  props: {
                    size: 'small'
                  },
                  attrs: {
                    type: 'default'
                  },
                  on: {
                    click: function () {
                      //不知道为什么这个地方不是我需要的this
                      _this.edit(params.index)
                    }
                  }
                }, '修改'),
                h('Button', {
                  props: {
                    size: 'small'
                  },
                  attrs: {
                    type: 'primary',
                    style: 'margin-left:3px',
                  },
                  on: {
                    click: function () {
                      //不知道为什么这个地方不是我需要的this
                      _this.editimg(params.index)
                    }
                  }
                }, '修改产品图集'),
                h('Button', {
                  props: {
                    size: 'small'
                  },
                  attrs: {
                    type: 'info',
                    style: 'margin-left:3px',
                  },
                  on: {
                    click: function () {
                      //不知道为什么这个地方不是我需要的this
                      _this.showhtml(params.index)
                    }
                  }
                }, '页面预览'),
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

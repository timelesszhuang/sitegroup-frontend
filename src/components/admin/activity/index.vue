<template>
  <div>
    <div class="top">
      活动标题名:
      <Input v-model="title" placeholder="活动名" style="width:300px;"></Input>
      <Button type="primary" @click="queryData">查询</Button>
      <Button type="success" @click="add">添加活动</Button>
      <Button type="success" @click="urladd">添加链接活动</Button>
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
    <Alert type="success" show-icon>
      说明:
      <span slot="desc">活动创意部分支持站内活动跟链接活动，链接活动选择添加链接活动，添加需要链接到的网址。 </span>
    </Alert>
    <padd ref="add"></padd>
    <psave ref="save" :form="editinfo"></psave>
    <urladd ref="urladd"></urladd>
    <urlsave ref="urlsave" :form="editinfo"></urlsave>
    <editimg ref="editimg" :form="imginfo"></editimg>
  </div>
</template>

<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';
  import padd from './add.vue';
  import psave from './save.vue';
  import urladd from './urladd.vue';
  import urlsave from './urlsave.vue';
  import editimg from './editimg.vue';


  export default {
    data() {
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
        imginfo: {},
        showhtmldata: []
      }
    },
    components: {padd, psave, editimg, urladd, urlsave},
    created() {
      this.getData();
    },
    methods: {
      getData() {
        let data = {
          params: {
            page: this.page,
            rows: this.rows,
            title: this.name,
          }
        }
        this.apiGet('admin/activityabout', data).then((data) => {
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
      add() {
        this.$refs.add.modal = true
      },
      urladd() {
        this.$refs.urladd.modal = true
      },
      edit(index) {
        let editid = this.datas[index].id
        this.apiGet('admin/activityabout/' + editid).then((res) => {
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
      urledit(index) {
        let editid = this.datas[index].id
        this.apiGet('admin/activityabout/' + editid).then((res) => {
          this.handelResponse(res, (data, msg) => {
            this.editinfo = data
            this.modal = false;
            this.$refs.urlsave.modal = true
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (res) => {
          //处理错误信息
          this.$Message.error('网络异常，请稍后重试。');
        })
      },
      start(index) {
        let editid = this.datas[index].id
        let _this = this
        this.$Modal.confirm({
          title: '确认',
          content: '您确定启用',
          okText: '确认',
          cancelText: '取消',
          onOk: () => {
            _this.apiGet('admin/changeactivityStatus/' + editid + "/10").then((res) => {
              _this.handelResponse(res, (data, msg) => {
                _this.getData()
                _this.$Message.success(msg);
              }, (data, msg) => {
                _this.modal_loading = false;
                _this.$Message.error(msg, 5);
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
      stop(index) {
        let editid = this.datas[index].id
        let _this = this
        this.$Modal.confirm({
          title: '确认',
          content: '您确定禁用',
          okText: '确认',
          cancelText: '取消',
          onOk: () => {
            _this.apiGet('admin/changeactivityStatus/' + editid + "/20").then((res) => {
              _this.handelResponse(res, (data, msg) => {
                _this.getData()
                _this.$Message.success(msg);
              }, (data, msg) => {
                _this.modal_loading = false;
                _this.$Message.error(msg, 5);
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
      editimg(index) {
        let editid = this.datas[index].id
        this.apiGet('admin/getImgSer/' + editid).then((res) => {
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
          title: '活动图',
          width: '200',
          sortable: true,
          render(row, index) {
            var type = ' <img  style="max-width:190px;max-height: 150px;padding:5px"  src="' + row.oss_img_src + '" alt="">';
            return type;
          },
        });
        columns.push({
          title: '标题',
          key: 'title',
          render(row, index) {
            if (row.url) {
              return ' <a href="' + row.url + '"  alt="">' + row.title + '</a>';
            }
            return row.title;
          },
        });
        columns.push(
          {
            title: '操作',
            key: 'action',
            width: 350,
            align: 'center',
            fixed: 'right',
            render(row, column, index) {
              return `<i-button v-if="row.url" type="primary" size="small" @click="urledit(${index})">修改</i-button>
                      <i-button v-if="!row.url" type="primary" size="small" @click="edit(${index})">修改</i-button>
                      <i-button type="info" size="small" @click="editimg(${index})">修改活动轮播图</i-button>
                      <i-button v-if="row.status == 20" type="primary" size="small" @click="start(${index})">启用</i-button>
                       <i-button v-if="row.status == 10" type="error" size="small" @click="stop(${index})">禁用</i-button>
&nbsp;&nbsp;`;
            }
          }
        );
        return columns;
      }
    },
    mixins: [http]
  }
</script>

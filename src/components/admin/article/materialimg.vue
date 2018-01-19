<template>
  <div>
    <Modal
      v-model="modal"
      width="900"
      :styles="{top: '80px'}"
    >
      <p slot="header">
        <span>选择图片</span>
      </p>
      <div class="top">
        分类:
        <Select v-model="type" style="width:200px"
                label-in-value  filterable clearable   >
          <Option value="article">文章</Option>
          <Option value="product">产品</Option>
          <Option value="question">问答</Option>
          <Option value="selfadd">添加</Option>
        </Select>
        标签:
        <Select v-model="tag_id" style="width:200px"
                label-in-value  filterable clearable   >
          <Option-group  v-for="(item,index) in tagname" :label="index" :key="item">
            <Option v-for="(items,indexs) in item"  :value="indexs" :label="items" :key="index">{{ items }}</Option>
          </Option-group>
        </Select>
        <Button type="primary" @click="queryData">查询</Button>
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

    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js'
  import common from '../../../assets/js/common.js'


  export default {
    data() {
      return {
        modal: false,
        self: this,
        border: true,
        stripe: true,
        showheader: true,
        showIndex: true,
        size: 'small',
        message: 'copy data',
        current: 1,
        total: 0,
        page: 1,
        rows: 10,
        type: '',
        datas: [],
        articletypelist: [],
        tagname:[],
        tag_id:0,
        clickTimeId:0,
        img:''

      }
    },
    created() {
      // this.getData(img);
      this.gettag();
      this.getArticleType((data) => {
        this.articletypelist = data
      });
      this.gettag();
    },
    methods: {
      //@click="dan" @dblclick="shuang"
      dan:function(){
        clearTimeout(this.clickTimeId);
        this.clickTimeId = setTimeout(function() {
          console.log("鼠标单击");
        }, 250);
      },
      shuang:function(){
        clearTimeout(this.clickTimeId);
        console.log("鼠标双击");
      },


      doCopy: function (index) {
        this.$copyText(this.datas[index].imgsrc).then(function (e) {
        }, function (e) {
        })
      },
      getData(img) {
        this.img = img
        //console.log(img)
        let data = {
          params: {
            page: this.page,
            rows: this.rows,
            type:this.type,
            tag_id:this.tag_id
          }
        }
        this.apiGet('admin/libraryimgset', data).then((data) => {
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
      changeTitle(){
        this.page = 1
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
      xuanze(index){
        let editsrc = this.datas[index].imgsrc
        this.$parent.getsrc(editsrc)
        this.modal = false
      },
      gettag() {
        let data = {
        }
        this.apiPost('admin/gettags', data).then((res) => {
          this.handelResponse(res, (data, msg) => {
            this.tagname = data
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

        columns.push({
          title: '缩略图',
          key: 'imgsrc',
          width:'180px',
          render(h, params) {
            if (params.row.imgsrc) {
              return h('img', {
                attrs: {
                  src: params.row.imgsrc,
                  title: params.row.title,
                  style: 'max-width:150px;'
                },
              })
            }
            return '';
          },
        });
        columns.push({
          title: '描述',
          key: 'alt',
          width:"300px",
        });
        columns.push({
          title: '分类',
          key: 'comefrom',
          render(h, params) {
            if (params.row.comefrom) {
              let type = params.row.comefrom;
              if(type == 'article'){
                return '文章'
              }
              if(type == 'quesrtion'){
                return '问答'
              }
              if(type == 'product'){
                return '产品'
              }
              if(type == 'other'){
                return '其他'
              }//类型 article 文章 quesrtion 问答 product 产品 other 其他
            }
            return '';
          },
        });
        columns.push({
          title: '发布时间',
          key: 'create_time',
          sortable: true
        });
        columns.push(
          {
            title: '操作',
            key: 'action',
            align: 'center',
            fixed: 'right',
            render(h, params) {
              return h('div', [

                h('Button', {
                  props: {
                    size: 'small'
                  },
                  attrs: {
                    type: 'primary',style: 'margin-left:3px',
                  },
                  on: {
                    click: function () {
                      //不知道为什么这个地方不是我需要的this
                      _this.xuanze(params.index)
                    }
                  }
                }, '选择图片')
              ]);
            }

          }
        );
        return columns;
      }
    },
    mixins: [http,common]
  }
</script>

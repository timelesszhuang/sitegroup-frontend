<template>
  <div>
    <div class="top">
      栏目:
      <Input v-model="name" placeholder="栏目" style="width:300px;"></Input>

      <Select v-model="flag" style="width:200px;" placeholder="根据栏目类型查询" label-in-value filterable clearable>
        <Option v-for="item in flag_type" :value="item.value" :key="item">{{ item.label }}</Option>
      </Select>
      <Select v-model="tag_id" style="width:200px;" placeholder="根据栏目分类查询" label-in-value filterable clearable @on-change="changeNavtype">
        <Option v-for="item in navtype" :value="item.id" :key="item">{{ item.text }}</Option>
      </Select>
      <Button type="primary" @click="queryData">查询</Button>
      <Button type="success" @click="adddetails">添加详情型</Button>
      <Button type="success" @click="addquestion">添加问答型</Button>
      <Button type="success" @click="addarticle">添加文章型</Button>
      <Button type="success" @click="addtitle">添加文章段落</Button>
    </div>
    <div class="content" style="margin-top:10px;">
      <Table :context="self" :border="border" :stripe="stripe" :show-header="showheader"
             :size="size" :data="datas" :columns="tableColumns" style="width: 100%">
      </Table>
      <div style="margin: 10px;overflow: hidden">
        <!--<Alert type="error">栏目是在建立站点的时候选择,</Alert>-->
        <!--<Alert type="error">文章型,问答型,零散文章型是在列表中显示出来的,比如文章列表</Alert>-->
        <template>
          <Alert type="error">
            站点栏目介绍
            <span slot="desc">
            1.栏目是在建立站点管理中新建站点的时候选择
           <br/>
            2.详情型是首页显示的详情，比如说关于我们这种就是详情型，链接到详情页，添加的这个英文名用于生成静态页
              <br/>
              3.文章型文章型,问答型是在站点列表中显示出来的,比如文章列表
            </span>
          </Alert>
        </template>
        <div style="float: right;">
          <Page :total="total" @on-change="changePage" @on-page-size-change="changePageSize"
                show-total
                show-elevator show-sizer></Page>
        </div>
      </div>
    </div>
    <detailadd :form="editinfo" :navtype="navtype" ref="adddetails"></detailadd>
    <questionadd ref="addquestion" :navtype="navtype" :questiontype="questiontypelist"></questionadd>
    <!--<articlesave ref="save" :form="editinfo"></articlesave>-->
    <detailssave ref="savedetails" :navtype="navtype" :detail="editinfo"></detailssave>
    <questionsave ref="savequestion" :navtype="navtype" :questiontype="questiontypelist"
                  :form="editinfo"></questionsave>
    <articlesave ref="savearticle" :navtype="navtype" :articletype="articletypelist" :form="editinfo"></articlesave>
    <articleadd ref="addarticle" :navtype="navtype" :articletype="articletypelist"></articleadd>
    <titleadd ref="addtitle" :navtype="navtype" :articletype="articletypelist"></titleadd>
    <titlesave ref="savetitle" :navtype="navtype" :articletype="articletypelist" :form="editinfo"></titlesave>
    <sort ref="sort" :form="info"></sort>

  </div>

</template>


<script type="text/ecmascript-6">
  import common from '../../../assets/js/common.js';
  import http from '../../../assets/js/http.js';
  import detailadd from './adddetails.vue';
  import questionadd from './addquestion.vue';
  import articleadd from './addarticle.vue';
  import titleadd from './addtitle.vue';
  import detailssave from './savedetails.vue';
  import questionsave from './savequestion.vue';
  import articlesave from './savearticle.vue';
  import titlesave from './savetitle.vue';
  import sort from './sort.vue';

  export default {
    data() {
      return {
        self: this,
        border: true,
        stripe: true,
        showheader: true,
        showIndex: true,
        size: 'small',
        total: 0,
        page: 1,
        rows: 10,
        name: '',
        datas: [],
        editinfo: {},
        info: {},
        articletypelist: [],
        questiontypelist: [],
        flag: '',
        navtype: [],
        tag_id:'',
        flag_type: [
          {
            value: '1',
            label: '详情型'
          },
          {
            value: '2',
            label: '问答型'
          },
          {
            value: '3',
            label: '文章型'
          },
          {
            value: '4',
            label: '文章段落型'
          },
        ],
      }
    },
    components: {
      detailadd,
      questionadd,
      articleadd,
      titleadd,
      detailssave,
      questionsave,
      articlesave,
      titlesave,
      sort,
    },

    created() {
      this.getData();
      this.getArticleType((data) => {
        this.articletypelist = data
      });
      this.getQuestionType((data) => {
        this.questiontypelist = data
      });
      this.getmenutype((data) => {
        this.navtype = data
      });
    },
    methods: {
      changeNavtype(value) {
        this.tag_id = value.value
      },
      getData() {
        let data = {
          params: {
            page: this.page,
            rows: this.rows,
            name: this.name,
            article_type: this.article_type,
            question_type: this.question_type,
            flag: this.flag,
            tag_id: this.tag_id
          }
        }

        this.apiGet('menu', data).then((data) => {
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
        this.page = pagesize;
        this.getData();
      },
      queryData() {
        this.getData();
      },
      getmenutype(func) {
        this.apiGet('admin/menutag/list').then((res) => {
          this.handelResponse(res, (data, msg) => {
            func(data)
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (res) => {
          //处理错误信息
          this.$Message.error('网络异常，请稍后重试。');
        });
      },
      adddetails() {
        this.$refs.adddetails.modal = true
      },
      addquestion() {
        this.$refs.addquestion.modal = true
      },
      addarticle() {
        this.$refs.addarticle.modal = true
      },
      addtitle() {
        this.$refs.addtitle.modal = true
      },
      modify(index) {
        let editid = this.datas[index].id
        this.apiGet('menu/' + editid).then((res) => {
          this.handelResponse(res, (data, msg) => {
            this.info = data
            this.modal = false;
            this.$refs.sort.modal = true
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (res) => {
          //处理错误信息
          this.$Message.error('网络异常，请稍后重试。');
        })
      },
      edit(index) {
        let editid = this.datas[index].id
        this.apiGet('menu/' + editid).then((res) => {
          this.handelResponse(res, (data, msg) => {
            this.editinfo = data
            this.modal = false;
            if (data.flag == 1) {
              this.$refs.savedetails.modal = true
            }
            else if (data.flag == 2) {
              this.$refs.savequestion.modal = true
            } else if (data.flag == 3) {
              this.$refs.savearticle.modal = true
            }
            else if (data.flag == 4) {
              this.$refs.savetitle.modal = true
            }
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (res) => {
          //处理错误信息
          this.$Message.error('网络异常，请稍后重试。');
        })
      },
      remove(index) {
        //需要删除确认
        let id = this.datas[index].id
        let _this = this
        this.$Modal.confirm({
          title: '确认删除',
          content: '您确定删除该记录?',
          okText: '删除',
          cancelText: '取消',
          onOk: (index) => {
            _this.apiDelete('articletype/', id).then((res) => {
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
      update(){
        this.getmenutype((data) => {
          this.navtype = data
        });
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
        if (this.showheader) {
          columns.push({
            type: 'index',
            width: 60,
            align: 'center'
          })
        }
        columns.push({
          title: '栏目编号',
          key: 'id',
          width: '110px',
          sortable: true
        });
        columns.push({
          title: '栏目',
          key: 'name',
          sortable: true
        });
        columns.push({
          title: '类型',
          key: 'flag_name'
        });
        columns.push({
          title: '详情',
          key: 'title'
        });
        columns.push({
          title: '类型',
          key: 'type_name'
        });
        columns.push({
          title: '分类',
          key: 'tag_name'
        });
        columns.push({
          title: '英文名',
          key: 'generate_name'
        });
        columns.push({
          title: '创建时间',
          key: 'create_time'
        });
        columns.push({
          title: '排序',
          key: 'sort'
        });
        columns.push(
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            fixed: 'right',
            render(row, column, index) {
              return `<i-button type="primary" size="small" @click="edit(${index})">修改</i-button>
                <i-button type="error" size="small" @click="modify(${index})">排序</i-button>`;
            }
          }
        );
        return columns;
      }
    },
    mixins: [http, common],

  }

</script>
<style>


</style>

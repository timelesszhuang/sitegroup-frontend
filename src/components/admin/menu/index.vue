<template>
  <div>
    <div class="top">
      栏目:
      <Input v-model="name" placeholder="栏目" style="width:200px;"></Input>

      <Select v-model="flag" style="width:200px;" placeholder="根据栏目类型查询" label-in-value filterable clearable>
        <Option v-for="item in flag_type" :value="item.value" :key="item">{{ item.label }}</Option>
      </Select>
      <Select v-model="tag_id" style="width:200px;" placeholder="根据栏目分类查询" label-in-value filterable clearable
              @on-change="changeNavtype">
        <Option v-for="item in navtype" :value="item.id" :key="item">{{ item.text }}</Option>
      </Select>
      <Button type="primary" @click="queryData">查询</Button>
      <Button type="success" @click="adddetails" shape="circle" size="small">添加详情型</Button>
      <Button type="success" @click="addproduct" shape="circle" size="small">添加产品型</Button>
      <Button type="success" @click="addquestion" shape="circle" size="small">添加问答型</Button>
      <Button type="success" @click="addarticle" shape="circle" size="small">添加文章型</Button>

    </div>
    <div class="menutree">
      <Collapse accordion>
        <Panel :name="item.name" v-for="item in data" :key="item.id">
          {{item.name}}
          <Icon v-if="item.child" title="包含子菜单" type="arrow-down-c" style="color: rgba(7,208,211,0.76)"></Icon>
          <span title="类型" style="display:inline-block;padding-left:3%;width:10%"> {{item.flag_name}}</span>
          <span title="栏目分类" style="display:inline-block;width: 8%">{{item.tag_name}}</span>
          <span title="英文名" style="display:inline-block;width: 8%">{{item.generate_name}}</span>
          <Button style="position: absolute;right:50px;top: 10px" @click="edit(item.id)" icon="ivu-icon ivu-icon-edit"
                  size="small" type="info"></Button>
          <Button style="position: absolute;right:20px;top: 10px" @click="modify(item.id)"
                  icon="ivu-icon ivu-icon-ionic" size="small"></Button>
          <div slot="content">
            <Collapse v-if="item.child" accordion>
              <Panel :name="childitem.name" v-for="childitem in item.child" :key="childitem.id">
                {{childitem.name}}
                <Icon v-if="childitem.child" title="包含子菜单" type="arrow-down-c"
                      style="color: rgba(7,208,211,0.76)"></Icon>
                <span title="类型" style="display:inline-block;padding-left:3%;width:10%"> {{childitem.flag_name}}</span>
                <span title="栏目分类" style="display:inline-block;width: 8%">{{childitem.tag_name}}</span>
                <span title="英文名" style="display:inline-block;width: 8%">{{childitem.generate_name}}</span>
                <Button style="position: absolute;right:50px;top: 10px" @click="edit(childitem.id)"
                        icon="ivu-icon ivu-icon-edit" size="small" type="info"></Button>
                <Button style="position: absolute;right:20px;top: 10px" @click="modify(childitem.id)"
                        icon="ivu-icon ivu-icon-ionic" size="small"></Button>
                <div slot="content">
                  <Collapse v-if="childitem.child" accordion>
                    <Panel :name="child1item.name" v-for="child1item in childitem.child" :key="child1item.id">
                      {{child1item.name}}
                      <span title="类型"
                            style="display:inline-block;padding-left:3%;width:10%"> {{child1item.flag_name}}</span>
                      <span title="栏目分类" style="display:inline-block;width: 8%">{{child1item.tag_name}}</span>
                      <span title="英文名" style="display:inline-block;width: 8%">{{child1item.generate_name}}</span>
                      <Button style="position: absolute;right:50px;top: 10px" @click="edit(child1item.id)"
                              icon="ivu-icon ivu-icon-edit" size="small" type="info"></Button>
                      <Button style="position: absolute;right:20px;top: 10px" @click="modify(child1item.id)"
                              icon="ivu-icon ivu-icon-ionic" size="small"></Button>
                      <div slot="content">
                      </div>
                    </Panel>
                  </Collapse>
                </div>

              </Panel>
            </Collapse>
          </div>

        </Panel>
      </Collapse>
    </div>
    <productadd ref="addproduct" :navtype="navtype" :pidtype="pidtype" :ptype="ptype"></productadd>
    <productsave ref="saveproduct" :navtype="navtype" :pidtype="pidtype" :form="editinfo" :ptype="ptype"></productsave>
    <detailadd :form="editinfo" :navtype="navtype" :pidtype="pidtype" ref="adddetails"></detailadd>
    <questionadd ref="addquestion" :navtype="navtype" :pidtype="pidtype" :questiontype="questiontypelist"></questionadd>
    <detailssave ref="savedetails" :navtype="navtype" :pidtype="pidtype" :detail="editinfo"></detailssave>
    <questionsave ref="savequestion" :navtype="navtype" :pidtype="pidtype" :questiontype="questiontypelist"
                  :form="editinfo"></questionsave>
    <articlesave ref="savearticle" :navtype="navtype" :pidtype="pidtype" :articletype="articletypelist"
                 :form="editinfo"></articlesave>
    <articleadd ref="addarticle" :navtype="navtype" :pidtype="pidtype" :articletype="articletypelist"></articleadd>
    <titleadd ref="addtitle" :navtype="navtype" :articletype="articletypelist"></titleadd>
    <titlesave ref="savetitle" :navtype="navtype" :articletype="articletypelist" :form="editinfo"></titlesave>
    <sort ref="sort" :form="info"></sort>
  </div>
</template>
<script>
  import http from '../../../assets/js/http.js';
  import common from '../../../assets/js/common.js';
  import detailadd from './adddetails.vue';
  import questionadd from './addquestion.vue';
  import articleadd from './addarticle.vue';
  import titleadd from './addtitle.vue';
  import detailssave from './savedetails.vue';
  import questionsave from './savequestion.vue';
  import articlesave from './savearticle.vue';
  import titlesave from './savetitle.vue';
  import productadd from './addproduct.vue';
  import productsave from './saveproduct.vue';
  import sort from './sort.vue';

  export default {
    data() {
      return {
        pidtype: [],
        datas: [],
        editinfo: {},
        info: {},
        articletypelist: [],
        questiontypelist: [],
        ptype: [],
        value3: '1-1',
        value4: '1-1',
        navtype: [],
        name: '',
        tag_id: 0,
        data: [],
        flag: [],
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
          // {
          //   value: '4',
          //   label: '文章段落型'
          // },
          {
            value: '5',
            label: '产品型'
          },
        ],
      }
    },
    components: {
      productadd,
      productsave,
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
      this.getData()
      this.getmenutype()
      this.getArticleType((data) => {
        this.articletypelist = data
      });
      this.getQuestionType((data) => {
        this.questiontypelist = data
      });
      this.getproducttype((data) => {
        this.ptype = data
      });
    },

    methods: {
      changeNavtype(value) {
        this.tag_id = value.value
      },
      getData() {
        let data = {
          params: {
            name: this.name,
            flag: this.flag,
            tag_id: this.tag_id,
            article_type: this.article_type,
            question_type: this.question_type,
          }
        }
        this.apiGet('menu', data).then((data) => {
          this.handelResponse(data, (data, msg) => {
            this.data = data
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (data) => {
          this.$Message.error('网络异常，请稍后重试');
        })
      },
      queryData() {
        this.getData()
      },
      getproducttype(func) {
        this.apiGet('admin/getProductType').then((res) => {
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
      getpidtype(flag, id) {
        this.apiGet('menu/upmenu/' + flag + "/" + id).then((res) => {
          this.handelResponse(res, (data, msg) => {
            this.pidtype = data
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (res) => {
          //处理错误信息
          this.$Message.error('网络异常，请稍后重试。');
        });
      },
      getmenutype(func) {
        this.apiGet('admin/menutag/list').then((res) => {
          this.handelResponse(res, (data, msg) => {
            this.navtype = data
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (res) => {
          //处理错误信息
          this.$Message.error('网络异常，请稍后重试。');
        });
      },
      adddetails() {
        this.getpidtype(1, 0)
        this.$refs.adddetails.modal = true
      },
      addquestion() {
        this.getpidtype(2, 0)
        this.$refs.addquestion.modal = true
      },
      addarticle() {
        this.getpidtype(3, 0)
        this.$refs.addarticle.modal = true
      },
      addtitle() {
        this.$refs.addtitle.modal = true
      },
      addproduct() {
        this.getpidtype(5, 0)
        this.$refs.addproduct.modal = true
      },
      modify(params) {
        let editid = params
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
      edit(params) {
        let editid = params
        this.apiGet('menu/' + editid).then((res) => {
          this.handelResponse(res, (data, msg) => {
            this.editinfo = data
            if (this.editinfo.content == null) {
              this.editinfo.content = '';
            }
            let ArticleAar = [];
            if (this.editinfo.type_id !== "") {
              this.editinfo.type_id.split(",").map(function (key) {
                ArticleAar.push(Number(key))
              })
            }
            this.editinfo.type_id = ArticleAar
            this.modal = false;
            if (data.flag == 1) {
              this.getpidtype(data.flag, editid)
              this.$refs.savedetails.modal = true
            } else if (data.flag == 2) {
              this.getpidtype(data.flag, editid)
              this.$refs.savequestion.modal = true
            } else if (data.flag == 3) {
              this.getpidtype(data.flag, editid)
              this.$refs.savearticle.modal = true
            } else if (data.flag == 4) {
              this.$refs.savetitle.modal = true
            } else if (data.flag == 5) {
              this.getpidtype(data.flag, editid)
              this.$refs.saveproduct.modal = true
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
      update() {
        this.getmenutype((data) => {
          this.navtype = data
        });
      }
    },
    mixins: [http, common],
  }
</script>
<style>
  .menutree {
    margin-top: 10px;
  }

  .ivu-collapse-content-box {
    padding: 0px !important;
    margin: 0px !important;

  }
</style>

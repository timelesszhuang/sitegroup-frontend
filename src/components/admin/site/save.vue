<template>
  <div>
    <div>
      <Modal
        v-model="modal" width="600">
        <p slot="header">
          <span>修改</span>
        </p>
        <div>
          <Form ref="sitesave" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
            <Form-item label="名称" prop="site_name">
              <Input type="text" v-model="form.site_name" placeholder="请输入名称"></Input>
            </Form-item>
            <Form-item label="用户选择" prop="user_id">
              <Select v-model="form.user_id" style="text-align: left;width:200px;"
                      label-in-value filterable　@on-change="changeUser">
                <Option v-for="item in userlist" :value="item.id" :label="item.text" :key="item">
                  {{ item.text }}
                </Option>
              </Select>
            </Form-item>
            <Form-item label="网站应用" prop="is_mobile">
              <Radio-group v-model="form.is_mobile">
                <Radio label=10>
                  <Icon type="social-windows"></Icon>
                  <span>PC机</span>
                </Radio>
                <Radio label=20>
                  <Icon type="social-apple"></Icon>
                  <span>手机</span>
                </Radio>
              </Radio-group>
            </Form-item>
            <Form-item label="手机网站" prop="m_site_id">
              <Select v-model="form.m_site_id" style="text-align: left;width:200px;"
                      label-in-value filterable>
                <Option v-for="item in mobileSite" :value="item.id" :label="item.text" :key="item">
                  {{ item.text }}
                </Option>
              </Select>
            </Form-item>
            <Form-item label="关键词" prop="keyword_ids">
              <Select v-model="form.keyword_ids" multiple style="text-align: left;width:200px;" 　@on-change="changekeyword">
                <Option v-for="item in keyword" :value="item.id" :label="item.label" :key="item">
                  {{ item.label }}
                </Option>
              </Select>
            </Form-item>
            <Form-item label="栏目" prop="menu">
              <Select v-model="form.menu" multiple style="text-align: left;width:200px;" 　@on-click="changeMenutype">
                <Option v-for="item in menutype" :value="item.id" :label="item.text" :key="item">
                  {{ item.text }}
                </Option>
              </Select>
            </Form-item>
            <Form-item label="模板" prop="template_id">
              <Select v-model="form.template_id" style="text-align: left;width:200px;"
                      label-in-value filterable　@on-change="changeTemptype">
                <Option v-for="item in temptype" :value="item.id" :label="item.text" :key="item">
                  {{ item.text }}
                </Option>
              </Select>
            </Form-item>
            <Form-item label="联系方式" prop="support_hotline">
              <Select v-model="form.support_hotline" style="text-align: left;width:200px;"
                      label-in-value filterable　@on-change="changeHotline">
                <Option v-for="item in hotline" :value="item.id" :label="item.text" :key="item">
                  {{ item.text }}
                </Option>
              </Select>
            </Form-item>
            <Form-item label="网站分类" prop="site_type">
              <Select v-model="form.site_type" style="text-align: left;width:200px;"
                      label-in-value filterable　@on-change="changeSitetype">
                <Option v-for="item in sitetype" :value="item.id" :label="item.text" :key="item">
                  {{ item.text }}
                </Option>
              </Select>
            </Form-item>
            <Form-item label="域名选择" prop="domain_id">
              <Select v-model="form.domain_id" style="text-align: left;width:200px;"
                      label-in-value filterable　@on-change="changeDomainlist">
                <Option v-for="item in domainlist" :value="item.id" :label="item.text" :key="item">
                  {{ item.text }}
                </Option>
              </Select>
            </Form-item>
            <Form-item label="友链选择" prop="link_id">
              <Select v-model="form.link_id" multiple  style="text-align: left;width:200px;">
                <Option v-for="item in link" :value="item.id" :label="item.text" :key="item">
                  {{ item.text }}
                </Option>
              </Select>
            </Form-item>
            <Form-item label="url" prop="url">
              <Input v-model="form.url" placeholder="请输入url"></Input>
            </Form-item>
            <Form-item label="head前代码" prop="before_header_jscode">
              <Input v-model="form.before_header_jscode" type="textarea" :rows="3"
                     placeholder="请输入head前代码">
              </Input>
            </Form-item>
            <Form-item label="head后代码" prop="other_jscode">
              <Input v-model="form.other_jscode" type="textarea" :rows="3"
                     placeholder="请输入head后代码">
              </Input>
            </Form-item>
          </Form>
        </div>
        <div slot="footer">
          <Button type="success" size="large" :loading="modal_loading" @click="add">保存</Button>
        </div>
      </Modal>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';
  export default {
    data() {
      const checkmenutype = (rule, value, callback) => {
        if (value=="") {
          callback(new Error('请选择栏目分类'));
        } else {
          callback();
        }
      };
      const checkkeyword = (rule, value, callback) => {
        if (value=="") {
          callback(new Error('请选择关键词'));
        } else if(value.length>5){
          callback(new Error('关键词不能超过5个'));
        }else {
          callback();
        }

      };
      const checktemptype = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请选择模板分类'));
        } else {
          callback();
        }
      };
      const checkhotlinetype = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请选择联系方式'));
        } else {
          callback();
        }
      };
      const checksitetype = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请选择网站分类'));
        } else {
          callback();

        }
      };
      const checkdomain = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请选择域名'));
        } else {
          callback();
        }
      }
      const checkuser = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请选择用户'));
        } else {
          callback();
        }
      };

      return {
        modal: false,
        modal_loading: false,
        AddRule: {
          site_name: [
            {required: true, message: '请输入名称', trigger: 'blur'},
          ],
          menu: [
            {required: true,validator: checkmenutype, trigger: 'blur'},
          ],
          keyword_ids: [
            {required: true,validator: checkkeyword, trigger: 'blur'},
          ],
          template_id: [
            {required: true,validator: checktemptype, trigger: 'blur'},
          ],
          support_hotline: [
            {required: true,validator: checkhotlinetype, trigger: 'blur'},
          ],
          site_type: [
            {required: true,validator: checksitetype, trigger: 'blur'},
          ],
          domain_id: [
            {required: true,validator: checkdomain, trigger: 'blur'},
          ],
          user_id: [
            {required: true,validator: checkuser, trigger: 'blur'},
          ],
          url:[
            {required: true, message: '请输入url', trigger: 'blue'}
          ]

        }
      }
    },
    methods: {
      changeMenutype(value) {
          this.form.menu = value.label
      },
      changeHotline(value) {
        this.form.support_hotline = value.value
      },
      changeSitetype(value) {
        this.form.site_type = value.value
        this.form.site_type_name = value.label
      },
      changeUser(value){
        this.form.user_name = value.label
        this.form.user_id = value.value
      },
      changekeyword(){

      },

      changeTemptype(value) {
        this.form.template_id = value.value
      },
      changeDomainlist(value) {
        this.form.domain = value.label
        this.form.domain_id = value.value
      },
        add() {
          this.$refs.sitesave.validate((valid) => {
              if(valid){
                this.modal_loading = true;
                let data = this.form;
                let id = data.id;
                this.apiPut('site/'+ id, data).then((res) => {
                  this.handelResponse(res, (data, msg) => {
                    this.modal = false;
                    this.$parent.getData();
                    this.$Message.success(msg);
                    this.modal_loading = false;
                  }, (data, msg) => {
                    this.modal_loading = false;
                    this.$Message.error(msg);
                  })
                }, (res) => {
                  //处理错误信息
                  this.modal_loading = false;
                  this.$Message.error('网络异常，请稍后重试。');
                })
              }
          })
        }
    },
    props: {
      menutype: {
        default:
          []
      }
      ,
      temptype: {
        default:
          []
      }
      ,
      sitetype: {
        default:
          []
      }
      ,
      hotline: {
        default:
          []
      }
      ,
      domainlist:{
        default:
          []
      },
      userlist:{
        default:
          []
      },
      keyword:{
        default:
          []
      },
      mobileSite:{

      },
      link:{
        default:
          []
      },
      form: {
        default: {
          site_name: "",
          menu: "",
          link_id: "",
          template_id:"",
          support_hotline:"",
          site_type:"",
          domain_id:"",
          before_header_jscode:"",
          other_jscode:"",
          keyword_ids:"",
        }
      }
    },
    mixins: [http]
  }
</script>

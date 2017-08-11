<template>
  <div>
    <Modal
      v-model="modal" width="900">
      <p slot="header">

        <span>添加到文章库</span>
      </p>
      <div>

        <Form ref="save" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
          <Form-item label="原文">
            <a v-bind:href="url" target="_blank">点击查看原文章</a>
          </Form-item>
          <Form-item label="标题" prop="title">
            <Input type="text" v-model="form.title" placeholder="请输入标题"></Input>
          </Form-item>
          <Form-item label="作者" prop="title">
            <Input type="text" v-model="form.auther" placeholder="请输入作者"></Input>
          </Form-item>
          <Form-item label="文章分类" prop="articletype_id">
            <Select v-model="form.articletype_id" style="text-align: left;width:250px;position: relative;z-index: 10000"
                    label-in-value 　@on-change="changeArticletype">
              <Option v-for="item in articletype" :value="item.id" :label="item.name" :key="item">
                {{ item.text }}
              </Option>
            </Select>
            &nbsp; &nbsp; &nbsp; &nbsp;
            <span>原分类：{{form.type_name}}</span>
          </Form-item>

          <Form-item label="内容" prop="content">
            <editor @change="updateData" :content="form.content"  :height="300"></editor>
          </Form-item>
        </Form>
      </div>
      <div slot="footer">
        <Button type="success" size="large" :loading="modal_loading" @click="save">保存</Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';
  export default {
    data() {
      return {
        editorOption: {},
        modal: false,
        modal_loading: false,
        AddRule: {
          title: [
            {required: true, message: '请填写文章标题', trigger: 'blur'},
          ],
          content:[
            {required: true, message: '请填写文章内容', trigger: 'blur'},
          ]
        }
      }
    },
    computed: {
      url: function () {
        return  this.form.url;
      },
      content:function () {
        return this.form.content;
      }
    },
    methods: {
      updateData(data) {
        this.form.content = data
      },
      changeArticletype(value) {
        this.form.articletype_name = value.label
        this.form.articletype_id = value.value
      },
      save() {
        this.$refs.save.validate((valid) => {
          if (valid) {
            this.modal_loading = true;
            let data = {
              articletype_id:this.form.articletype_id,
              articletype_name:this.form.articletype_name,
              auther:this.form.auther,
              summary:this.form.title,
              title:this.form.title,
              content:  this.form.content,
              come_from:this.form.source,
              posttime:this.form.createtime
            }
//            let data = this.form;
            this.apiPost('qq/addArticle', data).then((res) => {
              this.handelResponse(res, (data, msg) => {
                this.modal = false;
                this.$parent.getData();
                this.$Message.success(msg);
                this.modal_loading = false;
//                this.$refs.save.resetFields();
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
    mixins: [http],
    props: {
      articletype: {
        default: {}
      },
      form: {
        default: {
          title: "",
          auther: '',
          articletype_id: 0,
          articletype_name: '',
          content: '',
        }
      }
    }
  }
</script>
<style>
  .ql-container .ql-editor {
    min-height: 20em;
    padding-bottom: 1em;
    max-height: 25em;
  }
</style>

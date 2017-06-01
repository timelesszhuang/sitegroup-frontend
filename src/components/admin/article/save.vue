<template>
  <div>
    <Modal
      v-model="modal" width="900">
      <p slot="header">
        <span>修改文章</span>
      </p>
      <div>
        <Form ref="save" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
          <Form-item label="标题" prop="title">
            <Input type="text" v-model="form.title" placeholder="请输入标题"></Input>
          </Form-item>
          <Form-item label="来源" prop="come_from">
            <Input type="text" v-model="form.come_from" placeholder="请输入来源" style="width: 200px;"></Input>
          </Form-item>
          <Form-item label="作者" prop="title">
            <Input type="text" v-model="form.auther" placeholder="请输入作者"></Input>
          </Form-item>
          <Form-item label="文章分类" prop="articletype_id">
            <Select v-model="form.articletype_id" style="text-align: left;width:200px;"
                    label-in-value filterable　@on-change="changeArticletype">
              <Option v-for="item in articletype" :value="item.id" :label="item.name" :key="item">
                {{ item.name }}
              </Option>
            </Select>
          </Form-item>
          <Form-item label="内容" prop="content">
            <quill-editor ref="myTextEditoredit"
                          v-model="form.content"
                          :config="editorOption">
            </quill-editor>
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
      const checkarticletype = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请选择文章分类'));
        } else {
          callback();
        }
      };
      return {
        editorOption: {},
        modal: false,
        modal_loading: false,
        AddRule: {
          title: [
            {required: true, message: '请填写文章标题', trigger: 'blur'},
          ],
          come_from: [
            {required: true, message: '请填写文章来源', trigger: 'blur'},
          ],
          auther: [
            {required: true, message: '请填写文章作者', trigger: 'blur'},
          ],
          articletype_id: [
            {validator: checkarticletype, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      computed: {
        editor() {
          return this.$refs.myTextEditoredit.quillEditor
        }
      },
      changeArticletype(value) {
        this.form.articletype_name = value.label
        this.form.articletype_id = value.value
      },
      save() {
        this.$refs.save.validate((valid) => {
          if (valid) {
            this.modal_loading = true;
            let data = this.form;
            let id = data.id;
            this.apiPut('article/' + id, data).then((res) => {
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
          content: ''
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

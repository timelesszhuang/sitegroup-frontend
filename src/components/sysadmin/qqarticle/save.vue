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
          <Form-item label="来源" prop="source">
            <Input type="text" v-model="form.source" placeholder="请输入来源"></Input>
          </Form-item>
          <Form-item label="内容" prop="content">
            <editor @change="updateData" :content="form.content"  :height="500"></editor>
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
          content: [
            {required: true, message: '请填写文章内容', trigger: 'blur'},
          ],
        }
      }
    },
    methods: {
      updateData(data) {
        this.form.content = data
      },
//      changeArticletype(value) {
//        this.form.articletype_name = value.label
//        this.form.articletype_id = value.value
//      },
      save() {
        this.$refs.save.validate((valid) => {
          if (valid) {
            this.modal_loading = true;
            let data = this.form;
            let id = data.id;
            this.apiPost('sys/changeQqArticle', data).then((res) => {
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

      form: {
        default: {
          title: "",
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

<template>
  <div>
    <Modal
      v-model="modal" width="900">
      <p slot="header">
        <span>修改详情型栏目</span>
      </p>
      <div>
        <Form ref="detailadd" :model="detail" :label-width="90" :rules="AddRule" class="node-add-form">
          <Form-item label="分类名称" prop="name">
            <Input type="text"
                   v-model="detail.name" placeholder="请填写菜单名字"></Input>
          </Form-item>
          <Form-item label="详情" prop="title">
            <Input type="text" v-model="detail.title" placeholder="请填写栏目的详情"></Input>
          </Form-item>
          <Form-item label="生成文件名" prop="generate_name">
            <Input type="text" v-model="detail.generate_name" placeholder="请填写生成的文件名"></Input>
          </Form-item>
          <Form-item label="内容" prop="content" style="height:100%;">
            <quill-editor ref="myTextEditor"
                          v-model="detail.content"
                          :config="editorOption"
                          @blur="onEditorBlur($event)">
            </quill-editor>
          </Form-item>
        </Form>
      </div>
      <div slot="footer">
        <Button type="success" size="large" :loading="modal_loading" @click="savedetails">保存</Button>
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
        id:0,
        AddRule: {
          name: [
            {required: true, message: '请填写菜单名字', trigger: 'blur'},
          ],
          title: [
            {required: true, message: '请填写栏目的详情', trigger: 'blur'},
          ],
          generate_name:[
            {required: true, message: '请填写生成的文件名', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      computed: {
        editor() {
          return this.$refs.myTextEditor.quillEditor
        }
      },
      onEditorBlur(editor) {

      },
      savedetails() {
        this.$refs.detailadd.validate((valid) => {
          if (valid) {
            this.modal_loading = true;
            let data = this.detail;
            let id = data.id;
            this.apiPut('menu/' + id, data).then((res) => {
              this.handelResponse(res, (data, msg) => {
                this.modal = false;
                this.$parent.getData();
                this.$Message.success(msg);
                this.modal_loading = false;
                this.$refs.detailadd.resetFields();
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
      detail: {
        default: {
          name: "",
          title: '',
          content: '',
          generate_name:''
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

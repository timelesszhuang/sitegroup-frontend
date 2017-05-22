<template>
  <div>
    <div>
      <Modal
        v-model="modal" width="900">
        <p slot="header">
          <span>添加详情型栏目</span>
        </p>
        <div>
          <Form ref="detailadd" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
            <Form-item label="分类名称" prop="name">
              <Input type="text" v-model="form.name" placeholder="请填写菜单名字"></Input>
            </Form-item>
            <Form-item label="详情" prop="title">
              <Input type="text" v-model="form.title" placeholder="请填写栏目的详情"></Input>
            </Form-item>
            <Form-item label="生成文件名" prop="generate_name">
              <Input type="text" v-model="form.generate_name" placeholder="请填写生成的文件名"></Input>
            </Form-item>
            <Form-item label="内容" prop="content" style="height:100%;">
              <quill-editor ref="myTextEditor"
                            v-model="form.content"
                            :config="editorOption"
                            @blur="onEditorBlur($event)"
                            @focus="onEditorFocus($event)"
                            @ready="onEditorReady($event)">
              </quill-editor>
            </Form-item>
          </Form>
        </div>
        <div slot="footer">
          <Button type="success" size="large" :loading="modal_loading" @click="adddetails">保存</Button>
        </div>
      </Modal>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';
  export default {
    data() {
      return {
        modal: false,
        modal_loading: false,
        editorOption: {},
        form: {
          name: "",
          title: "",
          flag:"1",
          flag_name:"详情型",
          generate_name:'',
          content:''
        },
        AddRule: {
          name: [
            {required: true, message: '请填写菜单名字', trigger: 'blur'},
          ],
          title: [
            {required: true, message: '请填写栏目的详情', trigger: 'blur'},
          ],
          type_name: [
            {required: true, message: '请选择问答分类', trigger: 'blur'},
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
//        console.log('editor blur!', editor)
      },
      onEditorFocus(editor) {
//        console.log('editor focus!', editor)
      },
      onEditorReady(editor) {
//        console.log('editor ready!', editor)
      },
        adddetails() {
          this.$refs.detailadd.validate((valid) => {
              if(valid){
                this.modal_loading = true;
                let data = this.form;
                this.apiPost('menu', data).then((res) => {
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
    mixins: [http]
  }
</script>

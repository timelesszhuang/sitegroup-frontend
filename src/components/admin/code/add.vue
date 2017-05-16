<template>
  <div>
    <div>
      <Modal
        v-model="modal" width="900">
        <p slot="header">
          <span>添加代码</span>
        </p>
        <div>
          <Form ref="code" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
            <Form-item label="分类名称" prop="name">
              <Input type="text" v-model="form.name" placeholder="请输入名称"></Input>
            </Form-item>
            <Form-item label="公共模板" prop="code" style="height:100%;">
              <quill-editor ref="myTextEditor"
                            v-model="form.code"
                            :config="editorOption">
              </quill-editor>
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
      return {
        editorOption: {},
        modal: false,
        modal_loading: false,
        form: {
          name: "",
          code: ""
        },
        AddRule: {
          name: [
            {required: true, message: '请填写公共代码名称', trigger: 'blur'},
          ],
          code: [
            {required: true, message: '请填写代码', trigger: 'blur'},
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
        add() {
          this.$refs.code.validate((valid) => {
              if(valid){
                this.modal_loading = true;
                let data = this.form;
                this.apiPost('code', data).then((res) => {
                  this.handelResponse(res, (data, msg) => {
                    this.modal = false;
                    this.$parent.getData();
                    this.$Message.success(msg);
                    this.modal_loading = false;
                    this.$refs.code.resetFields();
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

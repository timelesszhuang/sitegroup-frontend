<template>
  <div>
    <div>
      <Modal
        v-model="modal" width="900">
        <p slot="header">
          <span>添加用户</span>
        </p>
        <div>
          <Form ref="siteuser" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
            <Form-item label="昵称" prop="name">
              <Input type="text" v-model="form.name" placeholder="请输入昵称"></Input>
            </Form-item>
            <Form-item label="账号" prop="account">
              <Input type="text" v-model="form.account" placeholder="请输入账号"></Input>
            </Form-item>
            <Form-item label="邮箱" prop="email">
              <Input type="text" v-model="form.email" placeholder="请输入邮箱"></Input>
            </Form-item>
            <Form-item label="密码" prop="pwd">
              <Input type="password" v-model="form.pwd" placeholder="请输入密码"></Input>
            </Form-item>
            <Form-item label="确认密码" prop="confirmPwd">
              <Input type="password" v-model="form.confirmPwd" placeholder="请输入确认密码"></Input>
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
          account:"",
          pwd: "",
          email:'',
          confirmPwd:''
        },
        AddRule: {
          name: [
            {required: true, message: '请输入名称', trigger: 'blur'},
          ],
          account: [
            {required: true, message: '请输入昵称', trigger: 'blur'},
          ],
          pwd: [
            {required: true, message: '请输入密码', trigger: 'blur'},
          ],
          email: [
            {required:true,message:'请输入邮箱',trigger:'blur'}
          ],
          confirmPwd: [
            {required:true,message:'请输入确认密码',trigger:'blur'}
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
          this.$refs.siteuser.validate((valid) => {
              if(valid){
                if(this.form.pwd !== this.form.confirmPwd){
                  this.$Message.error('两次输入的密码不同');
                  return
                }
                this.modal_loading = true;
                let data = this.form;
                this.apiPost('siteuser', data).then((res) => {
                  this.handelResponse(res, (data, msg) => {
                    this.modal = false;
                    this.$parent.getData();
                    this.$Message.success(msg);
                    this.modal_loading = false;
                    this.$refs.siteuser.resetFields();
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

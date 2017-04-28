<style>
  .change-pwd-form {
    padding: 20px;
  }
</style>
<template>
  <div>
    <Modal
      v-model="modal"
      title="重置密码"
      ok-text="保存">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>修改密码</span>
      </p>
      <div style="text-align:center">
        <Form ref="changepwdform" :model="form" :label-width="90" :rules="changePwdRule" class="change-pwd-form">
          <Form-item label="原密码" prop="prepwd">
            <Input type="password" v-model="form.prepwd" placeholder="请输入原密码"></Input>
          </Form-item>
          <Form-item label="新密码" prop="pwd1">
            <Input type="password" v-model="form.pwd1" placeholder="请输入新密码"></Input>
          </Form-item>
          <Form-item label="重复新密码" prop="pwd2">
            <Input type="password" v-model="form.pwd2" placeholder="请再次输入新密码"></Input>
          </Form-item>
        </Form>
      </div>
      <div slot="footer">
        <Button type="success" size="large" :loading="modal_loading" @click="changePwd">修改</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import http from '../../assets/js/http.js'
  export default {
    data () {
      return {
        modal: false,
        modal_loading: false,
        form: {
          prepwd: '',
          pwd1: '',
          pwd2: ''
        },
        changePwdRule: {
          prepwd: [
            {required: true, message: '请填写原密码', trigger: 'blur'},
            {type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur'}
          ],
          pwd1: [
            {required: true, message: '请填写新密码', trigger: 'blur'},
            {type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur'}
          ],
          pwd2: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur'}
          ]
        },
      }
    },
    methods: {
      changePwd () {
        this.$refs.changepwdform.validate((valid) => {
          if (valid) {
            let data = {}
            data.oldPwd = this.form.prepwd
            if (this.form.pwd1 != this.form.pwd2) {
              this.$Message.info('两次密码输入不一致');
              return false
            }
            this.modal_loading = true;
            data.newPwd = this.form.pwd1
            this.apiPost('common/common/changePwd', data).then((res) => {
              this.handelResponse(res, (data, msg) => {
                this.$Message.success(msg);
                this.modal = false;
              }, (data, msg) => {
                this.modal_loading = false;
                this.$Message.error(msg);
              })
            }, (res) => {
              //处理错误信息
              this.$Message.error('网络异常，请稍后重试。');
            })
          } else {
            return false;
          }
        })
      },
    },
    mixins: [http]
  }
</script>

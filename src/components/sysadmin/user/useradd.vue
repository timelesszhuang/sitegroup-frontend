<style>
  .user-add-form {
    padding: 20px;
  }
</style>
<template>
  <div>
    <Modal
      v-model="modal"
      ok-text="保存" width="600">
      <p slot="header">
        <Icon type="person-add"></Icon>
        <span>添加用户</span>
      </p>
      <div>
        <Form ref="useradd" :model="form" :label-width="90" :rules="userAddRule" class="user-add-form">
          <Form-item label="登录名" prop="user_name">
            <Input type="text" v-model="form.user_name" disabled placeholder="请输入登陆名"></Input>
          </Form-item>
          <Form-item label="新密码" prop="pwd">
            <Input type="password" v-model="form.pwd" placeholder="请输入新密码"></Input>
          </Form-item>
          <Form-item label="重复新密码" prop="pwd2">
            <Input type="password" v-model="form.pwd2" placeholder="请再次输入新密码"></Input>
          </Form-item>
          <Form-item label="账号类型" prop="type">
            <Select v-model="form.type" style="width:150px;text-align: left">
              <Option v-for="item in type" :value="item.value" :key="item">{{ item.label }}</Option>
            </Select>
          </Form-item>
          <Form-item label="公司" prop="name">
            <Input type="text" v-model="form.name" placeholder="请输入公司名"></Input>
          </Form-item>
          <Form-item label="联系人" prop="contacts">
            <Input type="text" v-model="form.contacts" placeholder="请输入联系人"></Input>
          </Form-item>
          <Form-item label="手机号" prop="mobile">
            <Input type="text" v-model="form.mobile" placeholder="请输入手机号"></Input>
          </Form-item>
          <Form-item label="固话" prop="tel">
            <Input type="text" v-model="form.tel" placeholder="请输入固话"></Input>
          </Form-item>
          <Form-item label="邮箱" prop="email">
            <Input type="text" v-model="form.email" placeholder="请输入邮箱地址"></Input>
          </Form-item>
          <Form-item label="微信" prop="wechat">
            <Input type="text" v-model="form.wechat" placeholder="请输入微信账号"></Input>
          </Form-item>
        </Form>
      </div>
      <div slot="footer">
        <Button type="success" size="large" :loading="modal_loading" @click="add">保存</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import http from '../../../assets/js/http.js'
  export default {
    data () {
      return {
        modal: false,
        modal_loading: false,
        form: {
          user_name: '',
          pwd: '',
          pwd2: '',
          type: 2,
          name: '',
          mobile: '',
          tel: '',
          email: '',
          wechat: ''
        },
        userAddRule: {
          user_name: [
            {required: true, message: '请填写登录名', trigger: 'blur'},
          ],
          pwd: [
            {required: true, message: '请填写新密码', trigger: 'blur'},
            {type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur'}
          ],
          pwd2: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '请输入公司名', trigger: 'blur'},
          ],
          contacts: [
            {required: true, message: '请输入联系人名', trigger: 'blur'},
          ],
          mobile: [
            {required: true, message: '请输入手机号码', trigger: 'blur'},
          ],
        },
        type: [
          {
            value: 1,
            label: '系统管理员'
          }, {
            value: 2,
            label: '节点管理员'
          },
        ]
      }
    },
    methods: {
      add()
      {
        this.$refs.useradd.validate((valid) => {
          if (valid) {
            if (this.form.pwd != this.form.pwd2) {
              this.$Message.info('两次密码输入不一致');
              return false
            }
            this.modal_loading = true;
            let data = this.form;
            delete data['pwd2'];
            data['type_name'] = this.form.type == 1 ? '系统管理员' : '节点管理员';
            this.apiPost('user', data).then((res) => {
              this.handelResponse(res, (data, msg) => {
                this.modal = false;
                this.$parent.getData();
                this.$Message.success(msg);
                this.modal_loading = false;
                this.$refs.useradd.resetFields();
              }, (data, msg) => {
                this.modal_loading = false;
                this.$Message.error(msg);
              })
            }, (res) => {
              //处理错误信息
              this.modal_loading = false;
              this.$Message.error('网络异常，请稍后重试。');
            })
          } else {
            return false;
          }
        })
      }
      ,
    }
    ,
    mixins: [http]
  }
</script>

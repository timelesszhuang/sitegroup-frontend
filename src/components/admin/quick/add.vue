<template>
  <div>
    <div>
      <Modal
        v-model="modal" width="600">
        <p slot="header">
          <span>添加</span>
        </p>
        <div>
          <Form ref="code" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
            <Form-item label="域名" prop="yuming">
              <Input type="text" v-model="form.yuming" placeholder="请输入域名"></Input>
            </Form-item>
            <Form-item label="公司名" prop="gongsiming">
              <Input type="text" v-model="form.gongsiming" placeholder="请输入公司名"></Input>
            </Form-item>
            <Form-item label="公司英文名" prop="gongsiyingwenming">
              <Input type="text" v-model="form.gongsiyingwenming" placeholder="请输入公司英文名"></Input>
            </Form-item>
            <Form-item label="公司简介" prop="gongsijianjie">
              <Input type="text" v-model="form.gongsijianjie" placeholder="请输入公司简介"></Input>
            </Form-item>
            <Form-item label="邮箱" prop="email">
              <Input type="text" v-model="form.email" placeholder="请输入邮箱"></Input>
            </Form-item>
            <Form-item label="手机" prop="phone">
              <Input type="text" v-model="form.phone" placeholder="请输入手机"></Input>
            </Form-item>
            <Form-item label="邮编" prop="content_zipcode">
              <Input type="text" v-model="form.content_zipcode" placeholder="请输入邮编"></Input>
            </Form-item>
            <Form-item label="传真" prop="content_fax">
              <Input type="text" v-model="form.content_fax" placeholder="请输入传真"></Input>
            </Form-item>
            <Form-item label="电话" prop="content_telephone">
              <Input type="text" v-model="form.content_telephone" placeholder="请输入电话"></Input>
            </Form-item>
            <Form-item label="邮箱" prop="content_email">
              <Input type="text" v-model="form.content_email" placeholder="请输入邮箱"></Input>
            </Form-item>
            <Form-item label="手机" prop="content_mobile">
              <Input type="text" v-model="form.content_mobile" placeholder="请输入手机"></Input>
            </Form-item>
            <Form-item label="400电话" prop="content_four00">
              <Input type="text" v-model="form.content_four00" placeholder="请输入400电话"></Input>
            </Form-item>
            <Form-item label="qq" prop="content_qq">
              <Input type="text" v-model="form.content_qq" placeholder="请输入qq"></Input>
            </Form-item>
            <Form-item label="地址" prop="content_address">
              <Input type="text" v-model="form.content_address" placeholder="请输入地址"></Input>
            </Form-item>
            <Form-item label="语言" prop="lang">
              <Radio-group v-model="form.lang">
                <Radio label="en">
                  <span>英文</span>
                </Radio>
                <Radio label="zh">
                  <span>中文</span>
                </Radio>
              </Radio-group>
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
        modal: false,
        modal_loading: false,
        form: {
          yuming: '',
          gongsiming: '',
          gongsiyingwenming: '',
          gongsijianjie: '',
          email: '',
          phone: '',
          pwd: '',
          content_zipcode: '',
          content_fax: '',
          content_telephone: '',
          content_weixin: '',
          content_email: '',
          content_mobile: '',
          content_four00: '',
          content_qq: '',
          content_address: '',
          lang:'',
        },
        AddRule: {
          yuming: [
            {required: true, message: '请填写', trigger: 'blur'},
          ],
          gongsiming: [
            {required: true, message: '请填写', trigger: 'blur'},
          ],
          gongsiyingwenming: [
            {required: true, message: '请填写', trigger: 'blur'},
          ],
          gongsijianjie: [
            {required: true, message: '请填写', trigger: 'blur'},
          ],
          phone: [
            {required: true, message: '请填写', trigger: 'blur'},
          ],



        }
      }
    },
    methods: {
      add() {
        this.$refs.code.validate((valid) => {
          if (valid) {
            this.modal_loading = true;
            let data = this.form;
            this.apiPost('admin/Site/one_key_add_page', data).then((res) => {
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

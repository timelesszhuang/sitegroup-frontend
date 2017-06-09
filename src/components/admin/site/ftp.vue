<template>
  <Modal v-model="modal" title="ftp信息">
    <Form ref="ftp" :model="form"  :label-width="90" :rules="AddRule" class="node-add-form">
      <Form-item label="ftp平台" prop="ftp_place">
        <Input type="text" v-model="form.ftp_place"  placeholder="请输入ftp平台"></Input>
      </Form-item>
      <Form-item label="ftp host" prop="ftp_host">
        <Input type="text" v-model="form.ftp_host" placeholder="请输入ftp host"></Input>
      </Form-item>
      <Form-item label="ftp 用户" prop="ftp_user">
        <Input type="text" v-model="form.ftp_user"  placeholder="请输入ftp用户名"></Input>
      </Form-item>
      <Form-item label="ftp 密码" prop="ftp_pwd">
        <Input type="password" v-model="form.ftp_pwd"  placeholder="请输入ftp密码"></Input>
      </Form-item>
    </Form>
    <div slot="footer">
      <Button type="success" size="large" :loading="modal_loading" @click="submitFtp">保存</Button>
    </div>
  </Modal>

</template>

<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';
  export default{
    data() {
      return {
        modal: false,
        modal_loading:false,
        AddRule: {
          ftp_place: [
            {required: true, message: '请输入ftp平台', trigger: 'blur'},
          ],
          ftp_host: [
            {required: true, message: '请输入ftp host', trigger: 'blur'},
          ],
          ftp_user: [
            {required: true, message: '请输入ftp用户', trigger: 'blur'},
          ],
          ftp_pwd: [
            {required: true, message: '请输入ftp密码', trigger: 'blur'},
          ]
        }
      }
    },
    methods: {
      submitFtp(){
        this.$refs.ftp.validate((valid) => {
          if (valid) {
            let data = this.form;
            let id = this.ftp_id;
            this.apiPut('Site/saveFtp/'+ id, data).then((res) => {
              this.handelResponse(res, (data, msg) => {
                this.modal_loading = false;
                this.modal = false;
                this.$parent.getData();
                this.$Message.success(msg);
              }, (data, msg) => {
                this.$Message.error(msg);
              })
            }, (res) => {
              //处理错误信息
              this.modal_loading = false;
              this.modal = false
              this.$Message.error('网络异常，请稍后重试。');
            })
          }
        })
      }
    },
    props: {
      form: {
        default: {

        }
      },
      ftp_id:Number
    },
    mixins: [http]
  }
</script>
<style>


</style>

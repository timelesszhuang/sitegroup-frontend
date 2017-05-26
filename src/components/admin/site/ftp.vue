<template>
  <Modal v-model="modal" title="ftp信息">
    <Form ref="ftp" :model="form"  :label-width="90" :rules="AddRule" class="node-add-form">
      <Form-item label="ftp平台" prop="ftp_place">
        <Input type="text"  placeholder="请输入ftp平台"></Input>
      </Form-item>
      <Form-item label="ftp host" prop="ftp_host">
        <Input type="text"  placeholder="请输入ftp host"></Input>
      </Form-item>
      <Form-item label="ftp 用户" prop="ftp_user">
        <Input type="text"  placeholder="请输入ftp用户名"></Input>
      </Form-item>
      <Form-item label="ftp 密码" prop="ftp_pwd">
        <Input type="password"  placeholder="请输入ftp密码"></Input>
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

      }
    },
    mixins:[http],
    prop:{
        form:{
          type: Array
        }
    }
  }
</script>
<style>


</style>

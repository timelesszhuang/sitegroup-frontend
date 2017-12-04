<template>
  <Modal v-model="modal" title="主动推送地址" style="position:relative;z-index: 10000">

    <Form ref="ping" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
      <Form-item label="链接地址" prop="cdn_type">
        <Input type="text" v-model="form.pingbaiduurl" placeholder="请输入链接地址"></Input>
      </Form-item>

    </Form>

    <div slot="footer">
      <Button type="success" size="large" :loading="modal_loading" @click="saveping">保存</Button>
    </div>
  </Modal>

</template>

<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';
  export default {
    data() {
      return {
        modal: false,
        modal_loading: false,
        AddRule: {
          pingbaiduurl: [
            {required: true, message: '请输入链接地址', trigger: 'blur'},
          ],}
      }
    },
    methods: {
      saveping(){
        this.$refs.ping.validate((valid) => {
          if (valid) {
            let data = this.form;
            let id = this.ping_id;
            //console.log(data)
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
      ping_id:Number
    },
    mixins:[http]
  }

</script>
<style>


</style>

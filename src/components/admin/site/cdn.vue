<template>
  <Modal v-model="modal" title="ftp信息">
    <Form ref="cdn" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
      <Form-item label="cdn品牌" prop="cdn_type">
        <Input type="text" v-model="form.cdn_type" placeholder="请输入cdn品牌"></Input>
      </Form-item>
      <Form-item label="cdn绑定ip" prop="cdn_ip">
        <Input type="text" v-model="form.cdn_ip" placeholder="请输入cdn绑定ip"></Input>
      </Form-item>
    </Form>
    <div slot="footer">
      <Button type="success" size="large" :loading="modal_loading" @click="submitFtp">保存</Button>
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
          cdn_type: [
            {required: true, message: '请输入名称', trigger: 'blur'},
          ],
          cdn_ip: [
            {required: true, message: '请输入cdn ip地址', trigger: 'blur'},
          ],
        }
      }
    },
    methods: {
      submitFtp(){
        this.$refs.cdn.validate((valid) => {
          if (valid) {
            let data = this.form;
            let id = this.cdn_id;
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
      cdn_id:Number
    },
    mixins:[http]
  }

</script>
<style>


</style>

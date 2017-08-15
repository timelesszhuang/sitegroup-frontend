<style>
  .user-edit-form {
    padding: 20px;
  }
</style>
<template>
  <div>
    <Modal
      v-model="modal">
      <p slot="header" style="color:#f60;">
        <Icon type="information-circled"></Icon>
        <span>添加C类关键词</span>
      </p>
      <div>
        <Form ref="ckeywordadd" :model="form" :label-width="90" :rules="akeyWordRule" class="company-add-form">
          <Form-item label="C类关键词" prop="name">
            <Input v-model="form.name" type="textarea" placeholder="请输入C类关键词"></Input>
          </Form-item>
        </Form>
      </div>
      <div slot="footer">
        <Button type="success" size="large" :loading="modal_loading" @click="addAkeyword">保存</Button>
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
          name: ''
        },
        akeyWordRule: {
          name: [
            {required: true, message: '请填写C类 关键词', trigger: 'blur'},
          ],
        },
      }
    },
    methods: {
      addAkeyword()
      {
        this.$refs.ckeywordadd.validate((valid) => {
          if (valid) {
            this.modal_loading = true;
            let data = this.form;
            this.apiPost('keyword/insertA', data).then((res) => {
              this.handelResponse(res, (data, msg) => {
                this.modal = false;
                this.$Message.success(msg);
                this.modal_loading = false;
                this.$refs.ckeywordadd.resetFields();
                setTimeout(function () {
                  location.reload();
                }, 1000);
              }, (data, msg) => {
                this.modal_loading = false;
                this.$Message.error(msg);
              })
            }, (res) => {
              //处理错误信息
              this.$Message.error('网络异常，请稍后重试。');
              this.modal_loading = false;
            })
          } else {
            return false;
          }
        })
      }
    },
    mixins: [http]
  }
</script>

<template>
  <div>
    <div>
      <Modal
        v-model="modal" width="600">
        <p slot="header">
          <span>修改</span>
        </p>
        <div>
          <Form ref="domainsave" :model="form" :label-width="90" :rules="AddRule">
            <Form-item label="域名" prop="domain">
              <Input type="text" v-model="form.domain" placeholder="请输入名称"></Input>
            </Form-item>
            <Form-item label="域名信息"prop="domain_info" >
              <Input type="text" v-model="form.domain_info" placeholder="请输入域名信息" ></Input>
            </Form-item>
            <Form-item label="注册人" >
              <Input type="text" v-model="form.registrant_user" placeholder="请输入注册人" ></Input>
            </Form-item>
            <Form-item label="注册电话" >
              <Input type="text" v-model="form.registrant_tel" placeholder="请输入注册电话" ></Input>
            </Form-item>
            <Form-item label="注册人邮箱" >
              <Input type="text" v-model="form.registrant_email" placeholder="请输入注册人邮箱" ></Input>
            </Form-item>
            <Form-item label="备案号" >
              <Input type="text" v-model="form.filing_num" placeholder="请输入备案号" ></Input>
            </Form-item>
            <Form-item label="备案信息" >
              <Input type="text" v-model="form.filing_info" placeholder="请输入备案信息" ></Input>
            </Form-item>
            <Form-item label="备案地点" >
              <Input type="text" v-model="form.filing_office" placeholder="请输入备案地点"></Input>
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
        AddRule: {
          domain: [
            {required: true, message: '请填写域名', trigger: 'blur'},
          ],
          registrant_user: [
            {required: true, message: '请输入注册人', trigger: 'blur'},
          ],
          registrant_tel: [
            {required: true, message: '请输入注册电话', trigger: 'blur'},
          ],
          registrant_email: [
            {required: true, message: '请输入注册人邮箱', trigger: 'blur'},
          ],
          filing_num: [
            {required: true, message: '请填写备案号', trigger: 'blur'},
          ]
        }
      }
    },
    methods: {
        add() {
          this.$refs.domainsave.validate((valid) => {
              if(valid){
                this.modal_loading = true;
                let data = this.form;
                let id = data.id;
                this.apiPut('domain/'+ id, data).then((res) => {
                  this.handelResponse(res, (data, msg) => {
                    this.modal = false;
                    this.$parent.getData();
                    this.$Message.success(msg);
                    this.modal_loading = false;
                    this.$refs.domainsave.resetFields();
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
    props: {
      form: {
        default: {
          domain: '',
          domain_info:'',
          filing_info:'',
          registrant_user: '',
          registrant_tel: '',
          filing_office:'',
          registrant_email: '',
          filing_num:''
        }
      }
    },
    mixins: [http]
  }
</script>

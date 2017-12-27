<template>
  <div>
    <div>
      <Modal
        v-model="modal" width="600">
        <p slot="header">
          <span>修改</span>
        </p>
        <div>
          <Form ref="contactwaysave" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
            <Form-item label="配置名称" prop="name">
              <Input type="text" v-model="form.name" placeholder="请输入配置名称"></Input>
            </Form-item>
            <Form-item label="备注" prop="detail">
              <Input type="text" v-model="form.detail" placeholder="请输入分类名称"></Input>
            </Form-item>
            <Form-item label="电话" prop="telephone">
              <Input type="text" v-model="form.html.telephone" placeholder="请输入电话"></Input>
            </Form-item>
            <Form-item label="手机" prop="mobile">
              <Input type="text" v-model="form.html.mobile" placeholder="请输入手机"></Input>
            </Form-item>
            <Form-item label="邮箱" prop="email">
              <Input type="text" v-model="form.html.email" placeholder="请输入邮箱"></Input>
            </Form-item>
            <Form-item label="邮编" prop="zipcode">
              <Input type="text" v-model="form.html.zipcode" placeholder="请输入邮编"></Input>
            </Form-item>
            <Form-item label="地址" prop="address">
              <Input type="text" v-model="form.html.address" placeholder="请输入地址"></Input>
            </Form-item>
            <Form-item label="400电话" prop="four00">
              <Input type="text" v-model="form.html.four00" placeholder="请输入400电话"></Input>
            </Form-item>
            <Form-item label="QQ" prop="qq">
              <Input type="text" v-model="form.html.qq" placeholder="请输入QQ"></Input>
            </Form-item>
            <Form-item label="微信" prop="weixin">
              <Input type="text" v-model="form.html.weixin" placeholder="请输入微信"></Input>
            </Form-item>
            <Form-item label="传真" prop="fax">
              <Input type="text" v-model="form.html.fax" placeholder="请输入传真"></Input>
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
          name: [
            {required: true, message: '请填写配置名称', trigger: 'blur'},
          ],

        }
      }
    },
    methods: {
        add() {
          this.$refs.contactwaysave.validate((valid) => {
              if(valid){
                this.modal_loading = true;
                let data = this.form;
                let id = data.id;
                this.apiPut('contactway/'+ id, data).then((res) => {
                  this.handelResponse(res, (data, msg) => {
                    this.modal = false;
                    this.$parent.getData();
                    this.$Message.success(msg);
                    this.modal_loading = false;
//                    this.$refs.contactsave.resetFields();
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
          detail: '',
          name:'',
          html:{
            zipcode: '',
            fax: '',
            telephone:'',
            weixin:'',
            email:'',
            mobile:'',
            four00:'',
            qq:'',
          },
        }
      }
    },
    mixins: [http]
  }
</script>

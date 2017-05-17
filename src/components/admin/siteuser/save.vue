<template>
  <div>
    <div>
      <Modal
        v-model="modal" width="600">
        <p slot="header">
          <span>修改</span>
        </p>
        <div>
          <Form ref="siteusersave" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
            <Form-item label="名称" prop="detail">
              <Input type="text" v-model="form.name" placeholder="请输入名称"></Input>
            </Form-item>
            <Form-item label="名称" prop="account">
              <Input type="text" v-model="form.account" placeholder="请输入昵称"></Input>
            </Form-item>
            <Form-item label="密码" prop="pwd">
              <Input type="text" v-model="form.pwd" placeholder="请输入密码"></Input>
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
            {required: true, message: '请输入名称', trigger: 'blur'},
          ],
          account: [
            {required: true, message: '请输入昵称', trigger: 'blur'},
          ],
          pwd: [
            {required: true, message: '请输入密码', trigger: 'blur'},
          ]

        }
      }
    },
    methods: {
        add() {
          this.$refs.siteusersave.validate((valid) => {
              if(valid){
                this.modal_loading = true;
                let data = this.form;
                let id = data.id;
                this.apiPut('siteuser/'+ id, data).then((res) => {
                  this.handelResponse(res, (data, msg) => {
                    this.modal = false;
                    this.$parent.getData();
                    this.$Message.success(msg);
                    this.modal_loading = false;
//                    this.$refs.siteusersave.resetFields();
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
          name: '',
          pwd:'',
          account:''
        }
      }
    },
    mixins: [http]
  }
</script>

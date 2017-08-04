<template>
  <div>
    <div>
      <Modal
        v-model="modal" width="600">
        <p slot="header">
          <span>修改</span>
        </p>
        <div>
          <Form ref="wechatksave" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
            <Form-item label="关键词分类" prop="name">
              <Input type="text" v-model="form.name" placeholder="请输入关键词分类"></Input>
            </Form-item>
            <Form-item label="分类描述" prop="detail">
              <Input type="text" v-model="form.detail" placeholder="请输入分类描述"></Input>
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
            {required: true, message: '请输入关键词分类', trigger: 'blur'},
          ],
          detail:[
            {required: true,message:'请输入描述',trigger:'blur'}
          ]
        }
      }
    },
    methods: {
      add() {
        this.$refs.wechatksave.validate((valid) => {
          if(valid){
            this.modal_loading = true;
            let data = this.form;
            this.apiPost('sys/editKeywordType',data).then((res) => {
              this.handelResponse(res, (data, msg) => {
                this.modal = false;
                this.$parent.getData();
                this.$Message.success(msg);
                this.modal_loading = false;
                this.$refs.wechatksave.resetFields();
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
      form:{
        default:{
          name:'',
          detail:''
        }
      }
    },
    mixins: [http]
  }
</script>

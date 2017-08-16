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
            <Form-item label="描述" prop="detail">
              <Input type="text" v-model="form.detail" placeholder="请输入名称"></Input>
            </Form-item>
            <Form-item label="html" prop="html" style="height:100%;">
              <editor @change="updateData" :content="form.html"  :height="300"></editor>
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
          detail: [
            {required: true, message: '请填写描述', trigger: 'blur'},
          ],
          html: [
            {required: true, message: '请填写html', trigger: 'blur'},
          ]

        }
      }
    },
    methods: {
      updateData(data) {
        this.form.html = data
      },
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
          html:'',
        }
      }
    },
    mixins: [http]
  }
</script>

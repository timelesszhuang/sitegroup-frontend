<template>
  <div>
    <div>
      <Modal
        v-model="modal" width="600">
        <p slot="header">
          <span>修改标签名称</span>
        </p>
        <div>
          <Form ref="articlesave" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
            <Form-item label="标签名称" prop="tag">
              <Input type="text" v-model="form.tag" placeholder="请输入标签名称"></Input>
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
          tag: [
            {required: true, message: '请输入标签名称', trigger: 'blur'},
          ],
        }
      }
    },
    methods: {
      add() {
        this.$refs.articlesave.validate((valid) => {
          if(valid){
            this.modal_loading = true;
            let data = this.form;
            let id = data.id;
            this.apiPut('typetag/'+ id, data).then((res) => {
              this.handelResponse(res, (data, msg) => {
                this.modal = false;
                this.$parent.getData();
                this.$Message.success(msg);
                this.modal_loading = false;
                this.$refs.articlesave.resetFields();
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
          tag: '',
        }
      }
    },
    mixins: [http]
  }
</script>

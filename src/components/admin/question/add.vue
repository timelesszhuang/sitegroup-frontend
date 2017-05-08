<template>
  <div>
    <div>
      <Modal
        v-model="modal" width="600">
        <p slot="header">
          <span>添加问答</span>
        </p>
        <div>
          <Form ref="questionadd" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
            <Form-item label="问题名" prop="question">
              <Input type="text" v-model="form.question" placeholder="请填写问题名"></Input>
            </Form-item>
            <Form-item label="答案" prop="content_paragraph">
              <Input type="text" v-model="form.content_paragraph" placeholder="请填写答案"></Input>
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
        form: {
          question: "",
          content_paragraph: ""
        },
        AddRule: {
          question: [
            {required: true, message: '请填写问题名', trigger: 'blur'},
          ],
          content_paragraph: [
            {required: true, message: '请填写答案', trigger: 'blur'},
          ]
        }
      }
    },
    methods: {
        add() {
          this.$refs.questionadd.validate((valid) => {
              if(valid){
                this.modal_loading = true;
                let data = this.form;
                this.apiPost('question', data).then((res) => {
                  this.handelResponse(res, (data, msg) => {
                    this.modal = false;
                    this.$parent.getData();
                    this.form = {};
                    this.$Message.success(msg);
                    this.modal_loading = false;
                    this.$refs.questionadd.resetFields();
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
    mixins: [http]
  }

</script>
<style>


</style>

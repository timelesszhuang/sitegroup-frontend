<template>
  <div>
    <div>
      <Modal
        v-model="modal" width="600">
        <p slot="header">
          <span>修改问答</span>
        </p>
        <div>
          <Form ref="questionadd" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
            <Form-item label="问题名称" prop="question">
              <Input type="text" v-model="form.question" placeholder="请填写文章分类"></Input>
            </Form-item>
            <Form-item label="详情" prop="content_paragraph">
              <Input v-model="form.content_paragraph" type="textarea" :autosize="{minRows: 2,maxRows: 20}"
                     placeholder="请输入答案">
              </Input>
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
                let data={
                    id:this.form.id,
                  question:this.form.question,
                  content_paragraph:this.form.content_paragraph
                }
                let id = data.id;
                this.apiPut('question/'+ id, data).then((res) => {
                  this.handelResponse(res, (data, msg) => {
                    this.modal = false;
                    this.$parent.getData();
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
    props: {
      form: {
        default: {
          question: '',
          content_paragraph: ''
        }
      }
    },
    mixins: [http]
  }
</script>

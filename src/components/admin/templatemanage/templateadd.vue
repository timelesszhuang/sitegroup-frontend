<template>
  <Modal v-model="modal1" title="添加模板"  width="700">
    <Form ref="formInline" :model="form" :rules="ruleInline">
      <Form-item prop="filename">
        <Row>
          <Col span="4">
          文件名:</Col>
          <Col span="20">
            <Input v-model="form.filename" placeholder="请输入..." style="width: 300px"></Input>
          </Col>
        </Row>
      </Form-item>
      <Form-item prop="content">
        <Row>
          <Col span="4">
          内容:</Col>
          <Col span="20">
            <Input v-model="form.content" type="textarea" :rows="7"></Input>
          </Col>
        </Row>
      </Form-item>
    </Form>
    <div slot="footer">
      <Button type="success" size="large" :loading="modal_loading" @click="ok">保存</Button>
    </div>
  </Modal>

</template>

<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';

  export default {
    data() {
      return {
        modal1: false,
        modal_loading:false,
        form:{
          filename: '',
          content: ''
        },
        ruleInline:{
          filename: [
            {required: true, message: '请填写文件名称', trigger: 'blur'},
          ],
          content: [
            {required: true, message: '请填写内容', trigger: 'blur'},
          ]
        }
      }
    },
    methods: {
      ok() {
        this.$refs.formInline.validate((valid)=>
        {
          if (valid) {
            this.apiPost('templateAdd/' + this.site_id + '/' + this.form.filename, {content: this.form.content}).then((res) => {
              this.handelResponse(res, (data, msg) => {
                this.modal1 = false;
                this.$Message.success(msg);
                this.$refs.formInline.resetFields();
              }, (data, msg) => {
                this.$Message.error('没有获取到');
              })
            }, (res) => {
              //处理错误信息
              this.$Message.error('网络异常，请稍后重试。');
            });
          }else{

          }
        })

      }
    },
    props: {
      site_id: {
        default: {
          type: String
        }
      }
    },
    mixins: [http]
  }

</script>

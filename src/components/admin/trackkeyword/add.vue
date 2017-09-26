<template>
  <div>
    <div>
      <Modal
        v-model="modal" width="900">
        <p slot="header">
          <span>追踪关键词</span>
        </p>
        <div>
          <Form ref="keywordadd" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
            <Form-item label="追踪关键词" prop="keyword">
              <Input type="text" v-model="form.keyword" placeholder="请填写追踪关键词"></Input>
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
          keyword: "",
        },
        AddRule: {
          keyword: [
            {required: true, message: '请填写追踪关键词', trigger: 'blur'},
          ],
        }
      }
    },
    methods: {
        add() {
          this.$refs.keywordadd.validate((valid) => {
              if(valid){
                this.modal_loading = true;
                let data = this.form;
                this.apiPost('admin/trackKeyword', data).then((res) => {
                  this.handelResponse(res, (data, msg) => {
                    this.modal = false;
                    this.$parent.getData();
                    this.$Message.success(msg);
                    this.modal_loading = false;
                    this.$refs.keywordadd.resetFields();
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

<template>
  <div>
    <div>
      <Modal
        v-model="modal" width="600">
        <p slot="header">
          <span>添加</span>
        </p>
        <div>
          <Form ref="eventmarketingholidayadd" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
            <Form-item label="节日名称" prop="name">
              <Input type="text" v-model="form.name" placeholder="请输入标题"></Input>
            </Form-item>
            <Form-item label="日期" prop="time">
              <Date-picker type="daterange" v-model="form.time" placement="bottom-end" placeholder="选择日期"></Date-picker>
            </Form-item>
            <Form-item label="日期" prop="lunar">
              <Input type="text" v-model="form.lunar" placeholder="请输入当前节日的阴历"></Input>
            </Form-item>
            <Form-item label="desc" prop="desc">
              <Input type="textarea" v-model="form.desc" :rows="4" placeholder="请输入来源"></Input>
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
        form: {},
        AddRule: {
//          title: [
//            {required: true, message: '请输入标题', trigger: 'blur'},
//          ],
//          source: [
//            {required: true, message: '请输入来源', trigger: 'blur'},
//          ],
//          content: [
//            {required: true, message: '请输入案例内容', trigger: 'blur'},
//          ],
//          summary: [
//            {required: true, message: '请输入核心解读', trigger: 'blur'},
//          ],
        }
      }
    },
    methods: {
      add() {
        this.$refs.eventmarketingholidayadd.validate((valid) => {
          if (valid) {
            this.modal_loading = true;
            let data = this.form;
            this.apiPost('sys/eventmarketholiday', data).then((res) => {
              this.handelResponse(res, (data, msg) => {
                this.modal = false;
                this.$parent.getData();
                this.$Message.success(msg);
                this.modal_loading = false;
                this.$refs.eventmarketingholidayadd.resetFields();
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

<style>
  .industry-add-form {
    padding: 20px;
  }
</style>
<template>
  <div>
    <Modal
      v-model="modal" width="600">
      <p slot="header">
        <!--<Icon type="person-add"></Icon>-->
        <span>修改行业分类</span>
      </p>
      <div>
        <Form ref="industryadd" :model="form" :label-width="90" :rules="IndustryAddRule" class="industry-add-form">
          <Form-item label="行业" prop="name">
            <Input type="text" v-model="form.name" placeholder="请输入行业" style="width: 250px"></Input>
          </Form-item>
          <Form-item label="描述" prop="detail">
            <Input type="text" v-model="form.detail" placeholder="请输入描述"></Input>
          </Form-item>
          <Form-item label="排序" prop="sort">
            <Input-number v-model="form.sort"></Input-number>
          </Form-item>
        </Form>
      </div>
      <div slot="footer">
        <Button type="success" size="large" :loading="modal_loading" @click="add">保存</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import http from '../../../assets/js/http.js'
  export default {
    data () {
      return {
        modal: false,
        modal_loading: false,
        form: {
          name: '',
          detail: '',
          sort: 0,
        },
        IndustryAddRule: {
          name: [
            {required: true, message: '请填写行业名', trigger: 'blur'},
          ],
          detail: [
            {required: true, message: '请填写描述或行业详情', trigger: 'blur'},
          ]
        },
      }
    },
    methods: {
      add()
      {
        this.$refs.industryadd.validate((valid) => {
          if (valid) {
            this.modal_loading = true;
            let data = this.form;
            this.apiPost('industry', data).then((res) => {
              this.handelResponse(res, (data, msg) => {
                this.modal = false;
                this.$parent.getData();
                this.form = {};
                this.$Message.success(msg);
                this.modal_loading = false;
                this.$refs.industryadd.resetFields();
              }, (data, msg) => {
                this.modal_loading = false;
                this.$Message.error(msg);
              })
            }, (res) => {
              //处理错误信息
              this.modal_loading = false;
              this.$Message.error('网络异常，请稍后重试。');
            })
          } else {
            return false;
          }
        })
      }
    },
    mixins: [http]
  }
</script>

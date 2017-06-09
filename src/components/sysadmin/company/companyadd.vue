<style>
  .company-add-form {
    padding: 20px;
  }
</style>
<template>
  <div>
    <Modal
      v-model="modal" width="600">
      <p slot="header"><!--
        <Icon type="person-add"></Icon>-->
        <span>添加公司</span>
      </p>
      <div>
        <Form ref="companyadd" :model="form" :label-width="90" :rules="companyAddRule" class="company-add-form">
          <Form-item label="公司名" prop="name">
            <Input type="text" v-model="form.name" placeholder="请输入公司名"></Input>
          </Form-item>
          <Form-item label="简称" prop="short_name">
            <Input type="text" v-model="form.short_name" placeholder="请输入简称" style="width: 150px;"></Input>
          </Form-item>
          <Form-item label="URL" prop="url">
            <Input type="text" v-model="form.url" placeholder="请输入url"></Input>
          </Form-item>
          <Form-item label="法人" prop="artificialperson">
            <Input type="text" v-model="form.artificialperson" placeholder="请输入法人"></Input>
          </Form-item>
          <Form-item label="行业分类" prop="industry_id">
            <Select v-model="form.industry_id" style="width:150px;text-align: left"
                    label-in-value　@on-change="changeIndustry">
              <Option v-for="item in industry" :value="item.id" :label="item.name" :key="item">
                {{ item.name }}
              </Option>
            </Select>
          </Form-item>
          <Form-item label="主营业务" prop="manbusiness">
            <Input type="text" v-model="form.manbusiness"></Input>
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
        label_in_value: true,
        form: {
          name: '',
          short_name: '',
          manbusiness: '',
          industry_id: 0,
          industry_name: '',
          url: '',
          artificialperson: '',
        },
        companyAddRule: {
          name: [
            {required: true, message: '请填写公司名', trigger: 'blur'},
          ],
          short_name: [
            {required: true, message: '请填写简称', trigger: 'blur'},
          ],
          artificialperson: [
            {required: true, message: '请输入法人', trigger: 'blur'},
          ],
          manbusiness: [
            {required: true, message: '请输入主营业务', trigger: 'blur'},
          ],
        }
      }
    },
    methods: {
      changeIndustry(value){
        this.form.industry_name = value.label;
        this.form.industry_id = value.value;
      },
      add()
      {
        if (!this.form.industry_id) {
          this.$Message.error('请选择行业分类');
          return
        }
        this.$refs.companyadd.validate((valid) => {
          if (valid) {
            this.modal_loading = true;
            let data = this.form;
            this.apiPost('company', data).then((res) => {
              this.handelResponse(res, (data, msg) => {
                this.modal = false;
                this.$parent.getData();
                this.form = {};
                this.$Message.success(msg);
                this.modal_loading = false;
                this.$refs.companyadd.resetFields();
              }, (data, msg) => {
                this.modal_loading = false;
                this.$Message.error(msg);
              })
            }, (res) => {
              //处理错误信息
              this.modal_loading = true;
              this.$Message.error('网络异常，请稍后重试。');
            })
          } else {
            return false;
          }
        })
      }
      ,
    },
    props: {
      industry: {
        default: []
      },
    },
    mixins: [http]
  }
</script>

<style>
  .change-pwd-form {
    padding: 20px;
  }
</style>
<template>
  <div>
    <Modal
      v-model="modal" width="600"
      title="企业信息">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>企业信息</span>
      </p>
      <div style="text-align:center">
        <Form style="text-align: left" ref="company" :model="form" :label-width="150" class="change-pwd-form">
          <Form-item label="公司名称:">
            <span>{{form.name}}</span>
          </Form-item>
          <Form-item label="行业分类:">
            <span>{{form.industry_name}}</span>
          </Form-item>
          <Form-item label="税务登记号:">
            <span>{{form.tax_registration_number}}</span>
          </Form-item>
          <Row>
            <Col span="6">
            <div style="width: 150px;text-align:right;">企业营业执照
            </div>
            </Col>
          </Row>

          <div style="margin: 0 auto"><img style="max-width:350px;display:block;margin: 0 auto;" :src=Path()></div>
          <Form-item label="机构(企业)地址:" prop="address">
            <span>{{form.address}}</span>
          </Form-item>

          <Form-item label="法人姓名:" prop="artificialperson">
            <span>{{form.artificialperson}}</span>
          </Form-item>
          <Row>
            <Col span="5">
            <div style="width: 150px;text-align:right;">法人身份证:
            </div>
            </Col>

          </Row>
          <div style="margin: 0 auto"><img style="max-width:350px;display:block;margin: 0 auto;" :src=personPath()>
          </div>
          <Form-item style="text-align: left" label="(法人)联系电话:">
            <span>{{form.artificialperson_phone}}</span>
          </Form-item>
          <Form-item style="text-align: left" label="营销系统负责人:">
            <span>{{form.sale_manage}}</span>
          </Form-item>
          <Form-item style="text-align: left" label="营销系统负责人联系电话:">
            <span>{{form.sale_manage_phone}}</span>
          </Form-item>
          <Form-item style="text-align: left" label="营销系统负责人联系邮箱:">
            <span>{{form.sale_manage_email}}</span>
          </Form-item>
          <Form-item style="text-align: left" label="企业主页网址:">
            <span>{{form.url}}</span>
          </Form-item>
          <Form-item style="text-align: left" label="企业产品商标名称:">
            <span>{{form.trademark_name}}</span>
          </Form-item>
          <Row>
            <Col span="6">
            <div style="width: 150px;text-align:right;">企业产品商标:
            </div>
            </Col>
          </Row>
          <div style="margin: 0 auto"><img style="max-width:350px;display:block;margin: 0 auto;" :src=trademarkPath()>
          </div>
          <Form-item style="text-align: left" label="主营业务:" prop="manbusiness">
            <span>{{form.manbusiness}}</span>
          </Form-item>
        </Form>
      </div>
      <div slot="footer">

      </div>
    </Modal>
  </div>
</template>
<script>
  import http from '../../assets/js/http.js';

  export default {
    data() {
      return {
        modal: false,
        modal_loading: false,


      }
    },
    created() {

    },
    methods: {
      Path() {
        if (!this.form.business_license) {
          return ROOTHOST;
        }
        return ROOTHOST + this.form.business_license;
      },
      personPath() {
        if (!this.form.artificialperson_id) {
          return ROOTHOST;
        }
        return ROOTHOST + this.form.artificialperson_id;
      },
      trademarkPath() {
        if (!this.form.trademark_img) {
          return ROOTHOST;
        }
        return ROOTHOST + this.form.trademark_img;
      },


    },
    props: {
      form: {
        id: Number,
        name: '',
        tax_registration_number: "",
        artificialperson: '',
        url: '',
        manbusiness: "",
        industry_name: '',
        trademark_img: '',
        trademark_name: '',
        sale_manage_email: "",
        sale_manage_phone: '',
        sale_manage: '',
        artificialperson_phone: '',
        address: '',
        business_license: '',
        artificialperson_id: '',
      },

    },
    mixins: [http]
  }
</script>

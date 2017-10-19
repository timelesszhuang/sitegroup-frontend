<style>
  .change-pwd-form {
    padding: 20px;
  }
</style>
<template>
  <div>
    <Modal
      v-model="modal" width="700"
      title="完善企业信息"
      ok-text="保存">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>完善企业信息</span>
      </p>
      <div style="text-align:center">
        <Form ref="company" :model="form" :label-width="200" :rules="companyRule" class="change-pwd-form">
         <Alert v-if="form.is_checked==3">审核状态:已审核</Alert>
          <Alert type="error" v-if="form.is_checked==0">请完善信息</Alert>
          <Alert type="error" v-if="form.is_checked==2">审核失败原因:{{form.check_info}}</Alert>
          <Alert type="error" v-if="form.is_checked==1">审核状态:未审核</Alert>
          <Form-item label="公司名称" prop="name">
            <Input type="text" v-model="form.name" placeholder="请输入公司名称"></Input>
          </Form-item>
          <Form-item label="行业分类" prop="industry_id">
            <Select v-model="form.industry_id" style="width:350px;text-align: left;float: left"
                    label-in-value　@on-change="changeIndustry">
              <Option v-for="item in industry" :value="item.id" :label="item.name" :key="item">
                {{ item.name }}
              </Option>
            </Select>
          </Form-item>
          <Form-item label="税务登记号" prop="tax_registration_number">
            <Input type="text" v-model="form.tax_registration_number" placeholder="请输入税务登记号"></Input>
          </Form-item>
          <Row>
            <Col span="8">
            <div style="width: 200px;text-align:right;">上传企业营业执照
            </div>
            </Col>
            <Col span="16">
            <div style="float: left">
              <Upload
                ref="businesslicense"
                with-credentials
                name="businesslicense"
                :format="['jpg','jpeg','png']"
                :on-success="getResponse"
                :on-error="getErrorInfo"
                :on-format-error="formatError"
                :action="action">
                <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
              </Upload>
            </div>
            </Col>
          </Row>

          <div style="margin: 0 auto"><img style="max-width:350px " :src=Path()></div>
          <Form-item label="机构(企业)地址" prop="address">
            <Input type="text" v-model="form.address" placeholder="请输入机构(企业)地址"></Input>
          </Form-item>

          <Form-item label="法人姓名" prop="artificialperson">
            <Input type="text" v-model="form.artificialperson" placeholder="请输入法人姓名"></Input>
          </Form-item>
          <Row>
            <Col span="8">
            <div style="width: 200px;text-align:right;">上传法人身份证
            </div>
            </Col>
            <Col span="16">
            <div style="float: left">
              <Upload
                ref="artificialpersonid"
                with-credentials
                name="artificialpersonid"
                :format="['jpg','jpeg','png']"
                :on-success="getRes"
                :on-error="getError"
                :on-format-error="formatErr"
                :action="actionperson">
                <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
              </Upload>
            </div>
            </Col>
          </Row>
          <div style="margin: 0 auto"> <img style="max-width:350px " :src=personPath()></div>
          <Form-item label="(法人)联系电话" prop="artificialperson_phone">
            <Input type="text" v-model="form.artificialperson_phone" placeholder="请输入(法人)联系电话"></Input>
          </Form-item>
          <Form-item label="营销系统负责人" prop="sale_manage">
            <Input type="text" v-model="form.sale_manage" placeholder="请输入营销系统负责人"></Input>
          </Form-item>
          <Form-item label="营销系统负责人联系电话" prop="sale_manage_phone">
            <Input type="text" v-model="form.sale_manage_phone" placeholder="请输入营销系统负责人联系电话"></Input>
          </Form-item>
          <Form-item label="营销系统负责人联系邮箱" prop="sale_manage_email">
            <Input type="text" v-model="form.sale_manage_email" placeholder="请输入营销系统负责人联系邮箱"></Input>
          </Form-item>
          <Form-item label="企业主页网址" prop="url	">
            <Input type="text" v-model="form.url	" placeholder="请输入企业主页网址"></Input>
          </Form-item>
          <Form-item label="企业产品商标名称" prop="trademark_name">
            <Input type="text" v-model="form.trademark_name" placeholder="请输入企业产品商标名称"></Input>
          </Form-item>
          <Row>
            <Col span="8">
            <div style="width: 200px;text-align:right;">上传企业产品商标
            </div>
            </Col>
            <Col span="16">
            <div style="float: left">
              <Upload
                ref="trademark"
                with-credentials
                name="trademark"
                :format="['jpg','jpeg','png']"
                :on-success="getRe"
                :on-error="getErr"
                :on-format-error="formatE"
                :action="trademarkurl">
                <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
              </Upload>
            </div>
            </Col>
          </Row>
          <div style="margin: 0 auto"><img style="max-width:350px" :src=trademarkPath()></div>
          <Form-item label="主营业务" prop="manbusiness">
            <Input v-model="form.manbusiness" type="textarea" :rows="4" placeholder="请输入主营业务..."></Input>
          </Form-item>
        </Form>
      </div>
      <div slot="footer">
        <Button type="success" size="large" :loading="modal_loading" @click="add">添加</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import http from '../../assets/js/http.js'

  export default {
    data() {
      const checkindustry = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请选择行业分类'));
        } else {
          callback();
        }
      };
      return {
        modal: false,
        modal_loading: false,
        action: HOST + 'admin/uploadBusinessLicense',
        actionperson: HOST + 'admin/uploadArtificialPersonId',
        trademarkurl: HOST + 'admin/uploadTrademark',
        industry: [],

        companyRule: {
          name: [
            {required: true, message: '请输入公司名称', trigger: 'blur'},
          ],
          tax_registration_number: [
            {required: true, message: '请输入税务登记号', trigger: 'blur'},
          ],
          artificialperson: [
            {required: true, message: '请输入法人姓名', trigger: 'blur'},
          ],
          sale_manage: [
            {required: true, message: '请输入营销系统负责人', trigger: 'blur'},
          ],
          sale_manage_phone: [
            {required: true, message: '请输入营销系统负责人联系电话', trigger: 'blur'},
          ],
          sale_manage_email: [
            {required: true, message: '请输入营销系统负责人联系邮箱', trigger: 'blur'},
          ],
          artificialperson_phone: [
            {required: true, message: '请输入营销系统负责人联系电话', trigger: 'blur'},
          ],
          manbusiness: [
            {required: true, message: '请输入主营业务', trigger: 'blur'},
          ],
          trademark_name: [
            {required: true, message: '请输入企业产品商标名称', trigger: 'blur'},
          ],
          industry_id: [
            {required: true,validator: checkindustry, trigger: 'blur'}
          ]
        }

      }
    },
    created() {
      this.getIndustry();
    },
    methods: {
      Path() {
        if(!this.form.business_license){
          return ROOTHOST;
        }
        return ROOTHOST + this.form.business_license;
      },
      personPath() {
        if(!this.form.artificialperson_id){
          return ROOTHOST;
        }
        return ROOTHOST + this.form.artificialperson_id;
      },
      trademarkPath() {
        if(!this.form.trademark_img){
          return ROOTHOST;
        }
        return ROOTHOST + this.form.trademark_img;
      },
      getResponse(response, file, filelist) {
        this.form.business_license = response.data;
        this.$Message.success(response.msg);

        this.Path()
      },
      getRes(respons, file, filelist) {
        this.form.artificialperson_id = respons.data;
        this.$Message.success(respons.msg);
        this.$refs.artificialpersonid.clearFiles()
        this.personPath()
      },
      getRe(respon, file, filelist) {
        this.form.trademark_img = respon.data;
        this.$Message.success(respon.msg);
        this.trademarkPath()
      },
      getErrorInfo(error, file, filelist) {
        this.$Message.error(error);
      },
      getError(error, file, filelist) {
        this.$Message.error(error);
      },
      getErr(error, file, filelist) {
        this.$Message.error(error);
      },
      formatError() {
        this.$Message.error('文件格式只支持 jpg,jpeg,png三种格式。');
      },
      formatErr() {
        this.$Message.error('文件格式只支持 jpg,jpeg,png三种格式。');
      },
      formatE() {
        this.$Message.error('文件格式只支持 jpg,jpeg,png三种格式。');
      },
      changeIndustry(value) {
        this.form.industry_name = value.label;
        this.form.industry_id = value.value;
      },
      getIndustry() {
        this.apiGet('admin/getIndustry').then((res) => {
          this.handelResponse(res, (data, msg) => {
            this.industry = data;
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (res) => {
          //处理错误信息
          this.$Message.error('网络异常，请稍后重试。');
        });
      },
      add() {
        if (!this.form.business_license) {
          this.$Message.error('请首先上传营业执照。');
          return
        }
        if (!this.form.artificialperson_id) {
          this.$Message.error('请首先上传法人身份证。');
          return
        }
        this.$refs.company.validate((valid) => {
          if (valid) {
            this.modal_loading = true;
            let data = this.form;

            this.apiPut('admin/Company/' + data.id, data).then((res) => {
              this.handelResponse(res, (data, msg) => {
                this.modal = false;
                this.$Message.success(msg);
                this.modal_loading = false;
                this.$refs.mediaadd.resetFields();
                this.$refs.select.clearSingleSelect()
                this.$refs.select2.clearSingleSelect()
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

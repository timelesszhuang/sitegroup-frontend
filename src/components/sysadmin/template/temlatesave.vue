<template>
  <div>
    <div>
      <Modal
        v-model="modal" width="600">
        <p slot="header">
          <span>修改</span>
        </p>
        <div>
          <Upload
            ref="imgupload"
            with-credentials
            name="file"
            :format="['jpg','jpeg','png']"
            :on-success="getRes"
            :on-error="getError"
            :on-format-error="formatErr"
            :action="imgaction"
            style="margin: 0 auto;width: 100px">
            <Button type="ghost" icon="ios-cloud-upload-outline">上传缩略图</Button>
          </Upload>
          <div style="margin: 0 auto;width: 500px"><img style="max-width:300px;margin: 0 auto;display: block" :src=imgPath()></div>
          <Upload
            ref="showpathup"
            type="drag"
            with-credentials
            name="file"
            :format="['zip']"
            :on-success="getRespon"
            :on-error="getE"
            :on-format-error="formatE"
            :action="beforeaction">
            <div style="padding: 20px 0">
              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
              <p>点击或将原始模板文件拖拽到这里上传</p>
            </div>
          </Upload>
          <Upload
            ref="pathup"
            type="drag"
            with-credentials
            name="file"
            :format="['zip']"
            :on-success="getResponse"
            :on-error="getErrorInfo"
            :on-format-error="formatError"
            :action="action">
            <div style="padding: 20px 0">
              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
              <p>点击或将php模板文件拖拽到这里上传</p>
            </div>
          </Upload>
          <Form ref="templatesave" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
            <Form-item label="下载">
              <a v-bind:href="downloadPath" target="_blank">点击下载php模板</a>
            </Form-item>
            <Form-item label="预览">
              <a v-bind:href="showPathdown" target="_blank">点击预览模板</a>
            </Form-item>
            <Form-item label="模板名" prop="name">
              <Input type="text" v-model="form.name" placeholder="请输入模板名"></Input>
            </Form-item>
            <Form-item label="行业分类" prop="industry_id">
              <Select v-model="form.industry_id" style="width:150px;text-align: left"
                      label-in-value　@on-change="changeIndustry">
                <Option v-for="item in industry" :value="item.id" :label="item.name" :key="item">
                  {{ item.name }}
                </Option>
              </Select>
            </Form-item>
            <Form-item label="模板说明" prop="detail">
              <Input type="text" v-model="form.detail" placeholder="请输入模板说明（模板的相关信息）"></Input>
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
        action: HOST + 'sys/uploadphptemplate',
        beforeaction: HOST + 'sys/uploadtemplate',
        imgaction: HOST + 'sys/uploadthumbnails',
        AddRule: {
          name: [
            {required: true, message: '请填写模板名', trigger: 'blur'},
          ],
          detail: [
            {required: true, message: '请填写模板说明', trigger: 'blur'},
          ],
        }
      }
    },
    computed: {
      downloadPath: function () {
        return this.form.path_oss;
      },
      showPathdown: function () {
        return    ROOTHOST+ this.form.show_path_href;
      },
    },
    methods: {
      imgPath(){
        if(!this.form.thumbnails){
          return ROOTHOST;
        }
        return this.form.thumbnails;
      },
      changeIndustry(value) {
        this.form.industry_name = value.label;
        this.form.industry_id = value.value;
      },
      getResponse(response, file, filelist) {
        this.form.path_oss = response.data;
        this.$Message.success(response.msg);
//        this.$refs.pathup.clearFiles()
      },
      getRes(respons, file, filelist) {
        this.form.thumbnails = respons.data;
        this.$Message.success(respons.msg);
       this.imgPath()
//        this.$refs.imgupload.clearFiles()
      },
      getRespon(respon, file, filelist) {
        this.form.show_path = respon.data.url;
        this.form.show_path_href = respon.data.data;
        if(respon.status == "failed"){
          this.$Message.error(respon.msg);
          this.$refs.showpathup.clearFiles()
        }else {
          this.$Message.success(respon.msg);
        }
      },
      getErrorInfo(error, file, filelist) {
        this.$Message.error(error);
      },
      getError(error, file, filelist) {
        this.$Message.error(error);
      },
      getE(error, file, filelist) {
        this.$Message.error(error);
      },
      formatError() {
        this.$Message.error('文件格式只支持 zip格式。');
      },
      formatErr() {
        this.$Message.error('文件格式只支持 jpg,jpeg,png三种格式。');
      },
      formatE() {
        this.$Message.error('文件格式只支持 zip格式。');
      },
      add() {
        this.$refs.templatesave.validate((valid) => {
          if (valid) {
            this.modal_loading = true;
            let data = this.form;
            let id = data.id;
            this.apiPut('sys/template/' + id, data).then((res) => {
              this.handelResponse(res, (data, msg) => {
                this.modal = false;
                this.$parent.getData();
                this.$Message.success(msg);
                this.modal_loading = false;
                this.$refs.templatesave.resetFields();
//                this.$refs.uploadzip.clearFiles()
                this.$refs.pathup.clearFiles();
                this.$refs.imgupload.clearFiles()
                this.$refs.showpathup.clearFiles()
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
      industry: {
        default: []
      },
      form: {
        default: {
          name: '',
          detail: '',
          path: '',
          industry_id: Number(),
          industry_name: '',
        }
      }
    },
    mixins: [http]
  }
</script>

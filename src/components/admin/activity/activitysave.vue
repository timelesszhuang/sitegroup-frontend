<template>
  <div>
    <Modal
      v-model="modal" width="900">
      <p slot="header">
        <span>修改模板</span>
      </p>
      <div>
        <Upload
          type="drag"
          with-credentials
          name="file_name"
          ref="upload"
          :format="['zip']"
          :on-success="getResponse"
          :on-error="getErrorInfo"
          :on-format-error="formatError"
          :action="action">
          <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>重新上传文件</p>
          </div>
        </Upload>
        <Form ref="save" :model="form" :label-width="90" :rules="SaveRule" class="node-add-form">
          <Form-item label="下载">
            <a v-bind:href="downloadPath" target="_blank">点击下载模板</a>
          </Form-item>
          <Form-item label="预览">
            <a v-bind:href="viewPath" target="_blank">点击预览模板</a>
          </Form-item>
          <Form-item label="标题" prop="title">
            <Input type="text" v-model="form.name" placeholder="请输入活动/创意名"></Input>
          </Form-item>
          <Form-item label="活动/创意信息" prop="come_from">
            <Input type="text" v-model="form.detail" placeholder="请输入模板活动/创意相关信息" style="width: 200px;"></Input>
          </Form-item>
          <Form-item label="文件夹名称" prop="directory_name">
            <Input type="text" v-model="form.directory_name" placeholder="文件夹名称"></Input>
          </Form-item>
        </Form>
      </div>
      <div slot="footer">
        <Button type="success" size="large" :loading="modal_loading" @click="activitysave">保存</Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';
  export default {
    data() {
      return {
        modal: false,
        modal_loading: false,
        action: HOST + 'activity/uploadActivity',
        SaveRule: {
          name: [
            {required: true, message: '请填写活动/创意名', trigger: 'blur'},
          ],
          detail: [
            {required: true, message: '请填写活动/创意详情', trigger: 'blur'},
          ],
          directory_name:[
            {required:true,message:'请填写活动文件夹名',trigger:'blur'}
          ]
        }
      }
    },
    computed: {
      downloadPath: function () {
        return ROOTHOST + this.form.code_path;
      },
      viewPath: function () {
        return ROOTHOST + this.form.demo_path;
      }
    },
    methods: {
      getResponse(response, file, filelist){
        this.form.code_path = response.data.code_path;
        this.$Message.success(response.msg);
      },
      getErrorInfo(error, file, filelist){
        this.$Message.error(error);
      },
      formatError(){
        this.$Message.error('文件格式只支持 zip格式。');
      },
      activitysave() {
        this.$refs.save.validate((valid) => {
          if (valid) {
            this.modal_loading = true;
            let data = this.form;
            let id = data.id;
            this.apiPut('activity/' + id, data).then((res) => {
              this.handelResponse(res, (data, msg) => {
                this.modal = false;
                this.$parent.getData();
                this.$Message.success(msg);
                this.modal_loading = false;
                this.$refs.save.resetFields();
                this.$refs.upload.clearFiles();
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
    mixins: [http],
    props: {
      form: {
        default: {
          name: "",
          detail: '',
          code_path: '',
          demo_path: ''
        }
      }
    }
  }
</script>

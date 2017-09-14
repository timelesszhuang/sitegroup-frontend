<template>
  <div>
    <div>
      <Modal
        v-model="modal" width="600">
        <p slot="header">
          <span>添加模板</span>
        </p>
        <div>
          <Upload
            type="drag"
            ref="uploadzip"
            with-credentials
            name="file_name"
            :format="['zip']"
            :on-success="getResponse"
            :on-error="getErrorInfo"
            :on-format-error="formatError"
            :action="action">
            <div style="padding: 20px 0">
              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
              <p>点击或将模板文件拖拽到这里上传</p>
            </div>
          </Upload>
          <Form ref="templateadd" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
            <Form-item label="模板名" prop="name">
              <Input type="text" v-model="form.name" placeholder="请输入模板名"></Input>
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
        action: HOST + 'template/uploadtemplate',
        form: {
          name: "",
          detail: '',
          path: '',
        },
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
    methods: {
      getResponse(response, file, filelist){
        this.form.path = response.data;
        this.$Message.success(response.msg);
      },
      getErrorInfo(error, file, filelist){
        this.$Message.error(error);
      },
      formatError(){
        this.$Message.error('文件格式只支持 zip格式。');
      },
      add() {
        if (!this.form.path) {
          this.$Message.error('请首先上传模板文件。');
          return
        }
        this.$refs.templateadd.validate((valid) => {
          if (valid) {
            this.modal_loading = true;
            let data = this.form;
            this.apiPost('template/addTemplate', data).then((res) => {
              this.handelResponse(res, (data, msg) => {
                this.modal = false;
                this.$parent.getData();
                this.$Message.success(msg);
                this.modal_loading = false;
                this.$refs.templateadd.resetFields();
                this.$refs.uploadzip.clearFiles()
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

<template>
  <div>
    <div>
      <Modal
        v-model="modal" width="600">
        <p slot="header">
          <span>添加活动/创意</span>
        </p>
        <div>
          <Upload
            type="drag"
            with-credentials
            name="file_name"
            :format="['zip']"
            :on-success="getResponse"
            :on-error="getErrorInfo"
            :on-format-error="formatError"
            :action="action">
            <div style="padding: 20px 0">
              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
              <p>点击或将活动/创意文件拖拽到这里上传</p>
            </div>
          </Upload>
          <Form ref="activityadd" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
            <Form-item label="活动/创意名" prop="name">
              <Input type="text" v-model="form.name" placeholder="请输入活动/创意名"></Input>
            </Form-item>
            <Form-item label="活动说明" prop="detail">
              <Input type="text" v-model="form.detail" placeholder="请输入活动/创意说明（活动/创意的相关信息）"></Input>
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
        action: HOST + 'activity/uploadActivity',
        form: {
          name: "",
          detail: '',
          path: '',
        },
        AddRule: {
          name: [
            {required: true, message: '请填写活动/创意名', trigger: 'blur'},
          ],
          detail: [
            {required: true, message: '请填写活动/创意说明', trigger: 'blur'},
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
          this.$Message.error('请首先上传活动/创意文件。');
          return
        }
        this.$refs.activityadd.validate((valid) => {
          if (valid) {
            this.modal_loading = true;
            let data = this.form;
            this.apiPost('activity/addActivity', data).then((res) => {
              this.handelResponse(res, (data, msg) => {
                this.modal = false;
                this.$parent.getData();
                this.$Message.success(msg);
                this.modal_loading = false;
                this.$refs.activityadd.resetFields();
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

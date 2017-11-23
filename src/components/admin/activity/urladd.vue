<template>
  <div>
    <div>
      <Modal
        v-model="modal"
        width="900"
        :styles="{top: '20px'}"
      >
        <p slot="header">
          <span>添加</span>
        </p>
        <div>
          <Form ref="padd" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
            <Form-item label="标题" prop="title">
              <Input type="text" v-model="form.title" placeholder="请输入活动标题"></Input>
            </Form-item>
            <Form-item label="活动图" prop="oss_img_src">
              <Upload
                type="select"
                ref="upImg"
                with-credentials
                name="file"
                :format="['jpg','jpeg','png','gif']"
                :on-success="getResponse"
                :on-error="getErrorInfo"
                :on-format-error="formatError"
                :action="action"
                style="text-align:left;">
                <Button type="ghost" icon="ios-cloud-upload-outline">上传活动图</Button>
              </Upload>
              <div v-if="imgshow" style="display: inline-block;width: 100%">
                <div style="margin:0px auto;width: 300px">
                  <img style="max-width: 300px;" :src=imgpath() alt="">
                </div>
              </div>
            </Form-item>
            <Form-item label="外站链接" prop="url">
              <Input type="text" v-model="form.url" placeholder="请输入外站链接"></Input>
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
        action: HOST + 'admin/uploadactivity',
        type_name: '',
        imgshow: false,
        value1: 0,
        selects: true,
        form: {},
        AddRule: {
          title: [
            {required: true, message: '请输入活动名称。', trigger: 'blur'},
          ],
          url: [
            {required: true, message: '请输入页面的url。', trigger: 'blur'},
          ],
          oss_img_src: [
            {required: true, message: '请上传活动图。', trigger: 'blur'},
          ],
        }
      }
    },
    methods: {
      imgpath() {
        return this.form.oss_img_src;
      },

      //缩略图上传回调
      getResponse(response, file, filelist) {
        this.form.oss_img_src = response.url;
        if (response.status) {
          this.$Message.success(response.msg);
          this.imgpath();
          this.imgshow = true
          this.$refs.upImg.clearFiles();
        } else {
          this.$Message.error(response.msg);
        }
        this.$refs.upImg.clearFiles()
      },
      getErrorInfo(error, file, filelist) {
        this.$Message.error(error);
      },
      formatError() {
        this.$Message.error('文件格式只支持 jpg,jpeg,png三种格式。');
      },
      getError(error, file, filelist) {
        this.$Message.error(error);
      },
      formatE() {
        this.$Message.error('文件格式只支持 jpg,jpeg,png三种格式。');
      },
      add() {
        this.$refs.padd.validate((valid) => {
          if (valid) {
            this.modal_loading = true;
            let data = this.form;
            this.apiPost('admin/storyOut', data).then((res) => {
              this.handelResponse(res, (data, msg) => {
                this.modal = false;
                this.$parent.getData();
                this.$Message.success(msg);
                this.modal_loading = false;
                this.imgshow = false;
                this.$refs.padd.resetFields();
                this.$refs.select.clearSingleSelect()
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
  }
</script>


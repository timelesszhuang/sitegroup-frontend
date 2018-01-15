<template>
  <div>
    <div>
      <Modal
        v-model="modal" width="600">
        <p slot="header">
          <span>修改</span>
        </p>
        <div>
          <Form ref="icosave" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
            <Form-item label="ICO名称" prop="name">
              <Input type="text" v-model="form.name" placeholder="请输入名称"></Input>
            </Form-item>
            <Form-item label="ICO" prop="name">
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
                <Button type="ghost" ico="ios-cloud-upload-outline">上传缩略图</Button>
              </Upload>
              <div v-if="imgshow" style="display: inline-block;width: 100%">
                <div style="margin:0px auto;width: 300px">
                  <img style="max-width: 300px;" :src=imgpath() alt="">
                </div>
              </div>
            </Form-item>
            <Form-item label="ICO相关信息" prop="detail">
              <Input type="textarea" :autosize="{minRows: 3,maxRows: 10}" v-model="form.detail"
                     placeholder="请输入ICO相关信息"></Input>
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
        action: HOST + 'admin/siteicoup',
        AddRule: {
          name: [
            {required: true, message: '请填写ICO名字', trigger: 'blur'},
          ],

          oss_ico_path: [
            {required: true, message: '请上传ICO', trigger: 'blur'}
          ]
        }
      }
    },
    computed: {
      imgshow: function () {
        if (this.form.oss_ico_path) {
          return true;
        }
        return false;
      }
    },
    methods: {
      imgpath() {
        return this.form.oss_ico_path;
      },
      //缩略图上传回调
      getResponse(response, file, filelist) {
        this.form.oss_ico_path = response.url;
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
        add() {
          this.$refs.icosave.validate((valid) => {
              if(valid){
                this.modal_loading = true;
                let data = this.form;
                let id = data.id;
                this.apiPut('admin/siteIco/'+ id, data).then((res) => {
                  this.handelResponse(res, (data, msg) => {
                    this.modal = false;
                    this.$parent.getData();
                    this.$Message.success(msg);
                    this.modal_loading = false;
                    this.$refs.icosave.resetFields();
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
      form: {
        default: {

        }
      }
    },
    mixins: [http]
  }
</script>

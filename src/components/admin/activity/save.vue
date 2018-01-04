<template>
  <div>
    <div>
      <Modal
        v-model="modal"
        width="900"
        :styles="{top: '20px'}"
      >
        <p slot="header">
          <span>修改</span>
        </p>
        <div>
          <Form ref="psave" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
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
            <Form-item label="小活动图" prop="smalloss_img_src">
              <Upload
                type="select"
                ref="upImage"
                with-credentials
                name="file"
                :format="['jpg','jpeg','png','gif']"
                :on-success="getRes"
                :on-error="getError"
                :on-format-error="formatErr"
                :action="action"
                style="text-align:left;">
                <Button type="ghost" icon="ios-cloud-upload-outline">上传活动图</Button>
              </Upload>
              <div v-if="imgshowimage" style="display: inline-block;width: 100%">
                <div style="margin:0px auto;width: 300px">
                  <img style="max-width: 300px;" :src=path() alt="小图">
                </div>
              </div>
            </Form-item>
            <Form-item label="英文名" prop="en_name">
              <Input type="text" v-model="form.en_name" placeholder="请输入英文名"></Input>
            </Form-item>
            <Form-item label="活动描述" prop="activity_summary">
              <editor @change="updateData2" :content="form.activity_summary" :height="100"
                      :auto-height="false"></editor>
            </Form-item>
            <Form-item label="活动规则" prop="rule">
              <editor @change="updateData3" :content="form.rule" :height="100" :auto-height="false"></editor>
            </Form-item>
            <Form-item label="详情" prop="content">
              <editor @change="updateData" :content="form.content" :height="200" :auto-height="false"></editor>
            </Form-item>
            <Form-item label="页面关键词" prop="keywords">
              <Input type="text" v-model="form.keywords" placeholder="请输入页面关键词"></Input>
            </Form-item>
            <Form-item label="页面描述" prop="summary">
              <Input type="textarea" :autosize="{minRows: 3,maxRows: 10}" v-model="form.summary"
                     placeholder="请输入页面描述">
              </Input>
            </Form-item>
          </Form>
        </div>
        <div slot="footer">
          <Button type="success" size="large" :loading="modal_loading" @click="save">保存</Button>
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
        value1: 0,
        AddRule: {
          title: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
          ],
          oss_img_src: [
            {required: true, message: '请上传活动图', trigger: 'blur'},
          ],
          content: [
            {required: true, message: '请输入活动详情', trigger: 'blur'},
          ],
          en_name: [
            {required: true, message: '请输入英文名', trigger: 'blur'},
          ],
          keywords: [
            {required: true, message: '请输入页面关键词', trigger: 'blur'},
          ],
          summary: [
            {required: true, message: '请输入页面描述', trigger: 'blur'},
          ],
        }
      }
    },
    created() {

    },
    computed: {
      imgshow: function () {
        if (this.form.oss_img_src) {
          return true;
        }
        return false;
      },
      imgshowimage: function () {
        if (this.form.smalloss_img_src) {
          return true;
        }
        return false;
      }
    },
    methods: {
      imgpath() {
        return this.form.oss_img_src;
      },
      path() {
        return this.form.smalloss_img_src;
      },
      updateData(data) {
        this.form.content = data
      },
      updateData2(data) {
        this.form.activity_summary = data
      },
      updateData3(data) {
        this.form.rule = data
      },

      //缩略图上传回调
      getResponse(response, file, filelist) {
        this.form.oss_img_src = response.url;
        if (response.status) {
          this.$Message.success(response.msg);
          this.imgpath();
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
      formatErr() {
        this.$Message.error('文件格式只支持 jpg,jpeg,png三种格式。');
      },
      getRes(response, file, filelist) {
        this.form.smalloss_img_src = response.url;
        if (response.status) {
          this.$Message.success(response.msg);
          this.path();
          this.imgshowimage = true
          this.$refs.upImage.clearFiles();
        } else {
          this.$Message.error(response.msg);
        }
        this.$refs.upImage.clearFiles()
      },
      getError(error, file, filelist) {
        this.$Message.error(error);
      },


      save() {
        this.$refs.psave.validate((valid) => {
          if (valid) {
            this.modal_loading = true;
            let data = this.form;
            let id = data.id;
            this.apiPut('admin/activityabout/' + id, data).then((res) => {
              this.handelResponse(res, (data, msg) => {
                this.modal = false;
                this.$parent.getData();
                this.$Message.success(msg);
                this.modal_loading = false;
                this.$refs.psave.resetFields();
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
        default: {}
      },
    },
    mixins: [http],
  }
</script>

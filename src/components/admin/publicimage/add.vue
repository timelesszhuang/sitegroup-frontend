<template>
  <div>
    <Modal
      v-model="modal"
      width="900"
      :styles="{top: '20px'}"
    >
      <p slot="header">
        <span>添加图片</span>
      </p>
      <div>
        <Form ref="add" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
          <Row>
            <Col span="12">
            <Form-item label="图片上传">
              <Upload
                type="select"
                ref="upImg"
                with-credentials
                name="file"
                :format="['jpg','jpeg','png','gif']"
                :on-success="getResponse"
                :on-error="getErrorInfo"
                :on-format-error="formatError"
                :action="action">
                <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
              </Upload>
            </Form-item>
            </Col>
            <Col span="12">
            <div v-if="imgshow" style="margin:0 auto;max-width: 200px;margin-right: 300px">
              <img style="max-width: 200px;" :src=imgpath() alt=""></div>
            </Col>
          </Row>
          <Form-item label="图片描述" prop="alt">
            <Input v-model="form.alt" :rows="3" type="text" placeholder="请输入图片描述"></Input>
          </Form-item>
        </Form>
        <Alert style="font-size:15px;font-weight: bold;text-align:center;" type="warning">
          图片上传限制:&nbsp;&nbsp;&nbsp;单张图片限制为512KB大小&nbsp;&nbsp;&nbsp;
        </Alert>
      </div>
      <div slot="footer">
        <Button type="success" size="large" :loading="modal_loading" @click="add">保存</Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';

  export default {
    data() {
      const checkarticletype = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请选择文章分类'));
        } else {
          callback();
        }
      };
      const checktag = (rule, value, callback) => {
        if (value=='') {
          callback(new Error('请选择标签或添加标签'));
        } else {
          callback();
        }
      };

      return {
        switch1: true,
        tag_name: true,
        action: HOST + 'admin/uploadlibraryimage',
        modal: false,
        imgshow: true,
        modal_loading: false,
        editor_id: '',
        form: {
          tags: [],
          imgsrc: '',
          alt : ''
        },
        selects: true,
        AddRule: {
          title: [
            {required: true, message: '请填写文章标题', trigger: 'blur'},
          ],
          come_from: [
            {required: true, message: '请填写文章来源', trigger: 'blur'},
          ],
          auther: [
            {required: true, message: '请填写文章作者', trigger: 'blur'},
          ],
          articletype_id: [
            {required: true, validator: checkarticletype, trigger: 'blur'}
          ],
          tag_id: [
            {required: true, validator: checktag, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      change(status) {
        if (status) {
          this.tag_name = true
          this.$Message.info('切换到下拉选择');
        } else {
          this.tag_name = false
          this.$Message.info('切换到添加标签');
        }

      },
      changeTagtype(value) {
        this.form.tag_id = value.value
      },
      imgpath() {
        return this.form.imgsrc;
      },
      //缩略图上传回调
      getResponse(response, file, filelist) {
        this.form.imgsrc = response.url;
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
      changeArticletype(value) {
        this.form.articletype_name = value.label
        this.form.articletype_id = value.value
      },
      add() {
        this.$refs.add.validate((valid) => {
          if (valid) {
            this.modal_loading = true;
            let data = this.form;
            this.apiPost('admin/libraryimgset', data).then((res) => {
              this.handelResponse(res, (data, msg) => {
                this.modal = false;
                this.$parent.getData();
                this.$Message.success(msg);
                this.modal_loading = false;
                this.imgshow = false
                this.form.imgsrc = '';
                this.$refs.add.resetFields();

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
    props: {
      articletype: {
        default: []
      },
      tagname: {
        default: {}
      }
    }
  }
</script>
<style>
  .ql-container .ql-editor {
    min-height: 20em;
    padding-bottom: 1em;
    max-height: 25em;
  }
</style>

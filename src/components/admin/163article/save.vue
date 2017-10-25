<template>
  <div>
    <Modal
      v-model="modal" width="900">
      <p slot="header">

        <span>添加到文章库</span>
      </p>
      <div>

        <Form ref="save" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
          <Form-item label="原文">
            <a v-bind:href="url" target="_blank">点击查看原文章</a>
          </Form-item>
          <Form-item label="标题" prop="title">
            <Input type="text" v-model="form.title" placeholder="请输入标题"></Input>
          </Form-item>
          <Form-item label="作者" prop="auther">
            <Input type="text" v-model="form.auther" placeholder="请输入作者"></Input>
          </Form-item>
          <Row>
            <Col span="12">
            <Form-item label="文章分类" prop="articletype_id">
              <Select ref="select" :clearable="selects" v-model="form.articletype_id"
                      style="position:relative;text-align: left;width:250px;z-index: 10000;"
                      label-in-value filterable　@on-change="changeArticletype">
                <Option disabled :value="0">分类名—标签</Option>
                <Option v-for="item in articletype" :value="item.id" :label="item.name" :key="item">
                  {{ item.text }}
                </Option>
              </Select>
            </Form-item>
            </Col>
            <Col span="12">
            <Form-item label="阅读次数" prop="readcount">
              <InputNumber :min="1" v-model="form.readcount" placeholder="请输入作者"></InputNumber>
            </Form-item>
            </Col>
          </Row>
          <Row>
            <Col span="12">
            <Form-item label="缩略图上传">
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
                <Button type="ghost" icon="ios-cloud-upload-outline">上传缩略图</Button>
              </Upload>
            </Form-item>
            </Col>
            <Col span="12">
            <div v-if="imgshow" style="margin:0 auto;max-width: 200px;margin-right: 300px">
              <img style="max-width: 200px;" :src=imgpath() alt=""></div>
            </Col>
          </Row>
          <Form-item label="内容" prop="content">
            <editor @change="updateData" :content="form.content"   :height="300" :auto-height="false"></editor>
          </Form-item>
          <Form-item label="关键词" prop="keywords">
            <Input type="text" v-model="form.keywords" placeholder="请输入关键词(尽量用英文符号分割)" style="width: 200px;"></Input>
          </Form-item>
        </Form>
      </div>
      <div slot="footer">
        <Button type="success" size="large" :loading="modal_loading" @click="save">保存</Button>
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
      return {
        action: HOST + 'admin/uploadarticleimage',
        modal: false,
        selects: true,
        imgshow: false,
        modal_loading: false,
        AddRule: {
          title: [
            {required: true, message: '请填写文章标题', trigger: 'blur'},
          ],
          auther: [
            {required: true, message: '请填写作者', trigger: 'blur'},
          ],
          articletype_id:[
            {required: true,validator: checkarticletype, trigger: 'blur'}
          ]
        }
      }
    },
    computed: {
      url: function () {
        return  this.form.url;
      },

    },
    methods: {
      imgpath() {
        return this.form.thumbnails;
      },
      //缩略图上传回调
      getResponse(response, file, filelist) {
        this.form.thumbnails = response.url;
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
      updateData(data) {
        this.form.content = data
      },
      changeArticletype(value) {
        this.form.articletype_name = value.label
        this.form.articletype_id = value.value
      },
      save() {
        this.$refs.save.validate((valid) => {
          if (valid) {
            this.modal_loading = true;
            let data = {
              articletype_id:this.form.articletype_id,
              articletype_name:this.form.articletype_name,
              auther:this.form.auther,
              summary:this.form.summary,
              title:this.form.title,
              content: this.form.content,
              come_from:this.form.come_from,
              posttime:this.form.createtime,
              thumbnails:this.form.thumbnails,
              readcount:this.form.readcount,
              keywords:this.form.keywords

            }
//            let data = this.form;
            this.apiPost('wangyi/addArticle', data).then((res) => {
              this.handelResponse(res, (data, msg) => {
                this.modal = false;
                this.$parent.getData();
                this.$Message.success(msg);
                this.modal_loading = false;
                this.$refs.save.resetFields();
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
        default: {}
      },
      form: {
        default: {
          title: "",
          auther: '',
          articletype_id: 0,
          articletype_name: '',
          content: '',
        }
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

<template>
  <div>
    <Modal
      v-model="modal"
      width="900"
      :styles="{top: '20px'}"
    >
      <p slot="header">
        <span>添加文章</span>
      </p>
      <div>
        <Form ref="add" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
          <Row :gutter="16">
            <Col span="17">
            <Form-item label="标题" prop="title">
              <Input type="text" v-model="form.title" placeholder="请输入标题"></Input>
            </Form-item>
            </Col>
            <Col span="5">
            <ColorPicker v-model="form.title_color"/>
            </Col>
          </Row>
          <Row>
            <Col span="8">
            <Form-item label="简略标题" prop="shorttitle">
              <Input type="text" v-model="form.shorttitle" placeholder="请输入简略标题"></Input>
            </Form-item>
            </Col>
          </Row>
          <Row>
            <Col span="12">
            <Form-item label="来源" prop="come_from">
              <Input type="text" v-model="form.come_from" placeholder="请输入来源" style="width: 200px;"></Input>
            </Form-item>
            </Col>
            <Col span="12">
            <Form-item label="作者" prop="auther">
              <Input type="text" v-model="form.auther" placeholder="请输入作者" style="width: 200px;"></Input>
            </Form-item>
            </Col>
          </Row>
          <Row>
            <Col span="12">
            <Form-item label="缩略图上传">
              <Upload
                style="display: inline-block"
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
              <Button type="success" style="display: inline-block" :loading="modal_loading" @click="addimg('suolue')">
                素材库图片
              </Button>
            </Form-item>

            </Col>

            <Col span="12">
            <div v-if="imgshow" style="margin:0 auto;max-width: 200px;margin-right: 300px">
              <img style="max-width: 200px;" :src=imgpath() alt=""></div>
            </Col>
          </Row>
          <Row>
            <Col span="12">
            <Form-item label="文章分类" prop="articletype_id">
              <Select ref="select" :clearable="selects" v-model="form.articletype_id"
                      style="width:200px;position: relative;z-index: 10000"
                      label-in-value filterable clearable 　@on-change="changeArticletype">
                <Option-group v-for="(item,index) in articletype" :label="index" :key="item">
                  <Option v-for="items in item" :value="items.id" :label="items.name" :key="index">{{ items.name }}
                  </Option>
                </Option-group>
              </Select>
            </Form-item>
            </Col>
            <Col span="12">
            <Form-item label="阅读次数" prop="readcount">
              <InputNumber :min="1" v-model="form.readcount" placeholder="请输入作者"></InputNumber>
            </Form-item>
            </Col>
          </Row>
          <Form-item label="文章描述" prop="summary">
            <Input v-model="form.summary" :rows="3" type="textarea" placeholder="请输入文章描述"></Input>
          </Form-item>
          <Form-item label="内容" type="image"  prop="content"  style="height:100%;">
           <span  @click="addimg('content')"  title="素材图图片插入" ><Icon type="image" ></Icon></span>

            <!--<Button type="success" size="small" style="display: inline-block" :loading="modal_loading" @click="addimg('content')">-->
              <!--素材库图片-->
            <!--</Button>-->

            <editor @change="updateData" :content="form.content" :height="300" :auto-height="false">
            </editor>

          </Form-item>
          <Row>
            <Col span="12">
            <Form-item label="页面关键词" prop="keywords">
              <Input type="text" v-model="form.keywords" placeholder="请输入页面关键词(请用英文符号,分割)"></Input>
            </Form-item>
            </Col>
          </Row>
          <Row>
            <Col span="21">
            <Form-item v-if="tag_name" label="分类标签" prop="tag_id">
              <Select ref="select" :clearable="selects" v-model="form.tag_id"
                      style="position:relative;text-align: left;width:350px;z-index: 10000;"
                      label-in-value multiple filterable　>
                <Option v-for="(item,index) in tagname" :value="index" :label="item" :key="index">
                  {{item}}
                </Option>
              </Select>
            </Form-item>
            <Form-item label="分类标签" v-if="!tag_name" prop="tags">
              <Input type="text" style="width:350px;" v-model="form.tags" placeholder="请输入标签区分分类"></Input>
              <Button type="success" size="small" :loading="modal_loading" @click="addtags">添加标签</Button>
            </Form-item>
            </Col>
            <Col span="3">
            <i-switch size="large" v-model="switch1" @on-change="change">
              <span slot="open">选择</span>
              <span slot="close">填写</span>
            </i-switch>
            </Col>
          </Row>
        </Form>
        <Alert style="font-size:15px;font-weight: bold;text-align:center;" type="warning">
          图片上传限制:&nbsp;&nbsp;&nbsp;单张图片限制为512KB大小&nbsp;&nbsp;&nbsp;
        </Alert>
      </div>
      <div slot="footer">
        <Button type="success" size="large" :loading="modal_loading" @click="add">保存</Button>
      </div>

    </Modal>
    <materialimg ref="addmaterial"></materialimg>
  </div>
</template>


<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';
  import materialimg from './materialimg.vue';

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
        if (value == '') {
          callback(new Error('请选择标签或添加标签'));
        } else {
          callback();
        }
      };

      return {
        switch1: true,
        tag_name: true,
        action: HOST + 'admin/uploadarticleimage',
        modal: false,
        imgshow: true,
        modal_loading: false,
        editor_id: '',
        img: '',
        form: {
          summary: '',
          thumbnails: '',
          keywords: '',
          readcount: 0,
          title: "",
          shorttitle: '',
          auther: '',
          come_from: '',
          articletype_id: 0,
          articletype_name: '',
          content: '',
          title_color: '',
          tag_id: [],
          tags: '',
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
    components: {materialimg},
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
      getsrc(src){
        this.imgpath(src)
      },
      addimg(img) {
        this.img =img
        this.$refs.addmaterial.getData()
        this.$refs.addmaterial.modal = true
      },
      imgpath(src) {
        if (src) {
          if (this.img == 'content') {
            let imgsrc = "<img src=" + src + ">";
            this.form.content += imgsrc;
            return src;
          } else if (this.img == 'suolue') {
          }
          this.form.thumbnails = src
          return src;
        }
        return this.form.thumbnails;

      },
      addtags() {
        let data = {
          type: "article",
          name: this.form.tags
        }
        this.apiPost('admin/tags', data).then((res) => {
          this.handelResponse(res, (data, msg) => {
            let tempN = this.form.tag_id
            let tagId = data.id
            let tagnum = tagId.toString()
            tempN.push(tagnum)
            this.form.tags = ''
            this.$parent.gettag();
            this.$Message.success(msg);
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (res) => {
          //处理错误信息
          this.$Message.error('网络异常，请稍后重试。');
        })

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
        this.editorText = data
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
            this.apiPost('article', data).then((res) => {
              this.handelResponse(res, (data, msg) => {
                this.modal = false;
                this.$parent.getData();
                this.$Message.success(msg);
                this.modal_loading = false;
                this.imgshow = false
                this.form.thumbnails = '';
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
      }, imgsrc: {}
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

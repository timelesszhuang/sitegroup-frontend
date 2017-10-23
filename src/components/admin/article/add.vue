<template>
  <div>
    <Modal
      v-model="modal" width="900">
      <p slot="header">
        <span>添加文章</span>
      </p>
      <div>
        <Form ref="add" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
          <Form-item label="标题" prop="title">
            <Input type="text" v-model="form.title" placeholder="请输入标题"></Input>
          </Form-item>
          <Form-item label="来源" prop="come_from">
            <Input type="text" v-model="form.come_from" placeholder="请输入来源" style="width: 200px;"></Input>
          </Form-item>
          <Form-item label="作者" prop="auther">
            <Input type="text" v-model="form.auther" placeholder="请输入作者" style="width: 200px;"></Input>
          </Form-item>
          <Form-item label="文章分类" prop="articletype_id">
            <Select ref="select" :clearable="selects"  v-model="form.articletype_id" style="position:relative;text-align: left;width:250px;z-index: 10000;"
                    label-in-value filterable　@on-change="changeArticletype">
              <Option disabled :value="0">分类名—标签</Option>
              <Option v-for="item in articletype" :value="item.id" :label="item.name" :key="item">
                {{ item.text }}
              </Option>
            </Select>
          </Form-item>
          <Form-item label="内容" prop="content" style="height:100%;">
            <quill-editor v-model="content" ref="myQuillEditor" :options="editorOption"
                          @change="updateData($event)">
            </quill-editor>
          </Form-item>
        </Form>
        <Alert style="font-size:15px;font-weight: bold;text-align:center;" type="warning">图片上传限制:&nbsp;&nbsp;&nbsp;单张图片限制为512KB大小&nbsp;&nbsp;&nbsp;</Alert>
        <el-upload class="upload-demo" action="http://www.sitegroupback.com/admin/uploadarticleimage"  :data="uploadData" :on-success='upScuccess'
                   ref="upload" with-credentials style="display:none">
          <el-button size="small" type="primary" id="imgInput" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="插入中,请稍候">点击上传</el-button>
        </el-upload>
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
      return {
        editorOption: {
          modules: {
            history: {
              delay: 1000,
              maxStack: 50,
              userOnly: false
            }
          }
        },
        modal: false,
        modal_loading: false,
        content:'',
        fullscreenLoading:'',
        uploadData:{},
        form: {
          title: "",
          auther: '',
          come_from: '',
          articletype_id: 0,
          articletype_name: '',
          content: '',
        },
        selects:true,
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
            {required: true,validator: checkarticletype, trigger: 'blur'}
          ]
        }
      }
    },
    mounted() {
      this.$refs.myQuillEditor.quill.getModule('toolbar').addHandler('image', this.imgHandler)
    },
    methods: {
      upScuccess(e, file, fileList) {
        if(!e.status){
          this.$message.error("插入失败")
        }
        this.fullscreenLoading = false
        let url = ''
        if (this.uploadType === 'image') {    // 获得文件上传后的URL地址
          url = e.url
        }
        if (url != null && url.length > 0) {  // 将文件上传后的URL地址插入到编辑器文本中
          this.$refs.myQuillEditor.quill.insertEmbed(this.$refs.myQuillEditor.quill.getSelection(),"image",url);
        }
      },
      // 点击图片ICON触发事件
      imgHandler(state) {
        if (state) {
          let fileInput = document.getElementById('imgInput')
          fileInput.click() // 加一个触发事件
        }
        this.uploadType = 'image'
      },
      updateData(data) {
        this.form.content = data.html
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

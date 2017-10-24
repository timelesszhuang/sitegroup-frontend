<template>
  <div>
    <div>
      <Modal
        v-model="modal" width="800">
        <p slot="header">
          <span>添加问答</span>
        </p>
        <div>
          <Form ref="questionadd" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
            <Form-item label="问题名" prop="question">
              <Input type="text" v-model="form.question" placeholder="请填写问题"></Input>
            </Form-item>
            <Form-item label="问答分类" prop="articletype_id">
              <Select   ref="select" :clearable="selects" v-model="form.type_id" style="position:relative;z-index:10000;text-align: left;width:200px;"
                      label-in-value filterable　@on-change="changeArticletype">
                <Option v-for="item in questiontype" :value="item.id" :label="item.name" :key="item">
                  {{ item.name }}
                </Option>
              </Select>
            </Form-item>
            <Form-item label="答案" prop="content_paragraph">
              <quill-editor v-model="form.content_paragraph" ref="myQuillEditor" :options="editorOption">
              </quill-editor>
            </Form-item>
          </Form>
          <el-upload class="upload-demo" :action="content_image"
                     :data="uploadData" :on-success='upScuccess'
                     ref="upload" with-credentials style="display:none">
            <el-button size="small" type="primary" id="imgInput_question_add" v-loading.fullscreen.lock="fullscreenLoading"
                       element-loading-text="插入中,请稍候">点击上传
            </el-button>
          </el-upload>
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
      const checkquestiontype = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请选择问答分类'));
        } else {
          callback();
        }
      };
      return {
        uploadData:{},
        content_image:HOST + 'admin/uploadarticleimage',
        editorOption: {
          modules: {
            history: {
              delay: 1000,
              maxStack: 50,
              userOnly: false
            }
          }
        },
        fullscreenLoading: '',
        modal: false,
        modal_loading: false,
        form: {
          question: "",
          content_paragraph: "",
          type_id:0,
          type_name:''
        },
        selects:true,
        AddRule: {
          question: [
            {required: true, message: '请填写问题名', trigger: 'blur'},
          ],

          questiontype_id: [
            {required: true,validator: checkquestiontype, trigger: 'blur'}
          ]
        }
      }
    },
    mounted() {
      this.$refs.myQuillEditor.quill.getModule('toolbar').addHandler('image', this.imgHandler)
    },
    methods: {
      upScuccess(e, file, fileList) {
        if (!e.status) {
          this.$message.error("插入失败")
        }
        this.fullscreenLoading = false
        let url = ''
        if (this.uploadType === 'image') {    // 获得文件上传后的URL地址
          url = e.url
        }
        if (url != null && url.length > 0) {  // 将文件上传后的URL地址插入到编辑器文本中
          this.$refs.myQuillEditor.quill.insertEmbed(this.$refs.myQuillEditor.quill.getSelection(), "image", url);
        }
      },
      // 点击图片ICON触发事件
      imgHandler(state) {
        if (state) {
          let fileInput = document.getElementById('imgInput_question_add')
          fileInput.click() // 加一个触发事件
        }
        this.uploadType = 'image'
      },
      updateData(data) {
        this.form.content_paragraph = data
      },
      changeArticletype(type) {
          this.form.type_name=type.label;
      },
      add() {
        this.$refs.questionadd.validate((valid) => {
          if (valid) {
            this.modal_loading = true;
            let data = this.form;
            this.apiPost('question', data).then((res) => {
              this.handelResponse(res, (data, msg) => {
                this.modal = false;
                this.$parent.getData();
                this.$Message.success(msg);
                this.modal_loading = false;
                this.$refs.questionadd.resetFields();
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
      questiontype: {
        default: []
      }
    }
  }

</script>

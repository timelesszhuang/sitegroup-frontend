<template>
  <div>
    <Modal
      v-model="modal"
      width="600"
      :styles="{top: '20px'}"
    >
      <p slot="header">
        <span>csv导入文章</span>
      </p>
      <div v-if="importcsv">
        <Upload
          type="drag"
          ref="uploadcsv"
          with-credentials
          name="file"
          :format="['csv']"
          :on-success="getResponse"
          :on-error="getErrorInfo"
          :on-format-error="formatError"
          :action="action">
          <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>点击或将csv文件拖拽到这里上传</p>
          </div>
        </Upload>
        <Form ref="addcsv" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
          <Form-item label="下载模板">
            <a v-bind:href=this.csvpath target="_blank">点击下载模板</a>
          </Form-item>
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
        </Form>
      </div>
      <div v-if="!importcsv">
      <div  style="font-weight: bold">导入信息:</div>
      <div style="font-size: 20px;margin-left:50px" v-for="(item,index) in dataerror">
        {{item.message}}
      </div>
    </div>
      <div slot="footer">
        <Button v-if="!importcsv" type="error" size="large" :loading="modal_loading" @click="close">关闭</Button>
        <Button  type="success" size="large" :loading="modal_loading" @click="addcsv">导入</Button>
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
        action: HOST + 'article/csvupload',
        modal: false,
        dataerror:[],
        csvpath:'https://lexiaoyi.oss-cn-beijing.aliyuncs.com/article/csv/20171213/cb374588b7e0fb2082460ad05a46bf22.csv',
        importcsv: true,
        modal_loading: false,
        errorinfo: "",
        form: {
          csvupload: ''
        },
        selects: true,
        AddRule: {}
      }
    },
    methods: {
      getResponse(response, file, filelist) {
        this.form.csvupload = response.url;
        this.$Message.success(response.msg);
      },
      getErrorInfo(error, file, filelist) {
        this.$Message.error(error);
      },
      formatError() {
        this.$Message.error('文件格式只支持 csv格式。');
      },
      changeArticletype(value) {
        this.form.articletype_name = value.label
        this.form.articletype_id = value.value
      },
      close(){
        this.modal_loading = false;
        this.modal = false
        this.importcsv = true

      },
      csvclose(){
        this.importcsv = true

      },
      addcsv() {
        this.$refs.addcsv.validate((valid) => {
          if (valid) {
            this.modal_loading = true;
            let data = this.form;
            this.apiPost('article/csvimport', data).then((res) => {
              this.handelResponse(res, (data, msg) => {
                if(data.error){
                  this.dataerror =  data.error
                  this.importcsv = false
                }
                this.$parent.getData();
                this.$Message.success(msg);
                this.modal_loading = false;
                this.$refs.addcsv.resetFields();
                this.$refs.select.clearSingleSelect()
                this.$refs.uploadcsv.clearFiles()
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

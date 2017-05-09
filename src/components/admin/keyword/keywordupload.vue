<style>
  .company-add-form {
    padding: 20px;
  }
</style>
<template>
  <div>
    <Modal
      v-model="modal" width="600">
      <p slot="header">
        <!--<Icon type="person-add"></Icon>-->
        <Icon type="upload"></Icon>
        <span>批量上传关键词</span>
      </p>
      <div>
        <Form ref="keywordadd" class="company-add-form">
          <Upload
            type="drag"
            with-credentials
            name="file_name"
            :format="['csv']"
            :on-success="getReponse"
            :on-error="getErrorInfo"
            :on-format-error="formatError"
            :action="action">
            <div style="padding: 20px 0">
              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
              <p>点击或将文件拖拽到这里上传</p>
            </div>
          </Upload>
        </Form>
      </div>
      <div slot="footer">
        <Button type="success" size="large" :loading="modal_loading" @click="add">保存</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import http from '../../../assets/js/http.js'
  export default {
    data () {
      return {
        modal: false,
        modal_loading: false,
        label_in_value: true,
        action: HOST + 'keyword/uploadkeyword',
        form: {
          path: '',
        },
      }
    },
    methods: {
      getReponse(response, file, filelist){
        this.form.path = response.data;
        this.$Message.success(response.msg);
      },
      getErrorInfo(error, file, filelist){
        this.$Message.error(error);
      },
      formatError(){
        this.$Message.error('文件格式只支持 csv格式。');
      },
      add()
      {
        if (!this.form.path) {
          this.$Message.error('请首先上传csv文件。');
          return
        }
        this.form.id = this.id
        this.modal_loading = true;
        let data = this.form;
        this.apiPost('keyword/insertKeyword', data).then((res) => {
          this.handelResponse(res, (data, msg) => {
            this.modal = false;
            this.form = {
              path: ''
            };
            this.$Message.success(msg);
            this.modal_loading = false;
            setTimeout(function () {
              location.reload();
            }, 1000);
          }, (data, msg) => {
            this.modal_loading = false;
            this.$Message.error(msg);
          })
        }, (res) => {
          //处理错误信息
          this.modal_loading = true;
          this.$Message.error('网络异常，请稍后重试。');
        })

      }
      ,
    },
    props: {
      id: {
        default: 0
      },
    },
    mixins: [http]
  }
</script>

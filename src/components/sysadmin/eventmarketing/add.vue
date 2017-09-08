<template>
  <div>
    <div>
      <Modal
        v-model="modal" width="900">
        <p slot="header">
          <span>添加</span>
        </p>
        <div>
          <Upload
            type="drag"
            ref="upImg"
            with-credentials
            name="file_name"
            :format="['jpg','jpeg','png','gif']"
            :on-success="getResponse"
            :on-error="getErrorInfo"
            :on-format-error="formatError"
            :action="action">
            <div style="padding: 20px 0">
              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
              <p>点击或将图片拖拽到这里上传 仅支持(jpg jpeg png gif)类型图片</p>
            </div>
          </Upload>
          <Form ref="marketingadd" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
            <Form-item label="标题" prop="title">
              <Input type="text" v-model="form.title" placeholder="请输入标题"></Input>
            </Form-item>
            <Form-item label="关键词" prop="keyword">
              <Input type="text" v-model="form.keyword" placeholder="请输入关键词"></Input>
            </Form-item>
            <Form-item label="行业分类" prop="industry_id">
              <Select v-model="form.industry_id" style="width:150px;text-align: left;position:relative;text-align: left;z-index: 10000;"
                      label-in-value　@on-change="changeIndustry" >
                <Option v-for="item in industry" :value="item.id" :label="item.name" :key="item">
                  {{ item.name }}
                </Option>
              </Select>
            </Form-item>
            <Form-item label="核心解读" prop="summary">
              <editor @change="updateData2" :content="form.summary " :height="100"></editor>
            </Form-item>
            <Form-item label="营销模式" prop="content">
              <editor @change="updateData" :content="form.content " :height="300"></editor>
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
        action: HOST + 'sys/uploadMarketingmode',
        form: {
          title:'',
          keyword:'',
          content:'',
        },
        AddRule: {
          title: [
            {required: true, message: '请输入标题', trigger: 'blur'},
          ],
          keyword: [
            {required: true, message: '请输入关键词', trigger: 'blur'},
          ],
          content: [
            {required: true, message: '请输入营销模式', trigger: 'blur'},
          ],
          summary: [
            {required: true, message: '请输入核心解读', trigger: 'blur'},
          ],
        }
      }
    },
    methods: {
      updateData2(data){
        this.form.summary =data
      },
      updateData(data) {
        this.form.content = data
      },
      changeIndustry(value){
        this.form.industry_name = value.label;
        this.form.industry_id = value.value;
      },
      getResponse(response, file, filelist) {
        this.form.img = response.data;
        this.$Message.success(response.msg);
      },
      getErrorInfo(error, file, filelist) {
        this.$Message.error(error);
      },
      formatError() {
        this.$Message.error('文件格式只支持 jpg,jpeg,png三种格式。');
      },
        add() {
          if (!this.form.img) {
            this.$Message.error('请首先图片文件。');
            return
          }
          this.$refs.marketingadd.validate((valid) => {
              if(valid){
                this.modal_loading = true;
                let data = this.form;
                this.apiPost('sys/Marketingmode', data).then((res) => {
                  this.handelResponse(res, (data, msg) => {
                    this.modal = false;
                    this.$parent.getData();
                    this.$Message.success(msg);
                    this.modal_loading = false;
                    this.$refs.marketingadd.resetFields();
                    this.$refs.upImg.clearFiles()
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
      industry: {
        default: []
      },
    },
    mixins: [http]
  }
</script>

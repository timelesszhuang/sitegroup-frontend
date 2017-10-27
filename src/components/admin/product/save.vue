<template>
  <div>
    <div>
      <Modal
        v-model="modal" width="900">
        <p slot="header">
          <span>修改</span>
        </p>
        <div>
          <Form ref="psave" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
            <Form-item label="名称" prop="name">
              <Input type="text" v-model="form.name" placeholder="请输入产品名称 （或其他名称）"></Input>
            </Form-item>
            <Form-item label="缩略图" prop="image">
              <Upload
                type="select"
                ref="upImg"
                with-credentials
                name="img"
                :format="['jpg','jpeg','png','gif']"
                :on-success="getResponse"
                :on-error="getErrorInfo"
                :on-format-error="formatError"
                :action="action"
                style="text-align:left;">
                <Button type="ghost" icon="ios-cloud-upload-outline">上传缩略图</Button>
              </Upload>
              <div v-if="imgshow" style="display: inline-block;width: 100%">
                <div style="margin:0px auto;width: 300px">
                  <img style="max-width: 300px;" :src=imgpath() alt="">
                </div>
              </div>
            </Form-item>
            <Form-item label="编号" prop="sn">
              <Input type="text" v-model="form.sn" placeholder="请输入产品编号 （或其他编号）"></Input>
            </Form-item>
            <Form-item label="产品分类" prop="type_name">
              <Select v-model="form.type_id" style="width:200px;" placeholder="所属产品分类（或其他分类）" label-in-value filterable
                      clearable @on-change="changePtype">
                <Option v-for="item in ptype" :value="item.id" :key="item">{{ item.text }}</Option>
              </Select>
            </Form-item>
            <Form-item label="收费方式" prop="payway">
              <Input type="text" v-model="form.payway" placeholder="请输入收费方式（比如××元/户/年）"></Input>
            </Form-item>
            <Form-item label="摘要" prop="summary">
              <Input type="textarea" :autosize="{minRows: 2,maxRows: 10}" v-model="form.summary"
                     placeholder="请输入产品摘要 比如相关产品的介绍"></Input>
            </Form-item>
            <Form-item label="详情" prop="detail">
              <editor @change="updateData" :content="form.detail" :height="300" :auto-height="false"></editor>
            </Form-item>
            <Form-item label="页面标题" prop="title">
              <Input type="text" v-model="form.title" placeholder="请输入页面标题"></Input>
            </Form-item>
            <Form-item label="页面关键词" prop="keywords">
              <Input type="text" v-model="form.keywords" placeholder="请输入页面关键词"></Input>
            </Form-item>
            <Form-item label="页面描述" prop="description">
              <Input v-model="form.description" type="textarea" :rows="4" placeholder="请输入页面描述"></Input>
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
      const checkptype = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请选择文章分类'));
        } else {
          callback();
        }
      };
      return {
        modal: false,
        modal_loading: false,
        action: HOST + 'admin/uploadProductBigImg',
        otheraction: HOST + 'admin/uploadProductSerImg',
        type_name: '',
        value1: 0,
        AddRule: {
          name: [
            {required: true, message: '请填写文章分类', trigger: 'blur'},
          ],
          detail: [
            {required: true, message: '请填写文章详情', trigger: 'blur'},
          ],
          type_name: [
            {required: true, validator: checkptype, trigger: 'blur'}
          ]
        }
      }
    },
    created() {

    },
    computed: {
      imgshow: function () {
        if (this.form.image) {
          return true;
        }
        return false;
      }
    },
    methods: {
      imgpath() {
        return this.form.image;
      },
      updateData(data) {
        console.log(data)
        this.form.detail = data
      },
      changePtype(value) {
        this.form.type_id = value.value
        this.form.type_name = value.label
      },
      //缩略图上传回调
      getResponse(response, file, filelist) {
        this.form.image = response.url;
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
      getError(error, file, filelist) {
        this.$Message.error(error);
      },
      formatE() {
        this.$Message.error('文件格式只支持 jpg,jpeg,png三种格式。');
      },
      save() {
        this.$refs.psave.validate((valid) => {
          if (valid) {
            this.modal_loading = true;
            let data = this.form;
            let id = data.id;
            this.apiPut('admin/product/' + id, data).then((res) => {
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
        default: {
          name: "",
          detail: "",
          image: '',
          summary: '',
          payway: "",
          sn: '',
          type_name: '',
          type_id: 0,
          keywords: '',
          title: '',
          description: '',
          content:''
        }
      },
      ptype: {
        default: []
      }
    },
    mixins: [http],
  }
</script>

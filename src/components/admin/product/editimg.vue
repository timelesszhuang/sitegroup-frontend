<template>
  <div>
    <div>
      <Modal
        v-model="modal" width="900">
        <p slot="header">
          <span>修改</span>
        </p>
        <div>
          <Form ref="editimg" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
            <div v-show="is_show">
              <Carousel v-model="value1" style="width:500px;margin: 0 auto">
                <CarouselItem v-for="(item,index) in form.imglist" :key="index">
                  <div class="eventmouse"><img style="display: block;margin: 0 auto;max-width: 300px" :src=item></div>
                </CarouselItem>
              </Carousel>
            </div>
            <Row v-show="is_show">
              <Col span="8">
              <Form-item label="产品图片" prop="imgser">
                <Select style="width:120px;" placeholder="产品图片" label-in-value filterable
                        clearable @on-change="changetype">
                  <Option v-for="(item,index) in form.imglist" :value="item" :key="index">图片{{index + 1}}</Option>
                </Select>
              </Form-item>
              </Col>
              <Col span="6">
              <div>
                <img style="max-width: 170px" :src=img>
              </div>
              </Col>
              </Col>
              <Col span="10">
              <div>
                <Upload
                  v-if="this.img"
                  type="select"
                  ref="upImg"
                  with-credentials
                  name="img"
                  :format="['jpg','jpeg','png','gif']"
                  :on-success="getResponse"
                  :on-error="getErrorInfo"
                  :on-format-error="formatError"
                  :action="action"
                >
                  <Button type="ghost" icon="ios-cloud-upload-outline">修改</Button>
                </Upload>
                <Button v-if="this.img" type="warning" @click="delimg()">删除</Button>
              </div>
              </Col>
            </Row>
            <Alert v-show="!is_show">
              该产品暂时没有图片
              <template slot="desc">请添加产品图片</template>
            </Alert>
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
        action: HOST + 'admin/uploadProductSerImg/' + this.form.id + '/' + this.imgId,
        value1: 0,
        img: '',
        imgId: 0,
        imgnum: 0,
        AddRule: {}
      }
    },
    created() {

    },
    computed: {
      is_show: function () {
        console.log(this.form.imglist);
        if (this.form.imglist.length) {
          return true
        }
        return false
      }
    },
    methods: {
      changetype(value) {
        this.img = value.value
        this.imgId = value.label.replace('图片', '') - 1
      },
      getResponse(response, file, filelist) {
        this.form.image = response.url;
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
      editimg() {
        let data = this.form;
        this.apiPost('admin/uploadProductSerImg', data).then((res) => {
          this.handelResponse(res, (data, msg) => {
            this.modal = false;
            this.$parent.getData();
            this.$Message.success(msg);
            this.modal_loading = false;
          }, (data, msg) => {

            this.modal_loading = false;
            this.$Message.error(msg);
          })
        }, (res) => {
          this.$Message.error('网络异常，请稍后重试。');
        })
      },
      delimg() {
        let id = this.form.id;
//        console.log(this.imgId)
        this.apiGet('admin/deleteProductImg/' + id + '/' + this.imgId).then((res) => {
          this.handelResponse(res, (data, msg) => {
            this.editinfo = data
            this.modal = false;
            this.$refs.editimg.modal = true
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (res) => {
          //处理错误信息
          this.$Message.error('网络异常，请稍后重试。');
        })
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
      form: {},
    },
    mixins: [http],
  }
</script>

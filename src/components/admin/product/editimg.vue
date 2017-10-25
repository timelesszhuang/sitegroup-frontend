<template>
  <div>
    <div>
      <Modal
        v-model="modal" width="900">
        <p slot="header">
          <span>产品图片管理</span>
        </p>
        <div>
          <Form ref="editimg" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">

            <div>
              <Upload
                type="select"
                ref="addImg"
                with-credentials
                name="addimg"
                :format="['jpg','jpeg','png','gif']"
                :on-success="getResponse"
                :on-error="getErrorInfo"
                :on-format-error="formatError"
                :action="action"
                :data="addotherdata"
              >
                <Button type="primary" icon="ios-cloud-upload-outline">添加产品图片</Button>
              </Upload>
            </div>
            <div v-if="is_show" style="padding: 10px">
              <Carousel v-model="value1" style="width:500px;margin: 0 auto" autoplay>
                <CarouselItem v-for="(item,index) in form.imglist" :key="index">
                  <div class="eventmouse"><img style="display: block;margin: 0 auto;max-width: 300px" :src=item></div>
                </CarouselItem>
              </Carousel>
            </div>
            <Row v-if="is_show">
              <Col span="8">
              <Form-item label="修改产品图片" prop="imgser">
                <Select style="width:120px;" placeholder="产品图片" label-in-value filterable
                        clearable @on-change="changeEditImg" ref="imgselect">
                  <Option v-for="(item,index) in form.imglist" :value="index" :key="index">图片{{index + 1}}</Option>
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
                  name="updateimg"
                  :format="['jpg','jpeg','png','gif']"
                  :on-success="getResponse"
                  :on-error="getErrorInfo"
                  :on-format-error="formatError"
                  :action="action"
                  :data="editotherdata"
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
        value1: 0,
        img: '',
        imgIndex: 0,
        imgnum: 0,
        AddRule: {},
        //是不是需要显示修改等操作
        is_show: false,
        action: HOST + 'admin/uploadProductSerImg',
      }
    },
    created() {
    },
    computed: {
      //默认图片集为空不显示修改生成等操作
      addotherdata: function () {
        return {
          'id': this.form.id,
        }
      },
      editotherdata: function () {
        return {
          'id': this.form.id,
          'index': this.imgIndex
        }
      }
    },
    methods: {
      //修改选中的图片
      changeEditImg(value) {
        this.img = this.form.imglist[value.value]
        //获取图片的index
        this.imgIndex = value.value
      },
      //上传图片成功之后的链接 添加跟删除都会有
      getResponse(response, file, filelist) {
        if (response.status) {
          this.form.imglist = response.imglist;
          this.is_show = true
          this.$Message.success(response.msg);
          this.imgshow = true
          this.img = '';
          this.$refs.imgselect.clearSingleSelect()
        } else {
          this.$Message.error(response.msg);
        }
        this.$refs.addImg.clearFiles()
        this.$refs.upImg.clearFiles()
      },
      //上传图片失败的问题
      getErrorInfo(error, file, filelist) {
        this.$Message.error(error);
      },
      //图片类型错误提示
      formatError() {
        this.$Message.error('文件格式只支持 jpg,jpeg,png三种格式。');
      },
      //删除指定图片的索引
      delimg() {
        let _this = this
        let id = this.form.id;
        this.$Modal.confirm({
          title: '确认删除',
          content: '您确定删除该缩略图?',
          okText: '确定',
          cancelText: '取消',
          onOk: (index) => {
            _this.apiGet('admin/deleteProductImg/' + id + '/' + _this.imgIndex).then((res) => {
              _this.handelResponse(res, (data, msg) => {
                _this.$Message.success(msg);
                if (data.length == 0) {
                  _this.is_show = false
                }
                _this.form.imglist = data
                _this.img = ''
                _this.$refs.imgselect.clearSingleSelect()
              }, (data, msg) => {
                _this.$Message.error(msg);
              })
            }, (res) => {
              //处理错误信息
              _this.$Message.error('网络异常，请稍后重试。');
            })
          },
          onCancel: () => {
            return false
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

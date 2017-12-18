<template>
  <div>
    <div>
      <Modal
        v-model="modal"
        width="900"
        :styles="{top: '20px'}"
      >
        <p slot="header">
          <span>轮播图集管理</span>
        </p>
        <div>
          <div v-if="is_show" style="padding: 10px">
            <Carousel v-model="value1" autoplay >
              <CarouselItem v-for="(item,index) in form.imglist" :key="index">
                <div class="eventmouse" style="display:flex;height:auto;min-height: 300px; max-height:350px;max-width:100%;">
                  <img :src=item.osssrc style="width: 100%;">
                </div>
              </CarouselItem>
            </Carousel>
          </div>
          <Tabs value="name1">
            <TabPane label="添加图片" name="name1">
              <Form ref="addimage" :model="addform" :label-width="120" :rules="AddRule1" class="node-add-form">
                <Form-item label="标题" style="width: 500px;">
                  <Input type="text" v-model="addform.title" placeholder="请输入当前标题"></Input>
                </Form-item>
                <Form-item  style="width: 700px;"label="轮播图链接">

                  <Input   type="text" v-model="addform.link" placeholder="请输入当前轮播图集的名称" >
                  <span slot="prepend">http://</span>

                  </Input>

                </Form-item>
              </Form>
              <div style="float: right;padding-right: 70px">
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
                  <Button type="primary" icon="ios-cloud-upload-outline">添加图片</Button>
                </Upload>
              </div>
            </TabPane>
            <TabPane label="修改图片" name="name2">

              <Form ref="editimg" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
                <Row v-if="is_show">
                  <Col span="8">
                  <Form-item label="修改图片" prop="imgser">
                    <Select style="width:120px;" placeholder="图片" label-in-value filterable
                            clearable @on-change="changeEditImg" ref="imgselect">
                      <Option v-for="(item,index) in form.imglist" :value="index" :key="index">图片{{index + 1}}</Option>
                    </Select>
                  </Form-item>
                  </Col>
                  <Col span="8">
                  <div v-if="img">
                    <img style="max-width: 270px" :src=img>
                  </div>
                  </Col>
                  <Col span="8" style="margin-top: 20px" v-if="img">
                  <Form-item label="标题" >
                    <Input type="text" v-model="form.title" placeholder="请输入当前标题"></Input>
                  </Form-item>
                  <Form-item label="轮播图链接">
                    <Input type="text" v-model="form.link" placeholder="请输入当前轮播图集的名称">
                    </Input>
                  </Form-item>
                  </Col>
                </Row>
              </Form>
              <div >
                <Row >
                  <Col span="22" style="padding-left:80%" >
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
                    <Button type="ghost" icon="ios-cloud-upload-outline">替换</Button>
                  </Upload>
                  </Col>
                  <Col span="2">
                  <Button v-if="this.img" type="warning" @click="delimg()">删除</Button>
                  </Col>
                </Row>
              </div>
              <Alert type="warning" v-show="is_show">
                提示
                <template slot="desc">替换删除图片请慎重！</template>
              </Alert>
              <Alert v-show="!is_show">
                该图集暂时没有图片
                <template slot="desc">请添加图片</template>
              </Alert>
            </TabPane>
          </Tabs>



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
        addform:{
          title:'',
          link:'',
        },
        AddRule: {},
        AddRule1:{
          title: [
            {required: true, message: '请输入图片标题', trigger: 'blur'},
          ],
          link: [
            {required: true, message: '请输入当前轮播图的链接', trigger: 'blur'},
          ],

        },
        //是不是需要显示修改等操作
        is_show: false,
        action: HOST + 'uploadimglistimgser',
      }
    },
    created() {
    },
    computed: {
      //默认图片集为空不显示修改生成等操作
      addotherdata: function () {
        return {
          'id': this.form.id,
          'link':this.addform.link ? "http://"+ this.addform.link : '',
          'title':this.addform.title,

        }
      },
      editotherdata: function () {
        return {
          'id': this.form.id,
          'index': this.imgIndex,
          'link':this.form.link,
          'title':this.form.title,
        }
      }
    },
    methods: {

      //修改选中的图片
      changeEditImg(value) {
        //console.log(this.form.imglist)
        this.img = this.form.imglist[value.value].osssrc
        //获取图片的index
        this.imgIndex = value.value
        this.form.link = this.form.imglist[value.value].link
        this.form.title = this.form.imglist[value.value].title

      },
      //上传图片成功之后的链接 添加跟删除都会有
      getResponse(response, file, filelist) {
        if (response.status) {
          this.form.imglist = response.imglist;
          this.is_show = true
          this.$refs.addimage.resetFields();
          this.$Message.success(response.msg);
          this.imgshow = true
          this.addform.title = ''
          this.addform.link = ''
          this.img = '';
          this.$refs.addimage.resetFields();
          this.$refs.imgselect.clearSingleSelect()
        } else {
          this.$Message.error(response.msg);
          this.$refs.addimage.resetFields();
        }
        this.$refs.addimage.resetFields();
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
          content: '您确定删除该图?',
          okText: '确定',
          cancelText: '取消',
          onOk: (index) => {
            _this.apiGet('deleteImgser/' + id + '/' + _this.imgIndex).then((res) => {
              _this.handelResponse(res, (data, msg) => {
                _this.$Message.success(msg);
                if (data.length == 0) {
                  _this.is_show = false
                }
                _this.form.imglist = data
                _this.form.imglist[_this.imgIndex].osssrc = ''
                _this.form.imglist[_this.imgIndex].link = ''
                _this.form.imglist[_this.imgIndex].title = ''

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

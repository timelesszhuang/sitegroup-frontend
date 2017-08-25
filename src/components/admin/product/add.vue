<template>
  <div>
    <div>
      <Modal
        v-model="modal" width="900">
        <p slot="header">
          <span>添加</span>
        </p>
        <div>
          <!--<Upload-->
            <!--type="drag"-->
           <!--ref="upImg"-->
            <!--with-credentials-->
            <!--name="file_name"-->
            <!--:show-upload-list="false"-->
            <!--:format="['jpg','jpeg','png']"-->
            <!--:on-success="getResponse"-->
            <!--:on-error="getErrorInfo"-->
            <!--:on-format-error="formatError"-->
            <!--:action="action">-->
            <!--<div style="padding: 20px 0">-->
              <!--<Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>-->
              <!--<p>点击或将图片文件拖拽到这里上传</p>-->
            <!--</div>-->
          <!--</Upload>-->
          <div class="demo-upload-list" v-for="item in uploadList">
            <template v-if="item.status === 'finished'">
              <img :src="item.url">
              <div class="demo-upload-list-cover">
                <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
              </div>
            </template>
            <template v-else>
              <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
            </template>
          </div>
          <Upload
          ref="upImg"
          name="file_name"
          with-credentials
          :default-file-list="defaultList"
          :format="['jpg','jpeg','png']"
          :max-size="2048"
          :on-success="getResponse"
          :on-error="getErrorInfo"
          :on-format-error="formatError"
          :on-exceeded-size="handleMaxSize"
          :before-upload="handleBeforeUpload"
          type="drag"

          style="display: inline-block;width:58px;"
          :action="action">
          <div style="width: 58px;height:58px;line-height: 58px;">
          <Icon type="camera" size="20"></Icon>
          </div>
          </Upload>

          <Form ref="padd" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
            <Form-item label="名称" prop="name">
              <Input type="text" v-model="form.name" placeholder="请输入产品名称"></Input>
            </Form-item>
            <Form-item label="编号" prop="sn">
              <Input type="text" v-model="form.sn" placeholder="请输入编号"></Input>
            </Form-item>
            <Form-item label="分类名称" prop="type_name">
              <Select v-model="type_name" style="width:200px;" placeholder="根据分类查询" label-in-value filterable clearable @on-change="changePtype">
                <Option v-for="item in ptype" :value="item.id" :key="item">{{ item.text }}</Option>
              </Select>
            </Form-item>
            <Form-item label="收费方式" prop="payway">
              <Input type="text" v-model="form.payway" placeholder="请输入收费方式"></Input>
            </Form-item>
            <Form-item label="摘要" prop="summary">
              <Input type="textarea" :autosize="{minRows: 2,maxRows: 10}" v-model="form.summary" placeholder="请输入摘要"></Input>
            </Form-item>
            <Form-item label="详情" prop="detail">
              <editor @change="updateData" :content="form.detail"  :height="300"></editor>
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
      const checkptype = (rule, value, callback) => {
        if (!value ) {
          callback(new Error('请选择文章分类'));
        } else {
          callback();
        }
      };
      return {
        visible: false,
        modal: false,
        modal_loading: false,
        action: HOST + 'admin/uploadProductImg',
        type_name: '',
        form: {
          name: "",
          detail: "",
          image:'',
          summary:'',
          payway:"",
          sn:'',
          type_name: '',
          type_id: 0
        },
        defaultList: [
          {
            'name': 'a42bdcc1178e62b4694c830f028db5c0',
            'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
          },
          {
            'name': 'bc7521e033abdd1e92222d733590f104',
            'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
          }
        ],
        imgName: '',
        uploadList: [],
        AddRule: {
          name: [
            {required: true, message: '请填写名称', trigger: 'blur'},
          ],
          detail: [
            {required: true, message: '请填写详情', trigger: 'blur'},
          ],
          summary: [
            {required: true, message: '请输入摘要', trigger: 'blur'},
          ],
          type_name:[
            {required: true,validator: checkptype, trigger: 'blur'}
          ]

        }
      }
    },
    methods: {
      updateData(data) {
        this.form.detail = data
      },
      changePtype(value) {
//        console.log(value)
        this.form.type_id = value.value
        this.form.type_name =  value.label
      },
      getResponse(response, file, filelist){
        this.image = response.data;
        this.$Message.success(response.msg);
      },
      getErrorInfo(error, file, filelist){
        this.$Message.error(error);
      },
      handleSuccess (res, file) {
        // 因为上传过程为实例，这里模拟添加 url
        file.url = this.action
        file.name = this.image
      },
      formatError(){
        this.$Message.error('文件格式只支持 jpg,jpeg,png三种格式。');
      },
        add() {
          if (!this.image) {
            this.$Message.error('请首先图片文件。');
            return
          }
          this.$refs.padd.validate((valid) => {
              if(valid){
                this.modal_loading = true;
                this.form.image = this.image
                let data = this.form;
                this.apiPost('admin/product', data).then((res) => {
                  this.handelResponse(res, (data, msg) => {
                    this.modal = false;
                    this.$parent.getData();
                    this.$Message.success(msg);
                    this.modal_loading = false;
                    this.$refs.padd.resetFields();
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
    mixins: [http],
    props: {
     ptype: {
        default: []
      }
    }
  }
</script>





<!--<template>-->
  <!--<div class="demo-upload-list" v-for="item in uploadList">-->
    <!--<template v-if="item.status === 'finished'">-->
      <!--<img :src="item.url">-->
      <!--<div class="demo-upload-list-cover">-->
        <!--<Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>-->
        <!--<Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>-->
      <!--</div>-->
    <!--</template>-->
    <!--<template v-else>-->
      <!--<Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>-->
    <!--</template>-->
  <!--</div>-->
  <!--<Upload-->
    <!--ref="upload"-->
    <!--:show-upload-list="false"-->
    <!--:default-file-list="defaultList"-->
    <!--:on-success="handleSuccess"-->
    <!--:format="['jpg','jpeg','png']"-->
    <!--:max-size="2048"-->
    <!--:on-format-error="handleFormatError"-->
    <!--:on-exceeded-size="handleMaxSize"-->
    <!--:before-upload="handleBeforeUpload"-->
    <!--multiple-->
    <!--type="drag"-->
    <!--action="//jsonplaceholder.typicode.com/posts/"-->
    <!--style="display: inline-block;width:58px;">-->
    <!--<div style="width: 58px;height:58px;line-height: 58px;">-->
      <!--<Icon type="camera" size="20"></Icon>-->
    <!--</div>-->
  <!--</Upload>-->
  <!--<Modal title="查看图片" v-model="visible">-->
    <!--<img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">-->
  <!--</Modal>-->
<!--</template>-->
<!--<script>-->
  <!--export default {-->
    <!--data () {-->
      <!--return {-->
        <!--defaultList: [-->
          <!--{-->
            <!--'name': 'a42bdcc1178e62b4694c830f028db5c0',-->
            <!--'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'-->
          <!--},-->
          <!--{-->
            <!--'name': 'bc7521e033abdd1e92222d733590f104',-->
            <!--'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'-->
          <!--}-->
        <!--],-->
        <!--imgName: '',-->
        <!--visible: false,-->
        <!--uploadList: []-->
      <!--}-->
    <!--},-->
    <!--methods: {-->
      <!--handleView (name) {-->
        <!--this.imgName = name;-->
        <!--this.visible = true;-->
      <!--},-->
      <!--handleRemove (file) {-->
        <!--// 从 upload 实例删除数据-->
        <!--const fileList = this.$refs.upload.fileList;-->
        <!--this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);-->
      <!--},-->
      <!--handleSuccess (res, file) {-->
        <!--// 因为上传过程为实例，这里模拟添加 url-->
        <!--file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';-->
        <!--file.name = '7eb99afb9d5f317c912f08b5212fd69a';-->
      <!--},-->
      <!--handleFormatError (file) {-->
        <!--this.$Notice.warning({-->
          <!--title: '文件格式不正确',-->
          <!--desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'-->
        <!--});-->
      <!--},-->
      <!--handleMaxSize (file) {-->
        <!--this.$Notice.warning({-->
          <!--title: '超出文件大小限制',-->
          <!--desc: '文件 ' + file.name + ' 太大，不能超过 2M。'-->
        <!--});-->
      <!--},-->
      <!--handleBeforeUpload () {-->
        <!--const check = this.uploadList.length < 5;-->
        <!--if (!check) {-->
          <!--this.$Notice.warning({-->
            <!--title: '最多只能上传 5 张图片。'-->
          <!--});-->
        <!--}-->
        <!--return check;-->
      <!--}-->
    <!--},-->
    <!--mounted () {-->
      <!--this.uploadList = this.$refs.upload.fileList;-->
    <!--}-->
  <!--}-->
<!--</script>-->
<!--<style>-->
  <!--.demo-upload-list{-->
    <!--display: inline-block;-->
    <!--width: 60px;-->
    <!--height: 60px;-->
    <!--text-align: center;-->
    <!--line-height: 60px;-->
    <!--border: 1px solid transparent;-->
    <!--border-radius: 4px;-->
    <!--overflow: hidden;-->
    <!--background: #fff;-->
    <!--position: relative;-->
    <!--box-shadow: 0 1px 1px rgba(0,0,0,.2);-->
    <!--margin-right: 4px;-->
  <!--}-->
  <!--.demo-upload-list img{-->
    <!--width: 100%;-->
    <!--height: 100%;-->
  <!--}-->
  <!--.demo-upload-list-cover{-->
    <!--display: none;-->
    <!--position: absolute;-->
    <!--top: 0;-->
    <!--bottom: 0;-->
    <!--left: 0;-->
    <!--right: 0;-->
    <!--background: rgba(0,0,0,.6);-->
  <!--}-->
  <!--.demo-upload-list:hover .demo-upload-list-cover{-->
    <!--display: block;-->
  <!--}-->
  <!--.demo-upload-list-cover i{-->
    <!--color: #fff;-->
    <!--font-size: 20px;-->
    <!--cursor: pointer;-->
    <!--margin: 0 2px;-->
  <!--}-->
<!--</style>-->



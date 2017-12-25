<template>
  <div>
    <Modal
      v-model="modal" width="900" :styles="{top: '20px'}">
      <p slot="header">
        <span>修改详情型栏目</span>
      </p>
      <div>
        <Form ref="detailadd" :model="detail" :label-width="90" :rules="AddRule" class="node-add-form">
          <Form-item label="栏目/菜单名称" prop="name">
            <Input type="text"
                   v-model="detail.name" placeholder="请填写栏目/菜单名字"></Input>
          </Form-item>
          <Form-item label="英文名" prop="generate_name">
            <Input type="text" v-model="detail.generate_name" placeholder="请填写英文名，用于生成静态页命名"></Input>
          </Form-item>
          <Form-item label="详情" prop="title">
            <Input type="text" v-model="detail.title" placeholder="请填写栏目的详情"></Input>
          </Form-item>
          <Form-item label="分类" prop="tag_name">
            <Select v-model="detail.tag_id" style="text-align: left;width:200px;position: relative;z-index: 10000"
                    label-in-value 　@on-change="changeNavtype">
              <Option v-for="item in navtype" :value="item.id" :label="item.text" :key="item">
                {{ item.text }}
              </Option>
            </Select>
          </Form-item>
          <Form-item label="上级分类" prop="p_id">
            <Select  v-model="detail.p_id"  style="text-align: left;width:200px;position: relative;z-index: 10001"
                    label-in-value filterable @on-change="changeArticletype">
              <Option v-for="item in pidtype" :value="item.id" :label="item.name" :key="item">
                {{ item.text }}
              </Option>
            </Select>
          </Form-item>
          <Form-item label="封面模板" prop="covertemplate">
            <Input type="text" v-model="detail.covertemplate" placeholder="请填写详情页面的封面模板名(加.html)"></Input>
          </Form-item>
          <Form-item label="内容" prop="content" style="height:100%;">
            <editor @change="updateData" :content="detail.content" :height="300" :auto-height="false"></editor>
          </Form-item>
        </Form>
      </div>
      <div slot="footer">
        <Button type="success" size="large" :loading="modal_loading" @click="savedetails">保存</Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';

  export default {
    data() {
      const checkNavtype = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请选择栏目分类'));
        } else {
          callback();
        }
      };
      return {
        modal: false,
        modal_loading: false,
        content: '',
        id: 0,
        AddRule: {
          name: [
            {required: true, message: '请填写菜单名字', trigger: 'blur'},
          ],
          title: [
            {required: true, message: '请填写栏目的详情', trigger: 'blur'},
          ],
          generate_name: [
            {required: true, message: '请填写生成的文件名', trigger: 'blur'}
          ],
          tag_name: [
            {required: true, validator: checkNavtype, trigger: 'blur'}
          ],
        }
      }
    },
    methods: {
      changeNavtype(value) {
        this.detail.tag_name = value.label
        this.detail.tag_id = value.value
      },
      changeArticletype(value) {
        this.detail.p_id = value.value
      },
      updateData(data) {
        this.detail.content = data
      },
      savedetails() {
        this.$refs.detailadd.validate((valid) => {
          if (valid) {
            this.modal_loading = true;
            let data = this.detail;
            let id = data.id;
            this.apiPut('menu/' + id, data).then((res) => {
              this.handelResponse(res, (data, msg) => {
                this.modal = false;
                this.$parent.getData();
                this.$Message.success(msg);
                this.modal_loading = false;
                this.$refs.detailadd.resetFields();
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
      detail: {
        default: {
          name: "",
          title: '',
          content: '',
          generate_name: ''
        }
      },
      navtype: {
        default: []
      },
      pidtype: {
        default: []
      },
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

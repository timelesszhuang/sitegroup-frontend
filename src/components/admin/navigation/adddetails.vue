<template>
  <div>
    <div>
      <Modal
        v-model="modal" width="900">
        <p slot="header">
          <span>添加详情型栏目</span>
        </p>
        <div>
          <Form ref="detailadd" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
            <Form-item label="分类名称" prop="name">
              <Input type="text" v-model="form.name" placeholder="请填写菜单名字"></Input>
            </Form-item>
            <Form-item label="英文名" prop="generate_name">
              <Input type="text" v-model="form.generate_name" placeholder="请填写英文名，用于生成静态页命名"></Input>
            </Form-item>
            <Form-item label="详情" prop="title">
              <Input type="text" v-model="form.title" placeholder="请填写栏目的详情"></Input>
            </Form-item>
            <Form-item label="分类" prop="tag_name">
              <Select v-model="form.tag_id" style="text-align: left;width:200px;position: relative;z-index: 10000"
                      label-in-value filterable　@on-change="changeNavtype">
                <Option v-for="item in navtype" :value="item.id" :label="item.text" :key="item">
                  {{ item.text }}
                </Option>
              </Select>
            </Form-item>
            <Form-item label="内容" prop="content" style="height:100%;">
              <editor @change="updateData" :content="form.content" :height="300"></editor>
            </Form-item>

          </Form>
        </div>
        <div slot="footer">
          <Button type="success" size="large" :loading="modal_loading" @click="adddetails">保存</Button>
        </div>
      </Modal>
    </div>
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
        form: {
          name: "",
          title: "",
          flag: "1",
          flag_name: "详情型",
          generate_name: '',
          content:'',
        },
        AddRule: {
          name: [
            {required: true, message: '请填写菜单名字', trigger: 'blur'},
          ],
          title: [
            {required: true, message: '请填写栏目的详情', trigger: 'blur'},
          ],
          type_name: [
            {required: true, message: '请选择问答分类', trigger: 'blur'},
          ],
          generate_name: [
            {required: true, message: '请填写生成的文件名', trigger: 'blur'}
          ],
          tag_name: [
            {required: true,validator: checkNavtype, trigger: 'blur'}
          ],
        }
      }
    },
    methods: {
      changeNavtype(value) {
        console.log(value)
        this.form.tag_name= value.label
        this.form.tag_id = value.value
      },
      updateData(data) {
        this.form.content = data
      },
      adddetails() {
        this.$refs.detailadd.validate((valid) => {
          if (valid) {
            this.modal_loading = true;
            let data = this.form;
            this.apiPost('menu', data).then((res) => {
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
      navtype: {
        default: []
      }
    }
  }
</script>

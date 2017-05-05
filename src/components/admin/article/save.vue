<template>
  <div>
    <Modal
      v-model="modal" width="600">
      <p slot="header">
        <span>添加文章</span>
      </p>
      <div>
        <Form ref="save" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
          <Form-item label="标题" prop="title">
            <Input type="text" v-model="form.title" placeholder="请输入标题"></Input>
          </Form-item>
          <Form-item label="文章分类" prop="articletype_id">
            <Select v-model="form.articletype_id" style="text-align: left"
                    label-in-value filterable　@on-change="changeArticletype">
              <Option v-for="item in articletype" :value="item.id" :label="item.name" :key="item">
                {{ item.name }}


              </Option>
            </Select>
          </Form-item>
          <Form-item label="内容" prop="content">
            <textarea v-model="form.content" cols="30" rows="10"></textarea>
          </Form-item>
        </Form>
      </div>
      <div slot="footer">
        <Button type="success" size="large" :loading="modal_loading" @click="save">保存</Button>
      </div>
    </Modal>
  </div>


</template>

<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';
  export default {
    data() {
      const checkarticletype = (rule, value, callback) => {
        if (value === 0) {
          callback(new Error('请选择文章分类'));
        } else {
          callback();
        }
      };
      return {
        modal: false,
        modal_loading: false,
        form: {
          title: "",
          articletype_id: 0,
          articletype_name: '',
          content: ''
        },
        AddRule: {
          title: [
            {required: true, message: '请填写文章标题', trigger: 'blur'},
          ],
          articletype_id: [
            {validator: checkarticletype, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      changeArticletype(value) {
        this.form.articletype_name = value.label
        this.form.articletype_id = value.value
      },
      save() {
        this.$refs.save.validate((valid) => {
          if (valid) {
            this.modal_loading = true;
            let data = this.form;
            let id = data.id;
            this.apiPut('article/'+id, data).then((res) => {
              this.handelResponse(res, (data, msg) => {
                this.modal = false;
                this.$parent.getData();
                this.form = {};
                this.$Message.success(msg);
                this.modal_loading = false;
                this.$refs.save.resetFields();
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
      },
      form: {
        default: []
      }
    }
  }

</script>
<style>


</style>

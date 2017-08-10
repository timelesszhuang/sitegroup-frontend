<template>
  <div>
    <Modal
      v-model="modal" width="900">
      <p slot="header">
        <span>添加文章</span>
      </p>
      <div>
        <Form ref="add" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
          <Form-item label="标题" prop="title">
            <Input type="text" v-model="form.title" placeholder="请输入标题"></Input>
          </Form-item>
          <Form-item label="来源" prop="come_from">
            <Input type="text" v-model="form.come_from" placeholder="请输入来源" style="width: 200px;"></Input>
          </Form-item>
          <Form-item label="作者" prop="auther">
            <Input type="text" v-model="form.auther" placeholder="请输入作者" style="width: 200px;"></Input>
          </Form-item>
          <Form-item label="文章分类" prop="articletype_id">
            <Select ref="select" :clearable="selects"  v-model="form.articletype_id" style="position:relative;text-align: left;width:250px;z-index: 10000;"
                    label-in-value filterable　@on-change="changeArticletype">
              <Option disabled :value="0">分类名—标签</Option>
              <Option v-for="item in articletype" :value="item.id" :label="item.name" :key="item">
                {{ item.text }}
              </Option>
            </Select>
          </Form-item>
          <Form-item label="内容" prop="content" style="height:100%;">
            <editor @change="updateData" :content="form.content"  :height="500"></editor>
          </Form-item>
        </Form>
      </div>
      <div slot="footer">
        <Button type="success" size="large" :loading="modal_loading" @click="add">保存</Button>
      </div>
    </Modal>
  </div>


</template>

<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';
  export default {
    data() {
      const checkarticletype = (rule, value, callback) => {
        if (!value) {
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
          auther: '',
          come_from: '',
          articletype_id: 0,
          articletype_name: '',
          content: '',
        },
        selects:true,
        AddRule: {
          title: [
            {required: true, message: '请填写文章标题', trigger: 'blur'},
          ],
          come_from: [
            {required: true, message: '请填写文章来源', trigger: 'blur'},
          ],
          auther: [
            {required: true, message: '请填写文章作者', trigger: 'blur'},
          ],
          articletype_id: [
            {required: true,validator: checkarticletype, trigger: 'blur'}
          ]
        }
      }
    },
    created() {
    },
    methods: {
      updateData(data) {
        this.form.content = data
      },
      changeArticletype(value) {
        this.form.articletype_name = value.label
        this.form.articletype_id = value.value
      },
      add() {
        this.$refs.add.validate((valid) => {
          if (valid) {
            this.modal_loading = true;
            let data = this.form;
            this.apiPost('article', data).then((res) => {
              this.handelResponse(res, (data, msg) => {
                this.modal = false;
                this.$parent.getData();
                this.$Message.success(msg);
                this.modal_loading = false;
                this.$refs.add.resetFields();
                this.$refs.select.clearSingleSelect()
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
      }
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

<style>
  .scatteredarticle-add-form {
    padding: 20px;
  }
</style>
<template>
  <div>
    <Modal
      v-model="modal" width="600">
      <p slot="header">
        <span>添文章段落</span>
      </p>
      <div>
        <Form ref="scatteredarticleadd" :model="form" :label-width="90" :rules="scatterrdArticlAddRule"
              class="scatteredarticle-add-form">
          <Form-item label="文章段落" prop="content_paragraph">
            <Input ref="input" :clearable="sel" v-model="form.content_paragraph" type="textarea" :autosize="{minRows: 2,maxRows: 20}"
                   placeholder="请输入文章段落">
            </Input>
          </Form-item>
          <Form-item label="分类" prop="articletype_id">
            <Select ref="select" :clearable="selects" v-model="form.articletype_id" style="text-align: left"
                    label-in-value filterable　clearable @on-change="changeArticleType">
<<<<<<< HEAD
              <Option v-for="item in articleTypeList" :value="item.id" :label="item.text" :key="item">
=======
              <Option disabled :value="0">分类名—标签</Option>
              <Option v-for="item in articleTypeList" :value="item.id" :label="item.name" :key="item">
>>>>>>> 769dbdd7ae3ce5cbbeaae3cf6f06e38962399fba
                {{ item.text }}
              </Option>
            </Select>
          </Form-item>
        </Form>
      </div>
      <div slot="footer">
        <Button type="success" size="large" :loading="modal_loading" @click="add">保存</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import http from '../../../assets/js/http.js'
  export default {
    data () {
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
        label_in_value: true,
        selects:true,
        sel:true,
        form: {
          content_paragraph: '',
          articletype_id: 0,
          articletype_name: '',
        },
        scatterrdArticlAddRule: {
          content_paragraph: [
            {required: true, message: '请填写文章段落', trigger: 'blur'},
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
      changeArticleType(value){
        this.form.articletype_name = value.label;
        this.form.articletype_id = value.value;
      },
      add()
      {
        this.$refs.scatteredarticleadd.validate((valid) => {
          if (valid) {
            this.modal_loading = true;
            let data = this.form;
            this.apiPost('scatteredArticle', data).then((res) => {
              this.handelResponse(res, (data, msg) => {
                this.modal = false;
                this.$parent.getData();
                this.$Message.success(msg);
                this.$refs.scatteredarticleadd.resetFields();
                this.$refs.select.clearSingleSelect()
                this.modal_loading = false;
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
      ,
    },
    props: {
      articleTypeList: {
        default: []
      },
    },
    mixins: [http]
  }
</script>

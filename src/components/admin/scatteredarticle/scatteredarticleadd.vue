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
        <span>添零散段落</span>
      </p>
      <div>
        <Form ref="scatteredarticleadd" :model="form" :label-width="90" :rules="scatterrdArticlAddRule"
              class="scatteredarticle-add-form">
          <Form-item label="段落" prop="detail">
            <Input v-model="form.content_paragraph" type="textarea" :autosize="{minRows: 2,maxRows: 20}"
                   placeholder="请输入零散段落">
            </Input>
          </Form-item>
          <Form-item label="分类" prop="articletype_id">
            <Select v-model="form.articletype_id" style="text-align: left"
                    label-in-value filterable　clearable @on-change="changeArticleType">
              <Option v-for="item in articleTypeList" :value="item.id" :label="item.name" :key="item">
                {{ item.name }}
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
      return {
        modal: false,
        modal_loading: false,
        label_in_value: true,
        form: {
          content_paragraph: '',
          articletype_id: 0,
          articletype_name: '',
        },
        scatterrdArticlAddRule: {
          content_paragraph: [
            {required: true, message: '请填写段落', trigger: 'blur'},
          ],
        }
      }
    },
    methods: {
      changeArticleType(value){
        this.form.articletype_name = value.label;
        this.form.articletype_id = value.value;
      },
      add()
      {
        if (!this.form.articletype_id) {
          this.$Message.error('请选择所属分类');
          return
        }
        this.$refs.scatteredarticleadd.validate((valid) => {
          if (valid) {
            this.modal_loading = true;
            let data = this.form;
            this.apiPost('scatteredArticle', data).then((res) => {
              this.handelResponse(res, (data, msg) => {
                this.$refs.scatteredarticleadd.resetFields();
                this.modal = false;
                this.$parent.getData();
                this.$Message.success(msg);
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
          } else {
            return false;
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

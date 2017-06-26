<style>
  .scatteredarticle-edit-form {
    padding: 10px;
  }
</style>
<template>
  <div>
    <Modal
      v-model="modal"
      title="修改段落"
      width="600">
      <p slot="header">
        <Icon type="information-circled"></Icon>
        <span>修改段落</span>
      </p>
      <div>
        <Form ref="scatterrdarticlesave" :model="form"  :label-width="90" :rules="scatterrdArticlEditRule"
              class="scatteredarticle-edit-form">
          <Form-item label="段落" prop="content_paragraph">
            <Input v-model="form.content_paragraph" type="textarea" :autosize="{minRows: 2,maxRows: 20}" placeholder="请输入零散段落"></Input>
          </Form-item>
          <Form-item label="分类" prop="articletype_id">
            <Select  ref="select" :clearable="selects"v-model="form.articletype_id" style="text-align: left"
                    label-in-value  clearable @on-change="changeArticleType">
              <Option v-for="item in articleTypeList" :value="item.id" :label="item.name" :key="item">
                {{ item.name }}
              </Option>
            </Select>
          </Form-item>
        </Form>
      </div>
      <div slot="footer">
        <Button type="success" size="large" :loading="modal_loading" @click="edit">修改</Button>
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
        selects:true,
        modal_loading: false,
        scatterrdArticlEditRule: {
          content_paragraph: [
            {required: true, message: '请填写段落', trigger: 'blur'},
          ],
          articletype_id: [
            {required: true,validator: checkarticletype, trigger: 'blur'}
          ]
        },
      }
    },
    methods: {
      changeArticleType(value){
        this.form.articletype_name = value.label;
        this.form.articletype_id = value.value;
      },
      clearTitleType(){
        this.$refs.select.clearSingleSelect()
      },
      edit()
      {
        this.$refs.scatterrdarticlesave.validate((valid) => {
          if (valid) {
            this.modal_loading = true;
            let data = this.form;
            let id = data.id;
            this.apiPut('scatteredArticle/' + id, data).then((res) => {
              this.handelResponse(res, (data, msg) => {
                this.$refs.scatterrdarticlesave.resetFields();
                this.modal = false;
                this.$parent.getData();
                this.$Message.success(msg);
                this.$refs.select.clearSingleSelect()
                this.modal_loading = false;
              }, (data, msg) => {
                this.modal_loading = false;
                this.$Message.error(msg);
              })
            }, (res) => {
              //处理错误信息
              this.$Message.error('网络异常，请稍后重试。');
              this.modal_loading = false;
            })
          } else {
            return false;
          }
        })
      }
    },
    props: {
      form: {
        default: {
          content_paragraph: '',
          articletype_id: 0,
          articletype_name: ''
        }
      },
      articleTypeList: {
        default: []
      },
    },
    mixins: [http]
  }
</script>

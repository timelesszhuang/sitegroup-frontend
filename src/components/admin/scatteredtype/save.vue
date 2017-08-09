<style>
  .scatteredarticle-edit-form {
    padding: 10px;
  }
</style>
<template>
  <div>
    <Modal
      v-model="modal"
      title="修改分类"
      width="600">
      <p slot="header">
        <Icon type="information-circled"></Icon>
        <span>修改分类</span>
      </p>
      <div>
        <Form ref="scatterrdarticlesave" :model="form"  :label-width="90" :rules="scatterrdArticlEditRule"
              class="scatteredarticle-edit-form">
          <Form-item label="分类名" prop="name">
            <Input ref="input" :clearable="sel" v-model="form.name" placeholder="请输入分类名">
            </Input>
          </Form-item>
          <Form-item label="描述" prop="detail">
            <Input ref="input" :clearable="sel" v-model="form.detail" placeholder="请输入描述">
            </Input>
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
      return {
        modal: false,
        sel:true,
        selects:true,
        modal_loading: false,
        scatterrdArticlEditRule: {
          name: [
            {required: true, message: '请填写分类名', trigger: 'blur'},
          ],
          detail: [
            {required: true,message:'请输入描述',trigger:'blur'}
          ]
        },
      }
    },
    methods: {
      edit()
      {
        this.$refs.scatterrdarticlesave.validate((valid) => {
          if (valid) {
            this.modal_loading = true;
            let data = this.form;
            let id = data.id;
            this.apiPut('sca/all/' + id, data).then((res) => {
              this.handelResponse(res, (data, msg) => {
                this.$refs.scatterrdarticlesave.resetFields();
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
            name:''
        }
      },
      articleTypeList: {
        default: []
      },
    },
    mixins: [http]
  }
</script>

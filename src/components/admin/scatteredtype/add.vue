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
        <span>添加文章段落分类</span>
      </p>
      <div>
        <Form ref="scatteredarticleadd" :model="form" :label-width="90" :rules="scatterrdArticlAddRule" class="scatteredarticle-add-form">
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
        selects:true,
        sel:true,
        form: {
          name: '',
          detail: '',
        },
        scatterrdArticlAddRule: {
          name: [
            {required: true, message: '请填写分类名', trigger: 'blur'},
          ],
          detail: [
            {required: true,message:'请输入描述',trigger:'blur'}
          ]
        }
      }
    },
    created() {

    },
    methods: {
      add()
      {
        this.$refs.scatteredarticleadd.validate((valid) => {
          if (valid) {
            this.modal_loading = true;
            let data = this.form;
            this.apiPost('sca/all', data).then((res) => {
              this.handelResponse(res, (data, msg) => {
                this.modal = false;
                this.$parent.getData();
                this.$Message.success(msg);
                this.$refs.scatteredarticleadd.resetFields();
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

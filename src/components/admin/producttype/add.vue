<template>
  <div>
    <div>
      <Modal
        v-model="modal" width="600">
        <p slot="header">
          <span>添加产品分类</span>
        </p>
        <div>
          <Form ref="ptypeadd" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
            <Form-item label="分类名称" prop="name">
              <Input type="text" v-model="form.name" placeholder="请输入分类名"></Input>
            </Form-item>
            <Form-item label="详情" prop="detail">
              <Input type="text" v-model="form.detail" placeholder="请输入分类详情"></Input>
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
      return {
        modal: false,
        modal_loading: false,
        form: {
          name: "",
          detail: "",
        },
        AddRule: {
          name: [
            {required: true, message: '请填写分类', trigger: 'blur'},
          ],
          detail: [
            {required: true, message: '请填写详情', trigger: 'blur'},
          ],
        }
      }
    },
    methods: {
        add() {
          this.$refs.ptypeadd.validate((valid) => {
              if(valid){
                this.modal_loading = true;
                let data = this.form;
                this.apiPost('admin/productType', data).then((res) => {
                  this.handelResponse(res, (data, msg) => {
                    this.modal = false;
                    this.$parent.getData();
                    this.$Message.success(msg);
                    this.modal_loading = false;
                    this.$refs.ptypeadd.resetFields();
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
    mixins: [http]
  }
</script>

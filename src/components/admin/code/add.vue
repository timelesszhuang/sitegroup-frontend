<template>
  <div>
    <div>
      <Modal
        v-model="modal" width="900">
        <p slot="header">
          <span>添加代码</span>
        </p>
        <div>
          <Form ref="code" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
            <Form-item label="分类名称" prop="name">
              <Input type="text" v-model="form.name" placeholder="请输入名称"></Input>
            </Form-item>
            <Form-item label="公共模板" prop="code">
              <Input v-model="form.code" type="textarea" :autosize="{minRows: 2,maxRows: 20}"
                     placeholder="请输入代码">
              </Input>
            </Form-item>
            <Form-item label="代码位置" prop="position">
              <Radio-group v-model="form.position">
                <Radio label="1">
                  <Icon type="social-apple"></Icon>
                  <span>head前</span>
                </Radio>
                <Radio label="2">
                  <Icon type="social-android"></Icon>
                  <span>head后</span>
                </Radio>
              </Radio-group>
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
          code: "",
          position:"1"
        },
        AddRule: {
          name: [
            {required: true, message: '请填写公共代码名称', trigger: 'blur'},
          ],
          code: [
            {required: true, message: '请填写代码', trigger: 'blur'},
          ]

        }
      }
    },
    methods: {
        add() {
          this.$refs.code.validate((valid) => {
              if(valid){
                this.modal_loading = true;
                let data = this.form;
                this.apiPost('code', data).then((res) => {
                  this.handelResponse(res, (data, msg) => {
                    this.modal = false;
                    this.$parent.getData();
                    this.$Message.success(msg);
                    this.modal_loading = false;
                    this.$refs.code.resetFields();
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

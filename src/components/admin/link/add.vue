<template>
  <div>
    <div>
      <Modal
        v-model="modal" width="500">
        <p slot="header">
          <span>添加</span>
        </p>
        <div>
          <Form ref="linkadd" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
            <Form-item label="名称" prop="name">
              <Input type="text" v-model="form.name" placeholder="请输入名称"></Input>
            </Form-item>
            <Form-item label="链接" prop="domain">
              <Input type="text" v-model="form.domain" placeholder="请输入链接">
              <span slot="prepend">http://</span>
              </Input>
            </Form-item>
            <Form-item label="详情" prop="detail">
              <Input v-model="form.detail" type="textarea" :autosize="{minRows: 2,maxRows: 20}"
                     placeholder="请输入详情">
              </Input>
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
          domain:"",
          detail:""
        },
        AddRule: {
          name: [
            {required: true, message: '请输入名称', trigger: 'blur'},
          ],
          domain: [
            {required: true, message: '请输入链接', trigger: 'blur'},
          ],
          detail: [
            {required: true, message: '请输入详情', trigger: 'blur'},
          ],
        }
      }
    },
    methods: {
        add() {
          this.$refs.linkadd.validate((valid) => {
              if(valid){
                this.modal_loading = true;
                let data = this.form;
                this.apiPost('links', data).then((res) => {
                  this.handelResponse(res, (data, msg) => {
                    this.modal = false;
                    this.$parent.getData();
                    this.$Message.success(msg);
                    this.modal_loading = false;
                    this.$refs.linkadd.resetFields();
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

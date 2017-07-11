<template>
  <div>
    <div>
      <Modal
        v-model="modal" width="600">
        <p slot="header">
          <span>修改</span>
        </p>
        <div>
          <Form ref="linksave" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
            <Form-item label="title" prop="title">
              <Input type="text" v-model="form.title" placeholder="请输入title"></Input>
            </Form-item>
            <Form-item label="关键词" prop="keyword">
              <Input type="text" v-model="form.keyword" placeholder="请输入关键词用逗号隔开"></Input>
            </Form-item>
            <Form-item label="description" prop="description">
              <Input v-model="form.description" type="textarea" :autosize="{minRows: 2,maxRows: 20}"
                     placeholder="请输入description">
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
        AddRule: {
          name: [
            {required: true, message: '请输入名称', trigger: 'blur'},
          ],
          domain: [
            {required: true, message: '请输入url', trigger: 'blur'},
          ],
          detail: [
            {required: true, message: '请输入详情', trigger: 'blur'},
          ],
        }
      }
    },
    methods: {
        add() {
          this.$refs.linksave.validate((valid) => {
              if(valid){
                this.modal_loading = true;
                let data = this.form;
                let id = data.id;
                this.apiPut('tdk/'+ id, data).then((res) => {
                  this.handelResponse(res, (data, msg) => {
                    this.modal = false;
                    this.$parent.getData();
                    this.$Message.success(msg);
                    this.modal_loading = false;
                    this.$refs.linksave.resetFields();
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
    props: {
      form: {
        default: {
          name: '',
          detail:'',
          domain:''
        }
      }
    },
    mixins: [http]
  }
</script>

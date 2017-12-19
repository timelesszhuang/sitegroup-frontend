<template>
  <div>
    <div>
      <Modal
        v-model="modal" width="800">
        <p slot="header">
          <span>修改</span>
        </p>
        <div>
          <Form ref="contentsave" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
            <Form-item label="内容名称" prop="name">
              <Input type="text" v-model="form.name" placeholder="请输入名称"></Input>
            </Form-item>
            <Form-item label="英文名" prop="en_name">
              <Input type="text"  v-model="form.en_name" placeholder="请输入英文名"></Input>
            </Form-item>
            <Form-item label="链接" prop="href">
              <Input type="text" v-model="form.href" placeholder="请输入链接"></Input>
            </Form-item>
            <Form-item label="内容" prop="content" style="height:100%;">
              <editor @change="updateData" :content="form.content" :height="300" :auto-height="false"></editor>
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
          en_name: [
            {required: true, message: '请填写英文名', trigger: 'blur'},
          ],
          name: [
            {required: true, message: '请输入名称', trigger: 'blur'},
          ],
        }
      }
    },
    methods: {
      updateData(data) {
        this.form.content = data
      },
        add() {
          this.$refs.contentsave.validate((valid) => {
              if(valid){
                this.modal_loading = true;
                let data = this.form;
                let id = data.id;
                this.apiPut('content_get/'+ id, data).then((res) => {
                  this.handelResponse(res, (data, msg) => {
                    this.modal = false;
                    this.$parent.getData();
                    this.$Message.success(msg);
                    this.modal_loading = false;
                    this.$refs.contentsave.resetFields();
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

        }
      }
    },
    mixins: [http]
  }
</script>

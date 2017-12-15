<template>
  <div>
    <div>
      <Modal
        v-model="modal"
        width="500"
        :styles="{top: '20px'}"
      >
        <p slot="header">
          <span>添加</span>
        </p>
        <div>
          <Form ref="padd" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
            <Form-item label="名称" prop="name">
              <Input type="text" v-model="form.name" placeholder="请输入图集名称"></Input>
            </Form-item>
            <Form-item label="英文名称" prop="en_name">
              <Input type="text" v-model="form.en_name" placeholder="请输入当前轮播图集的名称"></Input>
            </Form-item>
            <!--<Form-item label="页面关键词" prop="keywords">-->
            <!--<Input type="text" v-model="form.keywords" placeholder="请输入页面关键词"></Input>-->
            <!--</Form-item>-->

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

        selects: true,
        form: {
          name: '',
          en_name: '',
        },
        AddRule: {
          name: [
            {required: true, message: '请输入图集名称', trigger: 'blur'},
          ],
          en_name: [
              {required: true, message: '请输入当前轮播图集的名称', trigger: 'blur'},
            ],
        }
      }
    },
    methods: {
      add() {
        this.$refs.padd.validate((valid) => {
          if (valid) {
            this.modal_loading = true;
            let data = this.form;
            this.apiPost('imglist', data).then((res) => {
              this.handelResponse(res, (data, msg) => {
                this.modal = false;
                this.$parent.getData();
                this.$Message.success(msg);
                this.modal_loading = false;
                this.$refs.padd.resetFields();
                this.$refs.select.clearSingleSelect()
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
    mixins: [http],
  }
</script>


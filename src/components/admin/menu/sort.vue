<template>
  <div>
    <Modal
      v-model="modal" width="250">
      <p slot="header">
        <span>修改排序</span>
      </p>
      <div>
        <Form ref="title" :model="form" :label-width="60" :rules="AddRule" class="node-add-form">
          <Form-item label="排序" prop="sort">
            <Input-number  :min="0" v-model="form.sort"  placeholder="请填写当前栏目的排序"></Input-number>
          </Form-item>
        </Form>
        <Alert type="error">生成栏目的顺序,值越大生成的栏目越靠前</Alert>
      </div>
      <div slot="footer">
        <Button type="success" size="large" :loading="modal_loading" @click="savetitle">保存</Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';
  export default {
    data() {
      const checksort= (rule, value, callback) => {
        if(!/^-?[1-9]\d*$/.test(value)){
          callback(new Error('请输入数字'));
        } else {
          callback();
        }
      };
      return {
        modal: false,
        modal_loading: false,
        AddRule: {
          sort: [
            {required: true,validator: checksort, trigger: 'blur'}
          ],
        }
      }
    },
    methods: {
        savetitle() {
        this.$refs.title.validate((valid) => {
          if (valid) {
            this.modal_loading = true;
            let data = this.form;
            let id = data.id;
            this.apiPut('menusort/' + id, data).then((res) => {
              this.handelResponse(res, (data, msg) => {
                this.modal = false;
                this.$parent.getData();
                this.$Message.success(msg);
                this.modal_loading = false;
                this.$refs.title.resetFields();
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
    props: {
      form: {
        default: {
          sort: '',
        }
      }
    }
  }
</script>


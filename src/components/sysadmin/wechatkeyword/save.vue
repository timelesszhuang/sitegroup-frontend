<template>
  <div>
    <div>
      <Modal
        v-model="modal" width="600">
        <p slot="header">
          <span>修改</span>
        </p>
        <div>
          <Form ref="wechatksave" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
            <Form-item label="关键词" prop="name">
              <Input type="text" v-model="form.name" placeholder="请输入名称"></Input>
            </Form-item>
            <Form-item label="关键词描述" prop="detail">
              <Input type="text" v-model="form.detail" placeholder="请输入关键词描述"></Input>
            </Form-item>
            <Form-item label="关键词分类" prop="type_name">
              <Select v-model="form.type_id" @on-change="changeType" style="width: 200px;" label-in-value filterable clearable >
                <Option v-for="item in types" :value="item.id" :label="item.text" :key="item">
                  {{ item.text }}
                </Option>
              </Select>
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
        keyword_type:'',
        AddRule: {
          name: [
            {required: true, message: '请输入名称', trigger: 'blur'},
          ],

        }
      }
    },
    methods: {
      changeType(label) {
        this.form.type_id=label.value;
        this.form.type_name=label.label;
      },
        add() {
          this.$refs.wechatksave.validate((valid) => {
              if(valid){
                this.modal_loading = true;
                let data = this.form;
                this.apiPost('sys/editKeyword',data).then((res) => {
                  this.handelResponse(res, (data, msg) => {
                    this.modal = false;
                    this.$parent.getData();
                    this.$Message.success(msg);
                    this.modal_loading = false;
                    this.$refs.wechatksave.resetFields();
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
      types:{
        default:{

        }
      },
      form: {
        default: {
          name: '',
        }
      }
    },
    mixins: [http]
  }
</script>

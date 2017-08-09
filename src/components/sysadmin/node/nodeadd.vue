<style>
  .node-add-form {
    padding: 20px;
  }
</style>
<template>
  <div>
    <Modal
      v-model="modal" width="600">
      <p slot="header">
        <!--<Icon type="person-add"></Icon>-->
        <span>添加节点信息</span>
      </p>
      <div>
        <Form ref="nodeadd" :model="form" :label-width="90" :rules="nodeAddRule" class="node-add-form">
          <Form-item label="节点名" prop="name">
            <Input type="text" v-model="form.name" placeholder="请输入节点名"></Input>
          </Form-item>
          <Form-item label="详情" prop="detail">
            <Input type="text" v-model="form.detail" placeholder="请输入节点相关信息"></Input>
          </Form-item>
          <Form-item label="公司" prop="com_id">
            <Select v-model="form.com_id" style="text-align: left"
                    label-in-value filterable　@on-change="changeCompany">
              <Option v-for="item in company" :value="item.id" :label="item.name" :key="item">
                {{ item.name }}
              </Option>
            </Select>
          </Form-item>
          <Form-item label="管理账号" prop="user_id">
            <Select v-model="form.user_id" style="width:150px;text-align: left"
                    label-in-value　filterable @on-change="changeUser">
              <Option v-for="item in user" :value="item.id" :label="item.name" :key="item">
                {{ item.name }}
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
</template>
<script>
  import http from '../../../assets/js/http.js'
  export default {
    data () {
      const checktype = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请选择管理账号'));
        } else {
          callback();
        }
      };
      const checkcomtype = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请选择公司名'));
        } else {
          callback();
        }
      };
      return {
        modal: false,
        modal_loading: false,
        label_in_value: true,
        form: {
          name: '',
          detail: '',
          com_id: 0,
          com_name: '',
          user_id: '',
          user_name: ''
        },
        nodeAddRule: {
          name: [
            {required: true, message: '请填写节点名', trigger: 'blur'},
          ],
          detail: [
            {required: true, message: '请填写节点详情', trigger: 'blur'},
          ],
          user_id:[
            {required: true,validator: checkcomtype, trigger: 'blur'}
          ],
          com_id:[
            {required:true,validator:checktype,trigger:"blur"}
          ]

        }
      }
    },
    methods: {
      changeUser(value){
        this.form.user_name = value.label;
        this.form.user_id = value.value;
      },
      changeCompany(value){
        this.form.com_name = value.label;
        this.form.com_id = value.value;
      },
      add()
      {
        if (!this.form.user_id) {
          this.$Message.error('请选择管理账号');
          return
        }
        if (!this.form.user_id) {
          this.$Message.error('请选择所属公司');
          return
        }
        this.$refs.nodeadd.validate((valid) => {
          if (valid) {
            this.modal_loading = true;
            let data = this.form;
            this.apiPost('node', data).then((res) => {
              this.handelResponse(res, (data, msg) => {
                this.modal = false;
                this.$parent.getData();
                this.$Message.success(msg);
                this.modal_loading = false;
                this.$refs.nodeadd.resetFields();
              }, (data, msg) => {
                this.modal_loading = false;
                this.$Message.error(msg);
              })
            }, (res) => {
              //处理错误信息
              this.modal_loading = false;
              this.$Message.error('网络异常，请稍后重试。');
            })
          } else {
            return false;
          }
        })
      }
      ,
    },
    props: {
      company: {
        default: []
      },
      user: {
        default: []
      }
    },
    mixins: [http]
  }
</script>

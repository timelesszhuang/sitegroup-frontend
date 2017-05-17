<template>
  <div>
    <div>
      <Modal
        v-model="modal" width="600">
        <p slot="header">
          <span>修改</span>
        </p>
        <div>

          <Form ref="sitetypesave" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
            <Form-item label="分类名称" prop="name">
              <Input type="text" v-model="form.name" placeholder="请输入名称"></Input>
            </Form-item>
            <Form-item label="描述" prop="detail">
              <Input type="text" v-model="form.detail" placeholder="请输入描述"></Input>
            </Form-item>
            <Form-item label="链轮类型" prop="chain_type">
              <Select v-model="form.chain_type" style="text-align: left;width:200px;">
                <Option v-for="item in chain_type" :value="item.value" :key="item">{{ item.label }}</Option>
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
        chain_type: [
          {
            value: '10',
            label: '循环'
          },
          {
            value: '20',
            label: '金字塔'
          }
        ],
        AddRule: {
          name: [
            {required: true, message: '请输入名称', trigger: 'blur'},
          ],
          detail: [
            {required: true, message: '请输入描述', trigger: 'blur'},

          ],
          chain_type: [
            {required: true, message: '请输入链轮类型', trigger: 'blur'},
          ],

        }
      }
    },
    methods: {
        add() {
          this.$refs.sitetypesave.validate((valid) => {
              if(valid){
                this.modal_loading = true;
                let data = this.form;
                let id = data.id;
                this.apiPut('sitetype/'+ id, data).then((res) => {
                  this.handelResponse(res, (data, msg) => {
                    this.modal = false;
                    this.$parent.getData();
                    this.$Message.success(msg);
                    this.modal_loading = false;
                    this.$refs.sitetypesave.resetFields();
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
          detail: '',
          chain_type:''
        }
      }
    },
    mixins: [http]
  }
</script>

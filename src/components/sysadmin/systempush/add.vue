<template>
  <div>
    <div>
      <Modal
        v-model="modal" width="900">
        <p slot="header">
          <span>添加</span>
        </p>
        <div>
          <Form ref="marketingadd" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
            <Form-item label="标题" prop="title">
              <Input type="text" v-model="form.title" placeholder="请输入标题"></Input>
            </Form-item>
            <Form-item label="关键词" prop="node_ids">
              <Select v-model="form.node_ids" multiple  style="width:150px;text-align: left;position:relative;text-align: left;z-index: 10000;">
                <Option v-for="item in nodeids" :value="item.id" :label="item.name" :key="item">
                  {{ item.name }}
                </Option>
              </Select>
            </Form-item>
            <Form-item label="推送内容" prop="content">
              <editor @change="updateData" :content="form.content " :height="300"></editor>
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
          title:'',
          content:'',
          node_ids:[]
        },
        AddRule: {
          title: [
            {required: true, message: '请输入标题', trigger: 'blur'},
          ],
          content: [
            {required: true, message: '请输入推送内容', trigger: 'blur'},
          ],
        }
      }
    },
    methods: {
      updateData(data) {
        this.form.content = data
      },
      changeIndustry(value){
        this.form.industry_name = value.label;
        this.form.industry_id = value.value;
      },
        add() {
          this.$refs.marketingadd.validate((valid) => {
              if(valid){
                this.modal_loading = true;
                let data = this.form;
                this.apiPost('sys/SystemNotice', data).then((res) => {
                  this.handelResponse(res, (data, msg) => {
                    this.modal = false;
                    this.$parent.getData();
                    this.$Message.success(msg);
                    this.modal_loading = false;
                    this.$refs.marketingadd.resetFields();
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
      nodeids: {
        default: []
      },
    },
    mixins: [http]
  }
</script>

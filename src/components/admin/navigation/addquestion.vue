<template>
  <div>
    <div>
      <Modal
        v-model="modal" width="600">
        <p slot="header">
          <span>添加问答型栏目</span>
        </p>
        <div>
          <Form ref="questionadd" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
            <Form-item label="分类名称" prop="name">
              <Input type="text" v-model="form.name" placeholder="请填写菜单名字"></Input>
            </Form-item>
            <Form-item label="英文名" prop="generate_name">
              <Input type="text" v-model="form.generate_name" placeholder="请填写英文名，用于生成静态页命名"></Input>
            </Form-item>
            <Form-item label="详情" prop="title">
              <Input type="text" v-model="form.title" placeholder="请填写栏目的详情"></Input>
            </Form-item>
            <Form-item label="问答分类" prop="type_name">
              <Select v-model="form.type_id" style="text-align: left;width:200px;"
                      label-in-value filterable　@on-change="changeQuestiontype">
                <Option v-for="item in questiontype" :value="item.id" :label="item.name" :key="item">
                  {{ item.name }}
                </Option>
              </Select>
            </Form-item>
          </Form>
        </div>
        <div slot="footer">
          <Button type="success" size="large" :loading="modal_loading" @click="addquestion">保存</Button>
        </div>
      </Modal>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';

  export default {
    data() {
      const checkquestiontype = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请选择问答分类'));
        } else {
          callback();
        }
      };
      return {
        modal: false,
        modal_loading: false,
        form: {
          name: "",
          title: "",
          flag:"2",
          flag_name:"问答型",
          type_id:'',
          type_name:'',
          generate_name:''
        },
        AddRule: {
          name: [
            {required: true, message: '请填写菜单名字', trigger: 'blur'},
          ],
          title: [
            {required: true, message: '请填写栏目的详情', trigger: 'blur'},
          ],
          type_name: [
            {required: true,validator: checkquestiontype, trigger: 'blur'}
          ],
          generate_name:[
            {required: true, message: '请填写生成的文件名', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      changeQuestiontype(value) {
        this.form.type_name= value.label
        this.form.type_id = value.value
      },
      addquestion() {
          this.$refs.questionadd.validate((valid) => {
              if(valid){
                this.modal_loading = true;
                let data = this.form;
                this.apiPost('menu', data).then((res) => {
                  this.handelResponse(res, (data, msg) => {
                    this.modal = false;
                    this.$parent.getData();
                    this.$Message.success(msg);
                    this.modal_loading = false;
                    this.$refs.questionadd.resetFields();
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
      questiontype: {
        default: []
      }
    }
  }
</script>

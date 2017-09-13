<template>
  <div>
    <div>
      <Modal
        v-model="modal" width="800">
        <p slot="header">
          <span>添加问答</span>
        </p>
        <div>
          <Form ref="questionadd" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
            <Form-item label="问题名" prop="question">
              <Input type="text" v-model="form.question" placeholder="请填写问题"></Input>
            </Form-item>
            <Form-item label="问答分类" prop="articletype_id">
              <Select   ref="select" :clearable="selects" v-model="form.type_id" style="position:relative;z-index:10000;text-align: left;width:200px;"
                      label-in-value filterable　@on-change="changeArticletype">
                <Option v-for="item in questiontype" :value="item.id" :label="item.name" :key="item">
                  {{ item.name }}
                </Option>
              </Select>
            </Form-item>
            <Form-item label="答案" prop="content_paragraph">
              <editor @change="updateData" :content="form.content_paragraph"  :height="300" :auto-height="false"></editor>
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
          question: "",
          content_paragraph: "",
          type_id:0,
          type_name:''
        },
        selects:true,
        AddRule: {
          question: [
            {required: true, message: '请填写问题名', trigger: 'blur'},
          ],
          content_paragraph: [
            {required: true, message: '请填写答案', trigger: 'blur'},
          ],
          questiontype_id: [
            {required: true,validator: checkquestiontype, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      updateData(data) {
        this.form.content_paragraph = data
      },
      changeArticletype(type) {
          this.form.type_name=type.label;
      },
      add() {
        this.$refs.questionadd.validate((valid) => {
          if (valid) {
            this.modal_loading = true;
            let data = this.form;
            this.apiPost('question', data).then((res) => {
              this.handelResponse(res, (data, msg) => {
                this.modal = false;
                this.$parent.getData();
                this.$Message.success(msg);
                this.modal_loading = false;
                this.$refs.questionadd.resetFields();
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
    props: {
      questiontype: {
        default: []
      }
    }
  }

</script>

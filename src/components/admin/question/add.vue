<template>
  <div>
    <div>
      <Modal
        v-model="modal"
        width="800"
        :styles="{top: '20px'}"
      >
        <p slot="header">
          <span>添加问答</span>
        </p>
        <div>
          <Form ref="questionadd" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
            <Form-item label="问题名" prop="question">
              <Input type="text" v-model="form.question" placeholder="请填写问题"></Input>
            </Form-item>
            <Form-item label="问答分类" prop="articletype_id">
              <Select v-model="form.type_id"  ref="select" :clearable="selects" style="width:200px;position: relative;z-index: 10000;"
                      label-in-value  filterable clearable  placeholder="根据分类查询" @on-change="changeArticletype"  >
                <Option-group  v-for="(item,index) in questiontype" :label="index" :key="item">
                  <Option v-for="items in item"  :value="items.id" :label="items.name" :key="index">{{ items.name }}</Option>
                </Option-group>
              </Select>
            </Form-item>
            <Form-item label="答案" prop="content_paragraph">
              <editor @change="updateData" :content="form.content_paragraph"  :height="300" :auto-height="false"></editor>
            </Form-item>
            <Form-item label="页面关键词" prop="keywords">
              <Input type="text" v-model="form.keywords" placeholder="请输入页面关键词(尽量用英文符号分割)" style="width: 200px;"></Input>
            </Form-item>
            <Form-item label="页面文章描述" prop="description">
              <Input v-model="form.description" :rows="3" type="textarea" placeholder="请输入页面文章描述"></Input>
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

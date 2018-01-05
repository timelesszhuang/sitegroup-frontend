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
            <Row>
              <Col span="21">
              <Form-item v-if="tag_name" label="分类标签" prop="tags">
                <Select ref="select" :clearable="selects" v-model="form.tag_id"
                        style="position:relative;text-align: left;width:350px;z-index: 10000;"
                        label-in-value multiple　>
                  <Option v-for="(item,index) in tagname" :value="index" :label="item" :key="index">
                    {{item}}
                  </Option>

                </Select>
              </Form-item>
              <Form-item label="分类标签" v-if="!tag_name" prop="tag_id">
                <Input type="text" style="width:350px;" v-model="form.tags" placeholder="请输入标签区分分类"></Input>
                <Button type="success" size="small" :loading="modal_loading" @click="addtags">添加标签</Button>
              </Form-item>
              </Col>
              <Col span="3">
              <i-switch size="large" v-model="switch1" @on-change="change">
                <span slot="open">选择</span>
                <span slot="close">填写</span>
              </i-switch>
              </Col>
            </Row>
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
        switch1: true,
        tag_name: true,
        modal: false,
        modal_loading: false,
        form: {
          question: "",
          content_paragraph: "",
          type_id:0,
          type_name:'',
          tag_id: [],
          tags: ''
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
      change(status) {
        if (status) {
          this.tag_name = true
          this.$Message.info('切换到下拉选择');
        } else {
          this.tag_name = false
          this.$Message.info('切换到添加标签');
        }

      },
      changeTagtype(value) {
        this.form.tag_id = value.value
      },
      updateData(data) {
        this.form.content_paragraph = data
      },
      addtags() {
        let data = {
          type: "question",
          name:this.form.tags
        }
        this.apiPost('admin/tags', data).then((res) => {
          this.handelResponse(res, (data, msg) => {
            let tempN = this.form.tag_id
            let tagId = data.id
            let tagnum = tagId.toString()
            tempN.push(tagnum)
            this.$parent.gettag();
            this.$Message.success(msg);
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (res) => {
          //处理错误信息
          this.$Message.error('网络异常，请稍后重试。');
        })

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
      },
      tagname: {
        default: {}
      }
    }
  }

</script>

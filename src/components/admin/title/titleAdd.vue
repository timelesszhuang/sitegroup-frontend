<template>
  <div>
    <div>
      <Modal
        v-model="modal" width="600">
        <p slot="header">
          <span>添加标题</span>
        </p>
        <div>
          <Form ref="titleadd" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
            <Form-item label="标题" prop="title">
              <Input type="text" v-model="form.title" placeholder="请填写标题"></Input>
            </Form-item>
            <Form-item label="文章分类" prop="articletype_id">
              <Select v-model="form.articletype_id" style="text-align: left;width:200px;"
                      label-in-value filterable　@on-change="changeArticletype">
                <Option v-for="item in articletype" :value="item.id" :label="item.name" :key="item">
                  {{ item.name }}
                </Option>
              </Select>
            </Form-item>
          </Form>
          <Alert type="warning">
            如果选择的 <b>文章分类</b> 下的 <b>零散文章</b> 的数量不足 15篇,不会给该标题 随机生成文章。 也就不会出现在 站群的节点中。
          </Alert>
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
      const checkarticletype = (rule, value, callback) => {
        if (value === 0) {
          callback(new Error('请选择文章分类'));
        } else {
          callback();
        }
      };
      return {
        modal: false,
        modal_loading: false,
        form: {
          title: "",
          articletype_id: 0,
          articletype_name: ''
        },
        AddRule: {
          title: [
            {required: true, message: '请填写问题名', trigger: 'blur'},
          ],
          articletype_id: [
            {validator: checkarticletype, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      changeArticletype(type) {
        this.form.articletype_name = type.label;
      },
      add() {
        this.$refs.titleadd.validate((valid) => {
          if (valid) {
            this.modal_loading = true;
            let data = this.form;
            this.apiPost('scatteredTitle', data).then((res) => {
              this.handelResponse(res, (data, msg) => {
                this.modal = false;
                this.$parent.getData();
                this.$Message.success(msg);
                this.modal_loading = false;
                this.$refs.titleadd.resetFields();
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
      articletype: {
        default: []
      }
    }
  }

</script>

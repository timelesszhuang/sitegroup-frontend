<template>
  <div>
    <div>
      <Modal
        v-model="modal" width="600">
        <p slot="header">
          <span>修改问答</span>
        </p>
        <div>
          <Form ref="titlesave" :model="form" :label-width="90" :rules="SaveRule">
            <Form-item label="标题" prop="title">
              <Input type="text" v-model="form.title" placeholder="请填写文章标题"></Input>
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
        </div>
        <Alert type="warning">
          如果选择的 <b>文章分类</b> 下的 <b>零散文章</b> 的数量不足 15篇,不会给该标题 随机生成文章。 也就不会出现在 站群的节点中。
        </Alert>
        <div slot="footer">
          <Button type="success" size="large" :loading="modal_loading" @click="save">保存</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';
  export default {
    data() {
      const checkarticetype = (rule, value, callback) => {
        if (value === 0) {
          callback(new Error('请选择所属文章分类'));
        } else {
          callback();
        }
      };
      return {
        modal: false,
        modal_loading: false,
        SaveRule: {
          title: [
            {required: true, message: '请填写问题名', trigger: 'blur'},
          ],
          articletype_id: [
            {validator: checkarticetype, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      changeArticletype(type) {
        this.form.articletype_name = type.label;
      },
      save() {
        this.$refs.titlesave.validate((valid) => {
          if (valid) {
            this.modal_loading = true;
            let data = this.form
            let id = data.id;
            this.apiPut('scatteredTitle/' + id, data).then((res) => {
              this.handelResponse(res, (data, msg) => {
                this.modal = false;
                this.$parent.getData();
                this.$Message.success(msg);
                this.modal_loading = false;
                this.$refs.titlesave.resetFields();
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
          title: '',
          articletype_id: 0,
          articletype_name: ''
        }
      },
      articletype: {
        default: []
      }
    },
    mixins: [http]
  }
</script>

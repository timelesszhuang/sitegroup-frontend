<template>
  <div>
    <div>
      <Modal
        v-model="modal" width="400">
        <p slot="header">
          <span>添加</span>
        </p>
        <div>
          <Form ref="wechatkadd" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
            <Form-item label="关键词名称" prop="name">
              <Input type="text" v-model="form.name" placeholder="请输入关键词名称"></Input>
            </Form-item>
            <Form-item label="关键词描述" prop="detail">
              <Input type="text" v-model="form.detail" placeholder="请输入关键词描述"></Input>
            </Form-item>
            <Form-item label="关键词分类" prop="type_name">
              <Select v-model="keyword_type" @on-change="changeType" style="width: 200px;" label-in-value filterable clearable >
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
      const checktype = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请选择分类'));
        } else {
          callback();
        }
      };
      return {
        modal: false,
        modal_loading: false,
        keyword_type:'',
        form: {
          name: "",
          detail:'',
        },
        AddRule: {
          name: [
            {required: true, message: '请输入关键词名称', trigger: 'blur'},
          ],
          detail:[
            {required:true,message:'请输入关键词描述',trigger:'blur'},
          ],
          type_name: [
            {required: true,validator: checktype, trigger: 'blur'}
          ]

        }
      }
    },
    methods: {
      changeType(label) {
        this.form.type_id=label.value;
        this.form.type_name=label.label;
      },
        add() {
          this.$refs.wechatkadd.validate((valid) => {
              if(valid){
                this.modal_loading = true;
                let data = this.form;
//                console.log(data)
                  this.apiPost('scrapy/addKeyword',data).then((res) => {
                  this.handelResponse(res, (data, msg) => {
                    this.modal = false;
                    this.$parent.getData();
                    this.$Message.success(msg);
                    this.modal_loading = false;
                    this.$refs.wechatkadd.resetFields();
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
      }
    },
    mixins: [http]
  }
</script>

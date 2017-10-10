<template>
  <div>
    <div>
      <Modal
        v-model="modal" width="600">
        <p slot="header">
          <span>修改</span>
        </p>
        <div>
          <Form ref="mediasave" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
            <Form-item label="媒体名称" prop="name">
              <Input type="text" v-model="form.name" placeholder="请输入媒体名称"></Input>
            </Form-item>
            <Form-item label="地区选择" prop="origin_id">
              <Select ref="select" :clearable="selects"   v-model="form.origin_id" style="position:relative;text-align: left;width:200px;"
                      label-in-value filterable　@on-change="changeOrigin">
                <Option v-for="item in origintype" :value="item.id" :label="item.text" :key="item">
                  {{ item.text }}
                </Option>
              </Select>
            </Form-item>
            <Form-item label="媒体名称分类" prop="media_type_id">
              <Select ref="select2"  :clearable="selects2" v-model="form.media_type_id" style="position:relative;text-align: left;width:200px;"
                      label-in-value filterable　@on-change="changeMediatype">
                <Option v-for="item in mediatype" :value="item.id" :label="item.text" :key="item">
                  {{ item.text }}
                </Option>
              </Select>
            </Form-item>
            <Form-item label="市场价" prop="market_price">
              <InputNumber  :min="1" v-model="form.market_price"></InputNumber>
            </Form-item>
            <Form-item label="代理价" prop="assitant_price">
              <InputNumber  :min="1" v-model="form.assitant_price"></InputNumber>
            </Form-item>
            <Form-item label="实际销售价" prop="sale_price">
              <InputNumber  :min="1" v-model="form.sale_price"></InputNumber>
            </Form-item>
            <Form-item label="备注" prop="summary">
              <Input v-model="form.summary" type="textarea" :rows="4" placeholder="请输入备注"></Input>
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
        selects:true,
        selects2:true,
        AddRule: {
          name: [
            {required: true, message: '请输入媒体分类', trigger: 'blur'},
          ],
        }
      }
    },
    methods: {
      changeOrigin(value) {
        this.form.origin = value.label
        this.form.origin_id = value.value
      },
      changeMediatype(value) {
        this.form.media_type_name = value.label
        this.form.media_type_id = value.value
      },
      add() {
        this.$refs.mediasave.validate((valid) => {
          if(valid){
            this.modal_loading = true;
            let data = this.form;
            let id = data.id;
            this.apiPut('sys/media/'+id,data).then((res) => {
              this.handelResponse(res, (data, msg) => {
                this.modal = false;

                this.$parent.getData();
                this.$Message.success(msg);
                this.modal_loading = false;
                this.$refs.mediasave.resetFields();
                this.$refs.select.clearSingleSelect()
                this.$refs.select2.clearSingleSelect()
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
      form:{
        default:{

        }
      },
      origintype: {

      },
      mediatype:{

      },

    },
    mixins: [http]
  }
</script>

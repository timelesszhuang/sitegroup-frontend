<template>
  <div>
    <div>
      <Modal
        v-model="modal" width="900">
        <p slot="header">
          <span>修改</span>
        </p>
        <div>
          <Form ref="advertorialsave" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
            <Form-item label="标题" prop="title">
              <Input type="text" v-model="form.title" placeholder="请输入标题"></Input>
            </Form-item>
            <Form-item label="地区选择" prop="origin_id">
              <Select ref="select" :clearable="selects"  v-model="form.origin_id" style="position:relative;text-align: left;width:200px;z-index: 10000"
                      label-in-value filterable　@on-change="changeOrigin">
                <Option v-for="item in origintype" :value="item.id" :label="item.text" :key="item" >
                  {{ item.text }}
                </Option>
              </Select>
            </Form-item>
            <Form-item label="选择媒体" prop="media_id">
              <Select ref="select2"    v-model="form.media_id" style="position:relative;text-align: left;width:300px;z-index: 10000"
                      label-in-value filterable　@on-change="changeMediatype">
                <Option v-for="item in media" :value="item.id" :label="item.text" :key="item">
                  {{ item.text }}
                </Option>
              </Select>
            </Form-item>
            <Form-item label="备注" prop="summary">
              <Input v-model="form.summary" type="textarea" :rows="4" placeholder="请输入备注"></Input>
            </Form-item>
            <Form-item label="内容" prop="content" style="height:100%;">
              <editor @change="updateData" :content="form.content"  :height="300" :auto-height="false"></editor>
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
        media:[],
        selects:true,
        AddRule: {
          name: [
            {required: true, message: '请输入媒体分类', trigger: 'blur'},
          ],
        }
      }
    },
    methods: {
      updateData(data) {
        this.form.content = data
      },
      changeMediatype(value) {
        this.form.media_name = value.label
        this.form.media_id = value.value
      },
      changeOrigin(value) {
        if(!value.label){
          return
        }
        this.form.origin = value.label
        this.form.origin_id = value.value
        let id = value.value
        this.apiGet('sys/softGetMediaType/' + id).then((res) => {
          this.handelResponse(res, (data, msg) => {
            this.media = data
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (res) => {
          //处理错误信息
          this.$Message.error('网络异常，请稍后重试。');
        })
      },
      add() {
        this.$refs.advertorialsave.validate((valid) => {
          if(valid){
            this.modal_loading = true;
            let data = this.form;
            let id = data.id;
            this.apiPut('sys/softText/'+id,data).then((res) => {
              this.handelResponse(res, (data, msg) => {
                this.modal = false;
                this.$parent.getData();
                this.$Message.success(msg);
                this.modal_loading = false;
                this.$refs.advertorialsave.resetFields();
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

      },
      origintype:{

      }
    },
    mixins: [http],

  }
</script>

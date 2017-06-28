<template>
  <Modal v-model="modal1" title="修改模板" @on-ok="ok" style="width:400px;">
    <Input ref="con" v-model="editContent" type="textarea" :rows="7" ></Input>
  </Modal>

</template>

<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';
  export default {
      data() {
          return {
              modal1:false,
          }
      },
      computed: {
          editContent() {
            return this.content
          }
      },
      methods: {
        ok() {
          this.apiPost('templateSave/'+this.site_id+'/'+this.filename,{content:this.$refs.con.$refs.textarea.value}).then((res) => {
            this.handelResponse(res, (data, msg) => {
              this.$Message.success(msg);
              this.modal1=false
            }, (data, msg) => {
              this.$Message.error('没有获取到');
            })
          }, (res) => {
            //处理错误信息
            this.$Message.error('网络异常，请稍后重试。');
          });
        }
      },
      props: {
        content: {
          default: {
            type: String
          }
        },
        filename:{
            default:{
                type:String
            }
        },
        site_id:{
            default:{
                type:String
            }
        }
      },
    mixins: [http]
  }
</script>

<template>
  <Modal v-model="modal1" title="修改模板" @on-ok="ok" style="width:400px;">
    <Input v-model="content" type="textarea" :rows="7" ></Input>
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
      methods: {
        ok() {
          this.apiPost('templateSave/'+this.site_id+'/'+this.filename,{content:this.content}).then((res) => {
            this.handelResponse(res, (data, msg) => {
              this.$Message.success(msg);
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
<style>


</style>

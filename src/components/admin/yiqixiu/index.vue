<template>
    <div style="height:100%">
      <iframe :src="iframe" frameborder="0" width="100%" height="100%"></iframe>
    </div>
</template>

<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';

  export default{
      data(){
        return {
          iframe:''
        }
      },
    created() {
        this.index()
    },
      methods:{
          index() {
            this.apiGet('yiqixiu/').then((res) => {
              this.handelResponse(res, (data, msg) => {
                this.iframe=data
              }, (data, msg) => {
                this.$Message.error(msg);
              })
            }, (res) => {
              //处理错误信息
              this.$Message.error('网络异常，请稍后重试。');
            })
          }
       },
    mixins: [http]
    }
</script>

<template>
  <div class="accept-container" style="height:100%" v-loading.fullscreen.lock="fullscreenLoading">
    <iframe :src="iframe" v-show="iframeState" id="show-iframe" width="100%" frameborder=0
    name="showHere"
    scrolling=auto>
    </iframe>
  </div>
</template>

<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';

  export default {
    data() {
      return {
        fullscreenLoading:true,
        iframeState: false,
        iframe: '',
      }
    },
    created() {
      this.index()
    },
    mounted() {
      const oIframe = document.getElementById('show-iframe');
      const deviceHeight = document.documentElement.clientHeight;
      oIframe.style.height = deviceHeight - 167 + 'px';
    },
    methods: {
      index() {
        this.apiGet('yiqixiu/').then((res) => {
          this.handelResponse(res, (data, msg) => {
            this.iframeState=true
            this.iframe = data
            this.fullscreenLoading=false;
          }, (data, msg) => {
            this.$Message.error(msg);
            this.fullscreenLoading=false;
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

<template>

  <div class="accept-container" style="height:auto">
    <iframe :src="iframe" v-show="iframeState" id="show-iframe" width="100%" frameborder=0     name="showHere"
            scrolling=auto></iframe>
  </div>
</template>

<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';

  export default {
    data() {
      return {
        iframeState: true,
        iframe: ''
      }
    },
    created() {
      this.index()
    },
    mounted() {
      const oIframe = document.getElementById('show-iframe');
      //const deviceWidth = document.documentElement.clientWidth;
      const deviceHeight = document.documentElement.clientHeight;
      //oIframe.style.width = deviceWidth + 'px';
      oIframe.style.height = deviceHeight + 'px';
    },

    methods: {
      index() {
        this.apiGet('yiqixiu/').then((res) => {
          this.handelResponse(res, (data, msg) => {
            this.iframe = data
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

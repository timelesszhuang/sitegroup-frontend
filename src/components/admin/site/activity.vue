<template>
  <Modal v-model="modal2" width="460">
    <p slot="header" style="color:dodgerblue;text-align:center;font-size: 18px;">
      <Icon type="flag"></Icon>
      <span>活动主题列表</span>
    </p>
    <div style="text-align:center">

    </div>
    <div slot="footer">
    </div>
  </Modal>
</template>

<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';
  export default{
      data() {
          return {
            modal2: false,
            modal_loading: false,
          }
      },
    methods: {
      sendTemp(index){
        alert(index)
      }
    },
    props: {
      sid: Number,
      datas: {
        default: {}
      }
    },
    mixins: [http]
  }
</script>
<style>


</style>

<template>
  <div>
    <Modal
      v-model="modal" width="300">
      <p slot="header">
        <span>预览</span>
      </p>
      <div style="text-align:left;margin:0 auto;line-height:30px" v-for="(item,index) in this.form">
     <div style="font-size: 15px"> <a :href=item.url :title=item.site_name target="_blank">{{item.site_name}}预览 <Icon type="forward"></Icon></a></div>
      </div>
      <div slot="footer">
        <Button type="success" size="large" :loading="modal_loading" @click="close">关闭</Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';
  export default {
    data() {
      return {
        modal: false,
        modal_loading: false,
      }
    },
    methods: {
      close() {
        this.modal = false;
      }
    },
    mixins: [http],
    props: {
      form: {

      }
    }
  }

</script>
<style>


</style>

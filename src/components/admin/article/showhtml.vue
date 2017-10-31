<template>
  <div>
    <Modal
      v-model="modal" width="600">
      <p slot="header">
        <span>预览</span>
      </p>
      <div style="width:500px;text-align:center;margin: 0 auto" v-for="(item,index) in this.form">
     <div style="font-size: 15px"> <a :href=item.url :title=item.site_name target="_blank">{{item.site_name}}预览</a></div>
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

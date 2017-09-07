<template>
  <Modal v-model="modal" width="360">
    <p slot="header" style="color:#f60;text-align:center">

    </p>
    <div style="text-align:center">
      <!---->
      <Alert type="success"><Icon type="heart"></Icon>正在发布中,请期待</Alert>
    </div>
    <div slot="footer">
    </div>
  </Modal>
</template>
<script>
  export default {
    data () {
      return {
        modal: false,
        modal_loading: false
      }
    },
    methods: {
    }
  }
</script>

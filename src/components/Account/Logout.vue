<template>
  <Modal v-model="modal" width="360">
    <p slot="header" style="color:#f60;text-align:center">
      <Icon type="log-out"></Icon>
      <span>退出确认</span>
    </p>
    <div style="text-align:center">
      <p>确认退出系统？</p>
      <p>退出系统后将取消自动登录。</p>
    </div>
    <div slot="footer">
      <Button type="error" size="large" long :loading="modal_loading" @click="logout">退出</Button>
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
      logout () {
        this.modal_loading = true;
        setTimeout(() => {
          Lockr.flush();
          Cookies.remove('rememberMe');
          Cookies.remove('code');
          this.modal_loading = false;
          this.modal = false;
          router.replace('/');

          this.$Message.success('登出成功');
        }, 1000);
      }
    }
  }
</script>

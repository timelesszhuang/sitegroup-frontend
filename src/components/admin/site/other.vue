<template>
  <Modal v-model="modal2" width="460">
    <p slot="header" style="color:dodgerblue;text-align:center;font-size: 18px;">
      <Icon type="flag"></Icon>
      <span>其他操作</span>
    </p>
    <div style="text-align:center">
      <Button type="primary"  @click="changeStatus(10)" v-if="otherArr.main_site==20">取消主站</Button>
      <Button type="error"  @click="changeStatus(20)" v-else="otherArr.main_site==10">设为主站</Button>
      <Button type="info" @click="changeCdn">cdn信息</Button>
      <Button type="warning" @click="ftpInfo">FTP信息</Button>
      <Button type="error"@click="sendActivity">发送主题模板</Button>
    </div>
    <div slot="footer">
    </div>
  </Modal>
</template>

<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';
  export default {
    data() {
      return {
        modal2: false,
        modal_loading: false,
      }
    },
    methods: {
      changeCdn() {
        let id = this.otherArr;
        this.$parent.changeCdn(id)
      },
      ftpInfo() {
        let id = this.otherArr;
        this.$parent.ftpInfo(id)
      },
      sendActivity() {
        let id = this.otherArr;
        let site_id = id.id
        this.$parent.sendActivity(site_id)
      },
      changeStatus(main_site){
        let id = this.otherArr;
        this.$parent.changeStatus(id,main_site)
      }
    },
    props: {
      otherArr: {}
    },
    mixins: [http]
  }

</script>
<style>


</style>

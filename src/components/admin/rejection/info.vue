<template>
  <Modal v-model="modal" width="460">
    <p slot="header" style="color:dodgerblue;text-align:center;font-size: 18px;">
      <Icon type="flag"></Icon>
      <span>甩单信息</span>
    </p>
    <div class="content">
      <div class="column">姓名:<span class="column_content">{{data_name}}</span></div>
      <div class="column">公司:<span class="column_content">{{data_company}}</span></div>
      <div class="column">电话:<span class="column_content">{{data_phone}}</span></div>
      <div class="column">邮箱:<span class="column_content">{{data_email}}</span></div>
    </div>
    <div slot="footer">
    </div>
  </Modal>

</template>

<script type="text/ecmascript-6">
  export default {
      data() {
          return {
              modal:false
          }
      },
    props:{
      data_company:String,
      data_name:String,
      data_phone:Number,
      data_email:String
    }
  }

</script>
<style scoped>
  .content{
     display:flex;
     flex-direction:column;
     padding-left:50px;
  }
  .content .column{
    padding:10px 0;
    box-sizing:border-box;
  }
  .content .column .column_content{
    padding-left:10px;
  }
</style>

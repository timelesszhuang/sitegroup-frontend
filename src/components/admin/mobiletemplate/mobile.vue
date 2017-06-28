<template>
<div>
  站点选择:
  <Select v-model="site_type_id" style="width:200px" label-in-value filterable clearable>
    <Option v-for="item in sitetype" :value="item.id" :label="item.text" :key="item">{{ item.text }}</Option>
  </Select>
</div>

</template>

<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';
    export default {
        data() {
            return {
              siteType:[],
              site_type_id:''
            }
        },
        created() {
           this.getSiteType()
        },
        methods: {
          getSiteType() {
            this.apiGet('sitetype/getSiteType').then((res) => {
              this.handelResponse(res, (data, msg) => {
                this.siteType = data
                console.log(this.siteType)

              }, (data, msg) => {
                this.$Message.error('没有获取到');
              })
            }, (res) => {
              //处理错误信息
              this.$Message.error('网络异常，请稍后重试。');
            });
          }
        },
      mixins: [http]
    }

</script>
<style>


</style>

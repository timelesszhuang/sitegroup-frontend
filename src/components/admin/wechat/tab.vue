<template>
  <Tabs value="wechatarticle"  @on-click="getdata">
    <Tab-pane label="公众号文章" name="wechatarticle">
      <wechatarticle ref="wechatart"></wechatarticle>
    </Tab-pane>
    <Tab-pane label="公众号关键词" name="wechatkeyword">
      <wechatkeyword ref="wechatkey"></wechatkeyword>
    </Tab-pane>
  </Tabs>
</template>
<script>
  import http from '../../../assets/js/http.js'
  import wechatarticle from '../wechatarticle/index.vue'
  import wechatkeyword   from '../wechatkeyword/index.vue'
  export default {

    components: {wechatarticle, wechatkeyword},
    methods: {
      getdata(name) {
        if (name == "wechatarticle") {
          this.$refs.wechatart.getData()
        } else if (name == "wechatkeyword") {
          this.$refs.wechatkey.getData()
        }
      }
    },
    mixins: [http]
  }
</script>

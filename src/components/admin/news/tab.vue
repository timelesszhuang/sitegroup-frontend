<template>
  <Tabs value="newsarticle" @on-click="getdata">
    <Tab-pane label="163新闻" name="newsarticle">
      <Newsarticle></Newsarticle>
    </Tab-pane>
    <Tab-pane label="搜狐新闻" name="sohunew">
      <Sohu ref="sohunews"></Sohu>
    </Tab-pane>
    <Tab-pane label="腾讯新闻" name="qqarticle">
      <Qqarticle ref="qqwenzhang"></Qqarticle>
    </Tab-pane>
    <Tab-pane label="热点新闻" name="hotnews">
      <Hotnews ref="newswenzhang"></Hotnews>
    </Tab-pane>

  </Tabs>
</template>
<script>
  import http from '../../../assets/js/http.js'
  import Qqarticle from '../qqarticle/index.vue'
  import Newsarticle from '../163article/index.vue'
  import Hotnews from '../hotnews/hotnews.vue'
  import Sohu from '../sohuarticle/index.vue'

  export default {
    components: {Newsarticle, Qqarticle, Hotnews,Sohu},
    methods: {
      getdata(name) {
        if (name == "qqarticle") {
          this.$refs.qqwenzhang.getData()
        } else if (name == "hotnews") {
          this.$refs.newswenzhang.getData()
        }else if (name == "sohunew") {
          this.$refs.sohunews.getData()
        }
      }
    },
    mixins: [http]
  }
</script>


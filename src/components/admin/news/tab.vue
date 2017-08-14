<template>
  <Tabs value="newsarticle">
    <Tab-pane label="163新闻" name="newsarticle">
      <Newsarticle></Newsarticle>
    </Tab-pane>
    <Tab-pane label="腾讯新闻" name="qqarticle">
      <Qqarticle></Qqarticle>
    </Tab-pane>
    <Tab-pane label="热点新闻" name="hotnews">
      <Hotnews></Hotnews>
    </Tab-pane>
  </Tabs>
</template>
<script>
  import http from '../../../assets/js/http.js'
  import Qqarticle from '../qqarticle/index.vue'
  import Newsarticle   from '../163article/index.vue'
  import Hotnews   from '../hotnews/hotnews.vue'
  export default {
    components: {Newsarticle, Qqarticle,Hotnews},
    mixins: [http]
  }
</script>

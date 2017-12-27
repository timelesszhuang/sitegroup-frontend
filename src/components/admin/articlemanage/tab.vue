<template>
  <Tabs value="article"  @on-click="getdata">
    <Tab-pane label="文章" name="article">
      <artic ref="articl"> </artic>
    </Tab-pane>
    <Tab-pane label="文章分类" name="articletype">
      <articletype ref="articlet"></articletype>
    </Tab-pane>
    <Tab-pane label="标签管理" name="tag">
      <tag ref="tagname"></tag>
    </Tab-pane>
  </Tabs>
</template>
<script>
  import http from '../../../assets/js/http.js'
  import artic from '../article/index.vue'
  import articletype   from '../articletype/index.vue'
  import tag  from '../tag/index.vue'
  export default {
    components: {artic, articletype,tag},
    methods: {
      getdata(name) {
        if (name == "article") {
          this.$refs.articl.getData()
          this.$refs.articl.getArticleType(((data) => {
            this.$refs.articl.setArticleType(data)
          }))
        } else if (name == "articletype") {
          this.$refs.articlet.getData()
        }else if (name == "tag") {
          this.$refs.tagname.getData()
        }
      }
    },
    mixins: [http]
  }
</script>

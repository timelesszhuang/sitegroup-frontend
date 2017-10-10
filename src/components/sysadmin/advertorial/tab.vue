<template>
  <Tabs value="advertorial" @on-click="getdata">
    <Tab-pane label="软文" name="advertorial">
      <Advertorialmanage ref="advertorialmanage"></Advertorialmanage>
    </Tab-pane>
    <Tab-pane label="媒体" name="media">
      <Media ref="media"></Media>
    </Tab-pane>
    <Tab-pane label="媒体分类" name="mediat">
      <Mediatype ref="mediatype"></Mediatype>
    </Tab-pane>
  </Tabs>
</template>
<script>
  import http from '../../../assets/js/http.js'
  import Advertorialmanage from '../advertorialmanage/index.vue'
  import Mediatype from '../mediatype/index.vue'
  import Media from '../media/index.vue'
  export default {
    components: {Advertorialmanage, Mediatype,Media},
    methods: {
      getdata(name) {
        if (name == "advertorial") {
          this.$refs.advertorialmanage.getData()
        } else if (name == "mediat") {
          this.$refs.mediatype.getData()
        }else if (name == "media") {
          this.$refs.media.getData()
        }
      }
    },
    mixins: [http]
  }
</script>

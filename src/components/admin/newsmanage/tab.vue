<template>
  <Tabs value="scatteredarticle"  @on-click="getdata">
    <Tab-pane label="零散文章" name="scatteredarticle">
      <scatteredarticle ref="sca"></scatteredarticle>
    </Tab-pane>
    <Tab-pane label="零散文章分类" name="scatteredtype">
      <scatteredtype ref="scatype"></scatteredtype>
    </Tab-pane>
  </Tabs>
</template>
<script>
  import http from '../../../assets/js/http.js'
  import scatteredarticle from '../scatteredarticle/scatteredarticle.vue'
  import scatteredtype   from '../scatteredtype/scatteredtype.vue'
  export default {

    components: {scatteredarticle, scatteredtype},
    methods: {
      getdata(name) {
        if (name == "scatteredarticle") {
          this.$refs.sca.getData()
        } else if (name == "scatteredtype") {
          this.$refs.scatype.getData()
        }
      }
    },
    mixins: [http]
  }
</script>

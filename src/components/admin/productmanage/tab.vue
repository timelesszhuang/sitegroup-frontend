<template>
  <Tabs value="product"  @on-click="getdata">
    <Tab-pane label="产品" name="product">
      <product ref="chanpin"></product>
    </Tab-pane>
    <Tab-pane label="产品分类" name="producttype">
      <producttype ref="chanpintype"></producttype>
    </Tab-pane>
  </Tabs>
</template>
<script>
  import http from '../../../assets/js/http.js'
  import product from '../product/index.vue'
  import producttype   from '../producttype/index.vue'
  export default {

    components: {product, producttype},
    methods: {
      getdata(name) {
        if (name == "product") {
          this.$refs.chanpin.getData()
        } else if (name == "producttype") {
          this.$refs.chanpintype.getData()
        }
      }
    },
    mixins: [http]
  }
</script>

<template>
  <Tabs value="navigation"  @on-click="getdata">
    <Tab-pane label="栏目管理" name="navigation">
      <navigation ref="men"></navigation>
    </Tab-pane>
    <Tab-pane label="栏目分类管理" name="Menutype">
      <Menutype ref="menutype"></Menutype>
    </Tab-pane>
  </Tabs>
</template>
<script>
  import http from '../../../assets/js/http.js'
  import navigation from '../navigation/index.vue'
  import Menutype   from '../menutype/index.vue'
  export default {
    components: {navigation, Menutype},
    methods: {
      getdata(name) {
        if (name == "navigation") {
          this.$refs.men.getData()
        } else if (name == "Menutype") {
          this.$refs.menutype.getData()
        }
      }
    },
    mixins: [http]
  }
</script>

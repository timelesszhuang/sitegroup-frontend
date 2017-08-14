<template>
  <Tabs value="navigation">
    <Tab-pane label="栏目管理" name="navigation">
      <navigation></navigation>
    </Tab-pane>
    <Tab-pane label="栏目分类管理" name="Menutype">
      <Menutype></Menutype>
    </Tab-pane>
  </Tabs>
</template>
<script>
  import http from '../../../assets/js/http.js'
  import navigation from '../navigation/index.vue'
  import Menutype   from '../menutype/index.vue'
  export default {
    components: {navigation, Menutype},
    mixins: [http]
  }
</script>

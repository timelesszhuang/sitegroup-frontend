<template>
  <Tabs value="menu" @on-click="getdata">
    <Tab-pane label="栏目管理" name="menu">
      <naviga ref="menu"></naviga>
    </Tab-pane>
    <Tab-pane label="栏目分类管理" name="Menutype">
      <Menutype ref="menutype"></Menutype>
    </Tab-pane>
  </Tabs>
</template>
<script>
  import http from '../../../assets/js/http.js'
  import Menutype from '../menutype/index.vue'
  import naviga from '../menu/index.vue'

  export default {
    components: { Menutype,naviga},
    methods: {
      getdata(name) {
       if (name == "Menutype") {
          this.$refs.menutype.getData()
        } else if (name == 'menu') {
          this.$refs.menu.getmenutype()
          this.$refs.menu.getData()
        }
      }
    },
    mixins: [http]
  }
</script>

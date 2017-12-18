<template>
  <Tabs value="menu" @on-click="getdata">
    <Tab-pane label="栏目管理" name="menu">
      <Menu ref="menu"></Menu>
    </Tab-pane>
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
  import Menutype from '../menutype/index.vue'
  import Menu from '../menu/index.vue'

  export default {
    components: {navigation, Menutype,Menu},
    methods: {
      getdata(name) {
        if (name == "navigation") {
          this.$refs.men.getData()
          this.$refs.men.getmenutype()
        } else if (name == "Menutype") {
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

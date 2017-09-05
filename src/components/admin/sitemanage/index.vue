<template>
    <div>
      <Tabs value="site" @on-click="tabClick">
        <TabPane label="站点列表" name="site">
          <site ref="site"></site>
        </TabPane>
        <TabPane label="站点分类" name="sitetype">
          <sitetype ref="sitetype"></sitetype>
        </TabPane>
      </Tabs>
    </div>
</template>

<script type="text/ecmascript-6">
  import site from '../site/site.vue';
  import sitetype from '../sitetype/sitetype.vue'
  export default{
    data(){
      return {}
    },
    methods:{
      tabClick(name){
        this.$refs[name].init();
      }
    },
    components:{
      site,sitetype
    }
  }
</script>

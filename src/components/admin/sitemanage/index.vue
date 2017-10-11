<template>
    <div>
      <Tabs value="site" @on-click="tabClick">
        <TabPane label="站点列表" name="site">
          <site ref="site"></site>
        </TabPane>
        <TabPane label="站点分类" name="sitetype">
          <sitetype ref="sitetype"></sitetype>
        </TabPane>
        <TabPane label="模板管理" name="templatemanage">
          <templatemanage ref="templatemanage"></templatemanage>
        </TabPane>
        <TabPane label="搜索引擎优化管理" name="seo">
          <seo ref="seo"></seo>
        </TabPane>
        <TabPane label="站点静态化配置" name="staticconfig">
          <staticconfig ref="staticconfig"></staticconfig>
        </TabPane>
      </Tabs>
    </div>
</template>

<script type="text/ecmascript-6">
  import site from '../site/site.vue';
  import sitetype from '../sitetype/sitetype.vue'
  import templatemanage from '../templatemanage/index.vue'
  import seo from '../tdk/index.vue'
  import staticconfig from '../staticconfig/index.vue'
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
      site,sitetype,templatemanage,seo,staticconfig
    }
  }
</script>

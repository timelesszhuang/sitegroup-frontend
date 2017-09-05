<template>
    <div>
      <Tabs value="other" @on-click="tabClick">
        <TabPane label="其他统计" name="other">
          <other ref="other"></other>
        </TabPane>
        <TabPane label="浏览量统计" name="pv">
          <pv ref="pv"></pv>
        </TabPane>
        <TabPane label="浏览量展示" name="show">
          <show ref="show"></show>
        </TabPane>
        <TabPane label="爬虫统计" name="crawler">
          <crawler ref="crawler"></crawler>
        </TabPane>
        <TabPane label="搜索引擎关键词统计" name="countkeyword">
          <countkeyword ref="countkeyword"></countkeyword>
        </TabPane>
      </Tabs>
    </div>
</template>

<script type="text/ecmascript-6">
  import pv from '../pv/pv.vue'
  import show from '../show/index.vue'
  import crawler from '../crawler/crawler.vue'
  import countkeyword from '../countkeyword/index.vue'
  import other from '../other/index.vue'
//  import
  export default{
    data(){
      return {

      }
    },
    methods: {
      tabClick(name) {
        if(name!=="other"){
          this.$refs[name].init();
        }
      }
    },
    components:{
      pv,show,crawler,countkeyword,other
    }
  }

</script>

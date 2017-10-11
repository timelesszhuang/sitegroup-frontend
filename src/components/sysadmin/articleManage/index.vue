<template>
  <div>
    <Tabs value="type" @on-click="tabClick">
      <TabPane label="微信公众号关键词分类" name="type">
        <WechatKeywordType ref="type"></WechatKeywordType>
      </TabPane>
      <TabPane label="微信企业号关键词" name="keyword">
        <Syskeyword ref="keyword"></Syskeyword>
      </TabPane>
      <TabPane label="微信企业号文章" name="article">
        <Weixinarticle ref="article"></Weixinarticle>
      </TabPane>
    </Tabs>
  </div>
</template>

<script type="text/ecmascript-6">
  import WechatKeywordType from '../wechatkeywordtype/index.vue'
  import Syskeyword from '../wechatkeyword/index.vue'
  import Weixinarticle from '../wechatarticle/index.vue'
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
      WechatKeywordType,Syskeyword,Weixinarticle
    }
  }
</script>

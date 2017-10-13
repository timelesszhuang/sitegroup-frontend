<template>
    <div>
      <Tabs value="links" @on-click="tabClick">
        <TabPane label="站点模板管理" name="templates">
          <templates ref="templates"></templates>
        </TabPane>
        <TabPane label="自定义表单" name="customer">
          <customer ref="customer"></customer>
        </TabPane>
        <TabPane label="友情链接管理" name="links">
          <links ref="links"></links>
        </TabPane>
        <TabPane label="域名管理" name="domain">
          <domain ref="domain"></domain>
        </TabPane>
        <TabPane label="公共代码管理" name="codes">
          <codes ref="codes"></codes>
        </TabPane>
        <TabPane label="联系方式管理" name="contactway">
          <contactway ref="contactway"></contactway>
        </TabPane>
      </Tabs>
    </div>
</template>

<script type="text/ecmascript-6">
  import links from '../link/index.vue'
  import domain from '../domain/index.vue'
  import codes from '../code/index.vue'
  import contactway from '../contactway/contactway.vue'
  import templates from '../template/template.vue'
  import customer from '../customeform/index.vue'
  export default {
    data() {
      return {

      }
    },
    components:{
      links,domain,codes,contactway,templates,customer
    },
    methods: {
      tabClick(name) {
         this.$refs[name].init();
      }
    }
  }
</script>

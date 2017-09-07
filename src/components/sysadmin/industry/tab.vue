<template>
  <Tabs value="company" @on-click="getdata">
    <Tab-pane label="公司" name="company">
      <Company ref="gongsi"></Company>
    </Tab-pane>
    <Tab-pane label="行业" name="industry">
      <Industry ref="hangye"></Industry>
    </Tab-pane>
  </Tabs>
</template>
<script>
  import http from '../../../assets/js/http.js'
  import Industry from './industry.vue'
  import Company from '../company/company.vue'
  export default {
    components: {Industry, Company},
    methods: {
      getdata(name) {
        if (name == "company") {
          this.$refs.gongsi.getData()
        } else if (name == "industry") {
          this.$refs.hangye.getData()
        }
      }
    },
    mixins: [http]
  }
</script>

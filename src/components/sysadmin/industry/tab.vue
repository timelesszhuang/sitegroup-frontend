<template>
  <Tabs value="company">
    <Tab-pane label="公司" name="company">
      <Company></Company>
    </Tab-pane>
    <Tab-pane label="行业" name="industry">
      <Industry></Industry>
    </Tab-pane>
  </Tabs>
</template>
<script>
  import http from '../../../assets/js/http.js'
  import Industry from './industry.vue'
  import Company from '../company/company.vue'
  export default {
    components: {Industry, Company},
    mixins: [http]
  }
</script>

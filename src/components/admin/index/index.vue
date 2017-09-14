<template>
  <div>
    <Row>
      <Col span="6">
        <logininfo>
        </logininfo>
      </Col>
    </Row>
    <div>
      <sitetype ref="sitetype" style="display: inline-block"></sitetype>
      <engine ref="engine" style="display: inline-block"></engine>
      <pv ref="pv" style="display: inline-block"></pv>
    </div>
  </div>
</template>
<script type="text/babel">
  import sitetype from './sitecount.vue';
  import engine from './enginecount.vue';
  import pv from './pv.vue';
  import logininfo from './logininfo.vue'

  export default {
    name: 'view',
    components: {
      sitetype,
      engine,
      pv,
      logininfo
    },
  };
</script>
<style scoped>

</style>

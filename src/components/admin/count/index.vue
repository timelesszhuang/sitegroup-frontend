<template>
  <div class="echarts" style="min-width:900px">
    <Row>
      <Col span="8"><sitetype ref="sitetype"></sitetype></Col>
      <Col span="8"> <engine ref="engine"></engine></Col>
      <Col span="8"> <pv ref="pv"></pv></Col>
    </Row>
  </div>
</template>
<script type="text/babel">
  import sitetype from './sitecount.vue';
  import engine from './enginecount.vue';
  import pv from './pv.vue';

  export default {
    name: 'view',
    components: {
      sitetype,
      engine,
      pv
    },
  };
</script>
<style>


</style>

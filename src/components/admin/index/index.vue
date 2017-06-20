<template>
  <div class="echarts" style="display: flex;justify-content:center">
    <sitetype ref="sitetype"></sitetype>
     <engine ref="engine"></engine>
    <pv ref="pv"></pv>
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

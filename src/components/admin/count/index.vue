<template>
  <div class="echarts">
    <Row>
      <Col span="8"><sitetype ref="sitetype"></sitetype></Col>
      <Col span="8"> <engine ref="engine"></engine></Col>
      <Col span="8"> <pv ref="pv"></pv></Col>
    </Row>
    <Row>
      <Col span="8"><keyword ref="keyword"></keyword></Col>
      <Col span="8"> <articletype ref="articletype"></articletype></Col>
      <Col span="8"> <questiontype ref="questiontype"></questiontype></Col>
    </Row>
  </div>
</template>
<script type="text/babel">
  import articletype from './count.vue';
  import sitetype from './sitecount.vue';
  import questiontype from './questioncount.vue';
  import keyword from './keyword.vue';
  import engine from './enginecount.vue';
  import pv from './pv.vue';

  export default {
    name: 'view',
    components: {
      articletype,
      sitetype,
      questiontype,
      keyword,
      engine,
      pv

    },

  };
</script>

<template>
  <div class="echarts"style="overflow: auto;height: 450px;width: auto">
    <Row>
      <keyword ref="keyword"></keyword>
      <articletype ref="articletype"></articletype>
      <questiontype ref="questiontype"></questiontype>
      <scarrered ref="scarrered"></scarrered>
    </Row>
  </div>
</template>
<script type="text/babel">
  import articletype from './count.vue';
  import questiontype from './questioncount.vue';
  import keyword from './keyword.vue';
  import scarrered from './scattered.vue';

  export default {
    name: 'view',
    components: {
      articletype,
      questiontype,
      keyword,
      scarrered
    },
  };
</script>

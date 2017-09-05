<template>
  <div class="echarts"style="overflow: scroll;height:480px;width: auto">
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
    methods:{
      init(){
        this.$refs.keyword.init();
        this.$refs.articletype.init();
        this.$refs.questiontype.init();
        this.$refs.scarrered.init();
      }
    }
  };
</script>

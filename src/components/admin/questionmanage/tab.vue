<template>
  <Tabs value="question"  @on-click="getdata">
    <Tab-pane label="问答" name="question">
      <question ref="wenda"></question>
    </Tab-pane>
    <Tab-pane label="问答分类" name="questiontype">
      <questiontype ref="wendatype"></questiontype>
    </Tab-pane>
  </Tabs>
</template>
<script>
  import http from '../../../assets/js/http.js'
  import question from '../question/index.vue'
  import questiontype   from '../questiontype/questiontype.vue'
  export default {

    components: {question, questiontype},
    methods: {
      getdata(name) {
        if (name == "question") {
          this.$refs.wenda.getData()
        } else if (name == "questiontype") {
          this.$refs.wendatype.getData()
        }
      }
    },
    mixins: [http]
  }
</script>

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
  import common from '../../../assets/js/common';
  export default {
    components: {question, questiontype},
    methods: {
      getdata(name) {
        if (name == "question") {
          this.$refs.wenda.getData()
          this.$refs.wenda.getQuestionType(((data) => {
            this.$refs.wenda.setQuestionTypelist(data)
          }))
        } else if (name == "questiontype") {
          this.$refs.wendatype.getData()
        }
      }
    },
    mixins: [http,common]
  }
</script>

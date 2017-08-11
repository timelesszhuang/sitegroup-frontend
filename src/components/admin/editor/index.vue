<template>
  <div>
    <editor :content="content" :height="300"></editor>
    <!--<editor :content="content" :height="500" :z-index="1000" :auto-height="true" :show-module-name="false"></editor>-->
  </div>
</template>
<script>
  export default {
    name: 'view',
    components: {
    },
    props: {},
    data: () => ({
      content:'<h1>1111</h1>',
    }),
    created() {

    },
    methods: {


    },
  };
</script>



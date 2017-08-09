<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
  html, body {
    height: 100%;
  }
  #app {
    height: 100%;
  }

  .custom-icon {
    background-size: 100% 100%;
    display: inline-block;
  }
  .custom-icon.text {
    background-image: url(assets/custom-icons/text.png);
  }
  .custom-icon.font {
    background-image: url(assets/custom-icons/font.png);
  }
  .custom-icon.align {
    background-image: url(assets/custom-icons/align.png);
  }
  .custom-icon.list {
    background-image: url(assets/custom-icons/list.png);
  }
  .custom-icon.color {
    background-image: url(assets/custom-icons/color.gif);
  }
  .custom-icon.eraser {
    background-image: url(assets/custom-icons/eraser.gif);
  }
  .custom-icon.full-screen {
    background-image: url(assets/custom-icons/full-screen.gif);
  }
  .custom-icon.hr {
    background-image: url(assets/custom-icons/hr.gif);
  }
  .custom-icon.image {
    background-image: url(assets/custom-icons/image.gif);
  }
  .custom-icon.link {
    background-image: url(assets/custom-icons/link.gif);
  }
  .custom-icon.table {
    background-image: url(assets/custom-icons/table.gif);
  }
  .custom-icon.undo {
    background-image: url(assets/custom-icons/undo.gif);
  }
  .custom-icon.unlink {
    background-image: url(assets/custom-icons/unlink.gif);
  }
  .custom-icon.info {
    background-image: url(assets/custom-icons/info.png);
  }

</style>

<template>
  <div>
    <Modal
      v-model="modal"
      width="300">
      <p slot="header">
        <span>查看二维码</span>
      </p>
      <div>
        <Row type="flex" justify="center" class="code-row-bg">
          <qriously :value=path :size="200"/>
        </Row>

      </div>
      <div slot="footer">
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';
  export default {
    data() {
      return {
        modal: false,
        modal_loading: false,
      }
    },
    created(){
      console.log(this.path)
    },
    methods: {
      close() {
        this.modal = false;
      }
    },
    mixins: [http],
    props: {
      path:String
    }
  }
</script>

<template>
  <div>
    <div>
      <Modal
        v-model="modal" width="600">
        <p slot="header">
        </p>
        <div>
          <Input  v-model="form"  type="textarea" :rows="30" ></Input>
        </div>
        <div slot="footer">
        </div>
      </Modal>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';
  export default {
    data() {
      return {
        modal: false,
        modal_loading: false,
        AddRule: {

        }
      }
    },
    methods: {

    },
    props: {
      form: {
        default:String
      }
    },
    mixins: [http]
  }
</script>

<template>
  <div>
    <Modal
      v-model="modal" width="900">
      <p slot="header">
        <span>选择图片</span>
      </p>
      <div>
        <waterfall :line-gap="200" :watch="this.data">
          <!-- each component is wrapped by a waterfall slot -->
          <waterfall-slot
            v-for="(item, index) in this.data"
            :width="200"
            :height="200"
            :order="index"
            :key="item.id"
          >
            <!--
              your component
            -->
          </waterfall-slot>
        </waterfall>

 {{this.imgdata}}
      </div>
      <div slot="footer">
        <Button type="success" size="large" :loading="modal_loading" @click="close">关闭</Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';

  import Waterfall from 'vue-waterfall/lib/waterfall'
  import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
  export default {
    data() {
      return {
        modal: false,
        modal_loading: false,
      }
    },

    components: {Waterfall,
      WaterfallSlot

    },
    methods: {
      close() {
        this.modal = false;
      }
    },
    mixins: [http],
    props: {
      imgdata: {
        default: {

        }
      }
    }

  }

</script>


<template>
  <div>
    <Modal
      v-model="modal" width="900">
      <p slot="header">
        <span>选择图片</span>
      </p>
      <div>
        <waterfall
          :grow="grow"
          :watch=" this.data"
          ref="waterfall"
        >
          <!-- each component is wrapped by a waterfall slot -->
          <waterfall-slot
            v-for="(item, index) in this.data"
            :width="item.width"
            :height="item.height"
            :order="index"
            :key="item.index"
            move-class="item-move"
            class="imgdiv"
          >
            <img class="item"   :src="item.src" >
          </waterfall-slot>
        </waterfall>


        <!--{{this.imgdata}}-->
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
        grow: [3, 2, 1, 2],
        items: this.imgdata,
        modal: false,
        modal_loading: false,
        data: [
          {
            id:1,
            width: 100 + ~~(Math.random() * 50),
            height: 100 + ~~(Math.random() * 50),
            src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516845813&di=216cbd941ed087b7a543fe458992a8e2&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dacd800cbb91c8701c2bbbaa54f16f45a%2Fa08b87d6277f9e2f85a3a3271530e924b899f30f.jpg'
          },
          {
            id:1,
            width: 100 + ~~(Math.random() * 50),
            height: 100 + ~~(Math.random() * 50),
            src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516845813&di=216cbd941ed087b7a543fe458992a8e2&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dacd800cbb91c8701c2bbbaa54f16f45a%2Fa08b87d6277f9e2f85a3a3271530e924b899f30f.jpg'
          },
          {
            id:1,
            width: 100 + ~~(Math.random() * 50),
            height: 100 + ~~(Math.random() * 50),
            src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516845813&di=216cbd941ed087b7a543fe458992a8e2&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dacd800cbb91c8701c2bbbaa54f16f45a%2Fa08b87d6277f9e2f85a3a3271530e924b899f30f.jpg'
          }, {
            id:1,
            width: 100 + ~~(Math.random() * 50),
            height: 100 + ~~(Math.random() * 50),
            src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516845813&di=216cbd941ed087b7a543fe458992a8e2&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dacd800cbb91c8701c2bbbaa54f16f45a%2Fa08b87d6277f9e2f85a3a3271530e924b899f30f.jpg'
          }, {
            id:1,
            width: 100 + ~~(Math.random() * 50),
            height: 100 + ~~(Math.random() * 50),
            src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516845813&di=216cbd941ed087b7a543fe458992a8e2&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dacd800cbb91c8701c2bbbaa54f16f45a%2Fa08b87d6277f9e2f85a3a3271530e924b899f30f.jpg'
          }, {
            id:1,
            width: 100 + ~~(Math.random() * 50),
            height: 100 + ~~(Math.random() * 50),
            src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516845813&di=216cbd941ed087b7a543fe458992a8e2&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dacd800cbb91c8701c2bbbaa54f16f45a%2Fa08b87d6277f9e2f85a3a3271530e924b899f30f.jpg'
          }, {
            id:1,
            width: 100 + ~~(Math.random() * 50),
            height: 100 + ~~(Math.random() * 50),
            src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516845813&di=216cbd941ed087b7a543fe458992a8e2&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dacd800cbb91c8701c2bbbaa54f16f45a%2Fa08b87d6277f9e2f85a3a3271530e924b899f30f.jpg'
          },
          {
            id:1,
            width: 100 + ~~(Math.random() * 50),
            height: 100 + ~~(Math.random() * 50),
            src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516845813&di=216cbd941ed087b7a543fe458992a8e2&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dacd800cbb91c8701c2bbbaa54f16f45a%2Fa08b87d6277f9e2f85a3a3271530e924b899f30f.jpg'
          }, {
            id:1,
            width: 100 + ~~(Math.random() * 50),
            height: 100 + ~~(Math.random() * 50),
            src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516845813&di=216cbd941ed087b7a543fe458992a8e2&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dacd800cbb91c8701c2bbbaa54f16f45a%2Fa08b87d6277f9e2f85a3a3271530e924b899f30f.jpg'
          }, {
            id:1,
            width: 100 + ~~(Math.random() * 50),
            height: 100 + ~~(Math.random() * 50),
            src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516845813&di=216cbd941ed087b7a543fe458992a8e2&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dacd800cbb91c8701c2bbbaa54f16f45a%2Fa08b87d6277f9e2f85a3a3271530e924b899f30f.jpg'
          }, {
            id:1,
            width: 100 + ~~(Math.random() * 50),
            height: 100 + ~~(Math.random() * 50),
            src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516845813&di=216cbd941ed087b7a543fe458992a8e2&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dacd800cbb91c8701c2bbbaa54f16f45a%2Fa08b87d6277f9e2f85a3a3271530e924b899f30f.jpg'
          }, {
            id:1,
            width: 100 + ~~(Math.random() * 50),
            height: 100 + ~~(Math.random() * 50),
            src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516845813&di=216cbd941ed087b7a543fe458992a8e2&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dacd800cbb91c8701c2bbbaa54f16f45a%2Fa08b87d6277f9e2f85a3a3271530e924b899f30f.jpg'
          }, {
            id:1,
            width: 100 + ~~(Math.random() * 50),
            height: 100 + ~~(Math.random() * 50),
            src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516845813&di=216cbd941ed087b7a543fe458992a8e2&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dacd800cbb91c8701c2bbbaa54f16f45a%2Fa08b87d6277f9e2f85a3a3271530e924b899f30f.jpg'
          }, {
            id:1,
            width: 100 + ~~(Math.random() * 50),
            height: 100 + ~~(Math.random() * 50),
            src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516845813&di=216cbd941ed087b7a543fe458992a8e2&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dacd800cbb91c8701c2bbbaa54f16f45a%2Fa08b87d6277f9e2f85a3a3271530e924b899f30f.jpg'
          }, {
            id:1,
            width: 100 + ~~(Math.random() * 50),
            height: 100 + ~~(Math.random() * 50),
            src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516845813&di=216cbd941ed087b7a543fe458992a8e2&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dacd800cbb91c8701c2bbbaa54f16f45a%2Fa08b87d6277f9e2f85a3a3271530e924b899f30f.jpg'
          }, {
            id:1,
            width: 100 + ~~(Math.random() * 50),
            height: 100 + ~~(Math.random() * 50),
            src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516845813&di=216cbd941ed087b7a543fe458992a8e2&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dacd800cbb91c8701c2bbbaa54f16f45a%2Fa08b87d6277f9e2f85a3a3271530e924b899f30f.jpg'
          }, {
            id:1,
            width: 100 + ~~(Math.random() * 50),
            height: 100 + ~~(Math.random() * 50),
            src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516845813&di=216cbd941ed087b7a543fe458992a8e2&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dacd800cbb91c8701c2bbbaa54f16f45a%2Fa08b87d6277f9e2f85a3a3271530e924b899f30f.jpg'
          }, {
            id:1,
            width: 100 + ~~(Math.random() * 50),
            height: 100 + ~~(Math.random() * 50),
            src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516845813&di=216cbd941ed087b7a543fe458992a8e2&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dacd800cbb91c8701c2bbbaa54f16f45a%2Fa08b87d6277f9e2f85a3a3271530e924b899f30f.jpg'
          }, {
            id:1,
            width: 100 + ~~(Math.random() * 50),
            height: 100 + ~~(Math.random() * 50),
            src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516845813&di=216cbd941ed087b7a543fe458992a8e2&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dacd800cbb91c8701c2bbbaa54f16f45a%2Fa08b87d6277f9e2f85a3a3271530e924b899f30f.jpg'
          },

        ]
      }
    },

    components: {
      Waterfall,
      WaterfallSlot

    },
    methods: {
      close() {
        this.modal = false;
      },
    },
    mixins: [http],
    // props: {
    //   imgdata: {
    //     default: {
    //
    //     }
    //   }
    // }

  }


</script>
<style>

  .imgdiv img{
    width:auto;
    height:auto;
    max-width:100%;
    max-height:100%;
  }


</style>

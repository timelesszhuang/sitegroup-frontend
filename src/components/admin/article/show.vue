<template>
  <div>
    <Modal
      v-model="modal" width="900">
      <p slot="header">
        <span>预览文章</span>
      </p>
      <div>
        <Row style="">
          <Col span="24">
          <div style="width: 100%;margin: 0 auto;text-align: center;">
            <div><p style="font-size:20px">{{form.title}}</p></div>
          </div>
          </Col>
        </Row>
        <Row style="border-bottom:1px solid #e3e8ee;margin:20px;padding-bottom: 10px">
          <Col span="24">
          <div style="width: 60%;margin: 0 auto;text-align: center">
            <div>作者：{{form.auther}} | 来源：{{form.come_from}} | 分类：{{form.articletype_name}} | 阅读：{{form.readcount}}</div>
          </div>
          </Col>
        </Row>
        <Row>
          <Col span="24">
          <div v-html="form.content" class="img"> </div>
          </Col>
        </Row>
      </div>
      <div slot="footer">
        <Button type="success" size="large" :loading="modal_loading" @click="close">关闭</Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';
  export default {
    data() {
      return {
        editorOption: {},
        modal: false,
        modal_loading: false,
      }
    },
    methods: {
      close() {
        this.modal = false;
      }
    },
    mixins: [http],
    props: {
      form: {
        default: {
          title: "",
          auther: '',
          articletype_id: 0,
          articletype_name: '',
          content: ''
        }
      }
    }
  }

</script>
<style>
  .img img{
   max-width: 850px;
  }

</style>

<template>
  <Modal v-model="modal2" width="460">
    <p slot="header" style="color:dodgerblue;text-align:center;font-size: 18px;">
      <Icon type="flag"></Icon>
      <span>页面静态化</span>
    </p>
    <div style="text-align:center">
      <Button type="info" @click="aKeyGeneration">一键生成</Button>
      <Button type="warning" @click="generatArticle">文章更新</Button>
      <Button type="error" @click="generatMenu">栏目更新</Button>
      <Button type="success" @click="generatIndex">首页更新</Button>
    </div>
    <div slot="footer">
    </div>
  </Modal>
</template>

<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';
  export default {
    data() {
      return {
        modal2: false,
        modal_loading: false,
      }
    },
    methods: {
      aKeyGeneration() {
        this.$Modal.confirm({
          title: '一键生成',
          content: '是否一键生成站点?',
          okText: '更新',
          cancelText: '取消',
          onOk: (index) => {
            let id = this.genaraterId;
            this.apiGet('site/' + id).then((res) => {
              this.handelResponse(res, (data, msg) => {
              }, (data, msg) => {
                this.modal_loading = false;
                this.$Message.error(msg, 5);
              })
            }, (res) => {
              //处理错误信息
              this.modal_loading = false;
              this.$Message.error('网络异常，请稍后重试。');
            })
          },
          onCancel: () => {
            return false
          }
        })
      },
      generatIndex() {
        this.$Modal.confirm({
          title: '更新首页',
          content: '是否更新首页?',
          okText: '更新',
          cancelText: '取消',
          onOk: (index) => {
            let id = this.genaraterId;
            this.apiGet('site/' + id).then((res) => {
              this.handelResponse(res, (data, msg) => {
              }, (data, msg) => {
                this.modal_loading = false;
                this.$Message.error(msg, 5);
              })
            }, (res) => {
              //处理错误信息
              this.modal_loading = false;
              this.$Message.error('网络异常，请稍后重试。');
            })
          },
          onCancel: () => {
            return false
          }
        })
      },
      generatArticle() {
        this.$Modal.confirm({
          title: '文章更新',
          content: '是否更新文章?',
          okText: '更新',
          cancelText: '取消',
          onOk: (index) => {
            let id = this.genaraterId;
            this.apiGet('site/' + id).then((res) => {
              this.handelResponse(res, (data, msg) => {
              }, (data, msg) => {
                this.modal_loading = false;
                this.$Message.error(msg, 5);
              })
            }, (res) => {
              //处理错误信息
              this.modal_loading = false;
              this.$Message.error('网络异常，请稍后重试。');
            })
          },
          onCancel: () => {
            return false
          }
        })
      },
      generatMenu() {
        this.$Modal.confirm({
          title: '更新栏目',
          content: '是否更新栏目?',
          okText: '更新',
          cancelText: '取消',
          onOk: (index) => {
            let id = this.genaraterId;
            this.apiGet('site/' + id).then((res) => {
              this.handelResponse(res, (data, msg) => {
              }, (data, msg) => {
                this.modal_loading = false;
                this.$Message.error(msg, 5);
              })
            }, (res) => {
              //处理错误信息
              this.modal_loading = false;
              this.$Message.error('网络异常，请稍后重试。');
            })
          },
          onCancel: () => {
            return false
          }
        })
      }
    },
    props: {
      genaraterId: Number
    },
    mixins: [http]
  }

</script>
<style>


</style>

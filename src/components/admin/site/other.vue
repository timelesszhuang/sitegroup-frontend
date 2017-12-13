<template>
  <Modal v-model="modal2" width="560">
    <p slot="header" style="color:dodgerblue;text-align:center;font-size: 18px;">
      <Icon type="flag"></Icon>
      <span>其他操作</span>
    </p>
    <div style="text-align:center">
      <Button type="success" @click="sendActivity" title="同步相关的活动创意等到站点中">发送活动创意</Button>
      <Button type="primary" @click="changeStatus(10)" v-if="otherArr.main_site==20" title="取消设置同一个站点分类中的主站。">取消主站
      </Button>
      <Button  @click="changeStatus(20)" v-else="otherArr.main_site==10" title="设置为同一个站点分类的的主站，链轮相关。">设为主站
      </Button>
      <!--需要有个整站重新生成的-->
      <Button type="error" @click="resetSite" title="全站重新生成适用于重新发送模板的情形，请慎重执行该操作！">重置站点</Button>
      <Button type="info" @click="changeCdn" title="用于保存站点的CDN相关信息">cdn信息</Button>
      <Button type="success" @click="activepush" title="更新内容搜索引擎主动推送">主动推送</Button>
      <!--<Button type="warning" @click="ftpInfo" title="">FTP信息</Button>-->
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
      activepush(){
        let siteinfo = this.otherArr;
        this.$parent.activepush(siteinfo)
      },
      changeCdn() {
        let siteinfo = this.otherArr;
        this.$parent.changeCdn(siteinfo)
      },
      ftpInfo() {
        let siteinfo = this.otherArr;
        this.$parent.ftpInfo(siteinfo)
      },
      sendActivity() {
        let siteinfo = this.otherArr;
        let site_id = siteinfo.id
        this.$parent.sendActivity(site_id)
      },
      changeStatus(main_site) {
        let siteinfo = this.otherArr;
        this.$parent.changeStatus(siteinfo, main_site)
      },
      //整站重新静态化 只需要把 sync_count 表中栏目已经count 的置为空
      resetSite() {
        let siteinfo = this.otherArr;
        let site_id = siteinfo.id
        let _this = this
        this.$Modal.confirm({
          title: '重置站点',
          content: '您确定重置站点? 操作请慎重，该操作会把站点重置为建站初期。',
          okText: '重置',
          cancelText: '取消',
          onOk: (index) => {
            _this.apiGet('Site/resetSite/' + site_id).
            then((res) => {
              _this.handelResponse(res, (data, msg) => {
                _this.$Message.success(msg);
              }, (data, msg) => {
                _this.$Message.error(msg);
              })
            }, (res) => {
              //处理错误信息
              _this.$Message.error('网络异常，请稍后重试。');
            })
          },
          onCancel: () => {
            return false
          }
        })
      }
    },
    props: {
      otherArr: {}
    },
    mixins: [http]
  }

</script>
<style>


</style>

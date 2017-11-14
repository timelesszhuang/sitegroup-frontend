<template>
  <Modal v-model="modal2" width="460">
    <p slot="header" style="color:dodgerblue;text-align:center;font-size: 18px;">
      <Icon type="flag"></Icon>
      <span>活动主题列表</span>
    </p>
    <div style="text-align:center">
      <div class="ivu-table ivu-table-border"><!---->
        <div class="ivu-table-header">
          <table cellspacing="0" cellpadding="0" border="0" style="width:100%;">
            <thead>
            <tr>
              <th>
                <div class="ivu-table-cell"><span>id</span></div>
              </th>
              <th>
                <div class="ivu-table-cell"><span>活动标题</span></div>
              </th>
              <th>
                <div class="ivu-table-cell"><span>是否同步</span></div>
              </th>
              <th>
                <div class="ivu-table-cell"><span>操作</span></div>
              </th>
            </tr>
            </thead>
          </table>
        </div>
          <table cellspacing="0" cellpadding="0" border="0" style="width:100%;">
            <tbody class="ivu-table-tbody">
            <tr class="ivu-table-row" v-for="item in datas">
              <td>
                <div class="ivu-table-cell">
                  <div><strong>{{item["id"]}}</strong></div>
                </div>
              </td>
              <td>
                <div class="ivu-table-cell"> <span>{{item["name"]}}</span></div>
              </td>
              <td class="">
                <div class="ivu-table-cell"><span>{{item["issync"]}}</span></div>
              </td>
              <td class="ivu-table-column-center">
                <div class="ivu-table-cell">
                  <div>
                    <button @click="sendTemp(item['id'])"  type="button" class="ivu-btn ivu-btn-primary ivu-btn-small" style="margin-right: 5px;">
                     <span>{{item["sync"]}}</span></button>
                    </button>
                  </div>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
    </div>
    <div slot="footer">
    </div>
  </Modal>
</template>

<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';
  export default{
    data() {
      return {
        modal2: false,
        modal_loading: false,
      }
    },
    methods: {
      sendTemp(id){
        this.apiGet('Site/ignoreFrontend/' + id + '/'+this.sid+"/activity").then((res) => {
          this.handelResponse(res, (data, msg) => {
            this.modal = false;
            this.modal_loading = false;
            this.$parent.sendActivity(this.sid)
            this.$Message.success(msg);
          }, (data, msg) => {
            this.modal_loading = false;
            this.$Message.error(msg, 5);
          })
        }, (res) => {
          //处理错误信息
          this.modal_loading = false;
          this.$Message.error('网络异常，请稍后重试。');
        })
      }
    },
    props: {
      sid: Number,
      datas: {
        default: {}
      }
    },
    mixins: [http]
  }
</script>
<style>


</style>

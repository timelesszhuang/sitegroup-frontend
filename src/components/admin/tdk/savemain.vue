<template>
  <div>
      <Modal
        v-model="modal" width="350">
        <p slot="header">
          <span>选择主关键词</span>
        </p>
        <div>
          <Select v-model="oldKey" style="width:150px" label-in-value filterable clearable>
            <Option v-for="item in keys" :value="item.id" :label="item.text" :key="item">{{ item.text }}</Option>
          </Select>
        </div>

        <div slot="footer">
          <Button type="success" size="large" :loading="modal_loading" @click="add">保存</Button>
        </div>
      </Modal>
  </div>

</template>

<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';
    export default {
      data() {
          return {
            modal_loading:false,
            modal:false,
          }
      },
      methods: {
        add() {
           if(!this.oldKey){
             this.$Message.error("请选择关键词");
             return
           }
           let data={
             id:this.siteid,
             akeyword_id:this.oldKey
           }

          this.apiPost('admin/editpageinfo',data).then((data) => {
            this.handelResponse(data, (data, msg) => {

              this.$Message.success(msg);
              this.modal=false;
            }, (data, msg) => {
              this.$Message.error(msg);
            })
          }, (data) => {
            this.$Message.error('请先选择站点->点击查询!');
          })
        }
      },
      props:{
        oldKey:'',
        siteid:'',
        keys:{

        }
      },

      mixins: [http]
    }
</script>

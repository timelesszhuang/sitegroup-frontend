<template>
  <div>
    <Modal
      v-model="modal">
      <p slot="header" style="color:#f60;">
        <Icon type="information-circled"></Icon>
        <span>修改关键词</span>
      </p>
      <div>
        <Form ref="savekeyword" :model="datas" :label-width="90" :rules="akeyWordRule" class="company-add-form">
          <Form-item label="关键词" prop="label">
            <Input type="text" v-model="datas.label" placeholder="请输入关键词"></Input>
          </Form-item>
        </Form>
      </div>
      <div slot="footer">
        <Button type="success" size="large" :loading="modal_loading" @click="saveKeyword">保存</Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';
  export default {
    data() {
      return {
        modal:false,
        modal_loading:false,
        akeyWordRule: {
          label: [
            {required: true, message: '请输入关键字', trigger: 'blur'}
          ]
        }
      }
    },
    props:{
      datas:{
        default:Object
      }
    },
    mixins: [http],
    methods:{
      saveKeyword(){
        let id=this.datas.id
        let name=this.datas.label;
        this.apiGet('admin/updateKeyword/'+id+"/"+name).then((res) => {
          this.handelResponse(res, (data, msg) => {
            this.$Message.success(msg);
            this.modal=false;
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (res) => {
          //处理错误信息
          this.$Message.error('网络异常，请稍后重试');
        })
      }
    }
  }
</script>

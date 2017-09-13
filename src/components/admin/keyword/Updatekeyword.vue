<template>
  <div>
    <Modal
      v-model="modal">
      <p slot="header" style="color:#f60;">
        <Icon type="information-circled"></Icon>
        <span>修改关键词</span>
      </p>
      <div>
        <Form ref="savekeyword" :model="form" :label-width="90" :rules="akeyWordRule" class="company-add-form">
          <Form-item label="关键词" prop="name">
            <Input type="text" v-model="form.name" placeholder="请输入关键词"></Input>
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
        form:{
          name:''
        },
        akeyWordRule: {
          name: [
            {required: true, message: '请输入关键字', trigger: 'blur'}
          ]
        }
      }
    },
    props:{
      upid:Number
    },
    mixins: [http],
    methods:{
      saveKeyword(){
        let id=this.upid
        let name=this.form["name"];
        this.apiGet('admin/updateKeyword/'+id+"/"+name).then((res) => {
          this.handelResponse(res, (data, msg) => {
            this.$Message.success(msg);
            this.modal=false;
            setTimeout(function () {
              location.reload();
            }, 1000);
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

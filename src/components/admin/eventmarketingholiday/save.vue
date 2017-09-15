<template>
  <div>
    <div>
      <Modal
        v-model="modal" width="900">
        <p slot="header">
          <span>修改</span>
        </p>
        <div>
          <Form ref="eventmarketingholidaysave" :model="form" :label-width="90" :rules="AddRule" class="node-add-form"> <Form-item label="节日名称" prop="name">
            <Input type="text" v-model="form.name" placeholder="请输入标题"></Input>
          </Form-item>
            <Form-item label="日期" prop="time">
              <Date-picker type="daterange" v-model="form.time" placement="bottom-end" placeholder="选择日期"></Date-picker>
            </Form-item>
            <Form-item label="阴历" prop="lunar">
              <Input type="text" v-model="form.lunar" placeholder="请输入当前节日的阴历"></Input>
            </Form-item>
            <Form-item label="desc" prop="desc">
              <Input type="textarea" v-model="form.desc" :rows="4" placeholder="请输入来源"></Input>
            </Form-item>
          </Form>
        </div>
        <div slot="footer">
          <Button type="success" size="large" :loading="modal_loading" @click="add">保存</Button>
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
//        time:
        AddRule: {

        }
      }
    },
    methods: {

        add() {
          this.$refs.eventmarketingholidaysave.validate((valid) => {
              if(valid){
                this.modal_loading = true;
                let data = this.form;
                let id = data.id;
                this.apiPut('sys/eventmarketholiday/'+ id, data).then((res) => {
                  this.handelResponse(res, (data, msg) => {
                    this.modal = false;
                    this.$parent.getData();
                    this.$Message.success(msg);
                    this.modal_loading = false;
                    this.$refs.eventmarketingholidaysave.resetFields();
                  }, (data, msg) => {
                    this.modal_loading = false;
                    this.$Message.error(msg);
                  })
                }, (res) => {
                  //处理错误信息
                  this.modal_loading = false;
                  this.$Message.error('网络异常，请稍后重试。');
                })
              }
          })
        }
    },
    props: {
      form: {
        default: {

        }
      },

    },
    mixins: [http]
  }
</script>

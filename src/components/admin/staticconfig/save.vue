<template>
  <div>
    <div>
      <Modal
        v-model="modal" width="600">
        <p slot="header">
          <span>修改</span>
        </p>
        <div>
          <Form ref="staticconfigsave" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
            <Form-item label="站点选择" prop="site_id">
              <Select v-model="form.site_id" style="width: 200px;" 　@on-change="changeSite"label-in-value filterable clearable >
                <Option v-for="item in site" :value="item.id" :label="item.text" :key="item">
                  {{ item.text }}
                </Option>
              </Select>
            </Form-item>
            <Form-item label="生成起始时间" prop="time">
              <el-time-select
                placeholder="起始时间"
                v-model="form.starttime"
                :picker-options="{
                  start: '09:00',
                  step: '00:30',
                  end: '10:30'
                  }">
              </el-time-select>
              <el-time-select
                placeholder="结束时间"
                v-model="form.stoptime"
                :picker-options="{
                  start: '08:30',
                  step: '00:30',
                  end: '19:30',
                  minTime: form.starttime
                }">
              </el-time-select>
            </Form-item>
            <Form-item label="允许发布的数量" prop="staticcount">
              <Input v-model="form.staticcount" placeholder="请输入数量"></Input>
            </Form-item>
            <Form-item label="生成类型" prop="type">
              <Select v-model="form.type" style="text-align: left;width:200px;">
                <Option v-for="item in type" :value="item.value" :key="item">{{ item.label }}</Option>
              </Select>
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
        type: [
          {
            value: 'article',
            label: '文章'
          },
          {
            value: 'question',
            label: '问答'
          },
          {
            value: 'scatteredartile',
            label: '零散文章'
          }
        ],
        AddRule: {
        }
      }
    },
    methods: {
      changeSite(value){
        this.form.site_name = value.label
        this.form.site_id = value.value
      },
        add() {
          this.$refs.staticconfigsave.validate((valid) => {
              if(valid){
                this.modal_loading = true;
                let data = this.form;
                let id = data.id;
                this.apiPut('Staticconfig/'+ id, data).then((res) => {
                  this.handelResponse(res, (data, msg) => {
                    this.modal = false;
                    this.$parent.getData();
                    this.$Message.success(msg);
                    this.modal_loading = false;
                    this.$refs.staticconfigsave.resetFields();
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
    site:{
    default:
      []
    },

      form: {
        default: {
          starttime: '',
          stoptime: '',
          staticcount:"",
          site_id:'',
          site_name:'',
        }
      }
    },
    mixins: [http],

  }
</script>

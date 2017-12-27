<template>
  <div>
    <div>
      <Modal
        v-model="modal" width="600">
        <p slot="header">
          <span>添加产品分类</span>
        </p>
        <div>
          <Form ref="ptypeadd" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
            <Form-item label="分类名称" prop="name">
              <Input type="text" v-model="form.name" placeholder="请输入分类名"></Input>
            </Form-item>
            <Form-item label="英文名" prop="alias">
              <Input type="text"  v-model="form.alias" placeholder="请输入英文名"></Input>
            </Form-item>
            <Form-item label="详情" prop="detail">
              <Input type="text" v-model="form.detail" placeholder="请输入分类详情"></Input>
            </Form-item>
            <Row>
              <Col span="21">
              <Form-item v-if="tag_name" label="分类标签" prop="tag_id">
                <Select ref="select" :clearable="selects" v-model="form.tag_id"
                        style="position:relative;text-align: left;width:250px;z-index: 10000;"
                        label-in-value filterable　@on-change="changeTagtype">
                  <Option v-for="item in tagname" :value="item.id" :label="item.tag" :key="item">
                    {{ item.tag }}
                  </Option>
                </Select>
              </Form-item>
              <Form-item label="分类标签" v-if="!tag_name" prop="tag_id">
                <Input type="text" v-model="form.tag_name" placeholder="请输入标签区分分类"></Input>
              </Form-item>
              </Col>
              <Col span="3">
              <i-switch  size="large" v-model="switch1" @on-change="change">
                <span slot="open">选择</span>
                <span slot="close">填写</span>
              </i-switch>
              </Col>
            </Row>
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
        switch1: true,
        modal: false,
        tag_name: true,
        selects: true,
        modal_loading: false,
        form: {
          name: "",
          detail: "",
          tag_id: '',
          alias: '',
          tag_name:'',
        },
        AddRule: {
          alias: [
            {required: true, message: '请填写英文名', trigger: 'blur'},
          ],
          name: [
            {required: true, message: '请填写分类', trigger: 'blur'},
          ],
          detail: [
            {required: true, message: '请填写详情', trigger: 'blur'},
          ],
        }
      }
    },
    methods: {
      change(status) {
        if (status) {
          this.tag_name = true
          this.$Message.info('切换到下拉选择');
        } else {
          this.tag_name = false
          this.$Message.info('切换到添加标签');
        }

      },
      changeTagtype(value) {
        this.form.tag_id = value.value
      },
        add() {
          this.$refs.ptypeadd.validate((valid) => {
              if(valid){
                this.modal_loading = true;
                let data = this.form;
                this.apiPost('admin/productType', data).then((res) => {
                  this.handelResponse(res, (data, msg) => {
                    this.modal = false;
                    this.$parent.getData();
                    this.$Message.success(msg);
                    this.modal_loading = false;
                    this.$refs.ptypeadd.resetFields();
                    this.$refs.select.clearSingleSelect()
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
    mixins: [http],
    props: {
      tagname: {
        default: []
      }
    }
  }
</script>

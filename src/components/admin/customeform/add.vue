<template>
  <div>
    <div>
      <Modal
        v-model="modal" width="1000" style="height:auto">
        <p slot="header">
          <span>添加配置</span>
        </p>
        <div>
          <Form ref="customeform" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
            <Form-item label="当前配置用途" style="width: 300px;margin: 0 auto;" prop="detail">
              <Input type="text" v-model="form.detail" placeholder="请输入当前配置用途"></Input>
            </Form-item>
            <br/>
            <Row>
              <Col span="6">
              <Form-item label="分类名称" style="width: 240px;" prop="name1">
                <Input type="text" v-model="form.field1.name" placeholder="请输入名称"></Input>
              </Form-item>
              </Col>
              <Col span="6">
              <Form-item label="placeholder" style="width: 250px;" prop="placeholder1">
                <Input type="text" v-model="form.field1.placeholder" placeholder="请输入placeholder配置"></Input>
              </Form-item>
              </Col>

              <Col span="6">
              <Form-item label="type类型" style="width: 200px;" prop="type1">
                <Select v-model="form.field1.type" clearable style="width:150px">
                  <Option v-for="item in type" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </Form-item>
              </Col>
              <Col span="6">
              <Form-item label="是否必填" style="width: 100px;" prop="require">
                <Checkbox v-model="form.field1.require"></Checkbox>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col span="6">
              <Form-item label="分类名称2" style="width: 240px;" prop="name2">
                <Input type="text" v-model="form.field2.name" placeholder="请输入名称"></Input>
              </Form-item>
              </Col>
              <Col span="6">
              <Form-item label="placeholder2" style="width: 250px;" prop="placeholder2">
                <Input type="text" v-model="form.field2.placeholder" placeholder="请输入placeholder配置"></Input>
              </Form-item>
              </Col>
              <Col span="6">
              <Form-item label="type类型2" style="width: 200px;" prop="type2">
                <Select v-model="form.field2.type" clearable style="width:150px">
                  <Option v-for="item in type" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </Form-item>
              </Col>
              <Col span="6">
              <Form-item label="是否必填" style="width: 100px;" prop="require">
                <Checkbox v-model="form.field2.require"></Checkbox>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col span="6">
              <Form-item label="分类名称3" style="width: 240px;" prop="name2">
                <Input type="text" v-model="form.field3.name" placeholder="请输入名称"></Input>
              </Form-item>
              </Col>
              <Col span="6">
              <Form-item label="placeholder3" style="width: 250px;" prop="placeholder2">
                <Input type="text" v-model="form.field3.placeholder" placeholder="请输入placeholder配置"></Input>
              </Form-item>
              </Col>
              <Col span="6">
              <Form-item label="type类型3" style="width: 250px;" prop="type2">
                <Select v-model="form.field3.type" clearable style="width:150px">
                  <Option v-for="item in type" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </Form-item>
              </Col>
              <Col span="6">
              <Form-item label="是否必填" style="width: 100px;" prop="require">
                <Checkbox v-model="form.field3.require"></Checkbox>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col span="6">
              <Form-item label="分类名称4" style="width: 240px;" prop="name2">
                <Input type="text" v-model="form.field4.name" placeholder="请输入名称"></Input>
              </Form-item>
              </Col>
              <Col span="6">
              <Form-item label="placeholder4" style="width: 250px;" prop="placeholder2">
                <Input type="text" v-model="form.field4.placeholder" placeholder="请输入placeholder配置"></Input>
              </Form-item>
              </Col>
              <Col span="6">
              <Form-item label="type类型4" style="width: 250px;" prop="type2">
                <Select v-model="form.field4.type" clearable style="width:150px">
                  <Option v-for="item in type" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </Form-item>
              </Col>
              <Col span="6">
              <Form-item label="是否必填" style="width: 100px;" prop="require">
                <Checkbox v-model="form.field4.require"></Checkbox>
              </Form-item>
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
        modal: false,
        modal_loading: false,
        form: {
          field1: {
            name: '',
            placeholder: '',
            type: 'text',
            require:false
          },
          field2: {
            name: "",
            placeholder: '',
            type: 'text',
            require:false
          },
          field3: {
            name: '',
            placeholder: '',
            type: 'text',
            require:false
          },
          field4: {
            name: "",
            placeholder: '',
            type: 'text',
            require:false
          },

        },
        type: [
          {
            value: 'text',
            label: 'text类型'
          },
          {
            value: 'textarea',
            label: 'textarea类型'
          },
        ],
        position:"1",

        AddRule: {}
      }
    },
    methods: {
      add() {
        this.$refs.customeform.validate((valid) => {
          if (valid) {
            this.modal_loading = true;
            let data = this.form;
            this.apiPost('admin/userdefinedform', data).then((res) => {
              this.handelResponse(res, (data, msg) => {
                this.modal = false;
                this.$parent.getData();
                this.$Message.success(msg);
                this.modal_loading = false;
                this.$refs.customeform.resetFields();
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
    mixins: [http]
  }
</script>

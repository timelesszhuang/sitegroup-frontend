<template>
  <div>
    <div>
      <Modal
        v-model="modal" width="600"  :styles="{top: '20px'}">
        <p slot="header">
          <span>添加产品型栏目</span>
        </p>
        <div>
          <Form ref="productadd" :model="form" :label-width="90" :rules="AddRule" class="node-add-form">
            <Form-item label="栏目/菜单名称" prop="name">
              <Input type="text" v-model="form.name" placeholder="请填写栏目/菜单名字"></Input>
            </Form-item>
            <Form-item label="英文名" prop="generate_name">
              <Input type="text" v-model="form.generate_name" placeholder="请填写英文名，用于生成静态页命名"></Input>
            </Form-item>
            <Form-item label="详情" prop="title">
              <Input type="text" v-model="form.title" placeholder="请填写栏目的详情"></Input>
            </Form-item>
            <Form-item label="产品分类" prop="type_name">
              <Select v-model="type_name" style="width:200px;" placeholder="根据分类查询" label-in-value filterable clearable @on-change="changePtype">
                <Option v-for="item in ptype" :value="item.id" :key="item">{{ item.text }}</Option>
              </Select>
            </Form-item>
            <Form-item label="分类" prop="tag_name">
              <Select v-model="form.tag_id" ref="select" :clearable="selects" style="text-align: left;width:200px;"
                      label-in-value filterable 　@on-change="changeNavtype">
                <Option v-for="item in navtype" :value="item.id" :label="item.text" :key="item">
                  {{ item.text }}
                </Option>
              </Select>
            </Form-item>
          </Form>
        </div>
        <div slot="footer">
          <Button type="success" size="large" :loading="modal_loading" @click="addproduct">保存</Button>
        </div>
      </Modal>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';
  export default {
    data() {
      const checkNavtype = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请选择栏目分类'));
        } else {
          callback();
        }
      };
      const checkarticletype = (rule, value, callback) => {
        if (!value ) {
          callback(new Error('请选择分类'));
        } else {
          callback();
        }
      };
      return {
        modal: false,
        modal_loading: false,
        type_name: '',
        form: {
          name: "",
          title: "",
          flag:"5",
          flag_name:"产品型",
          generate_name:'',
          type_name:''
        },
        selects:true,
        AddRule: {
          name: [
            {required: true, message: '请填写菜单名字', trigger: 'blur'},
          ],
          title: [
            {required: true, message: '请填写栏目的详情', trigger: 'blur'},
          ],
          type_name: [
            {required: true,validator: checkarticletype, trigger: 'blur'}
          ],
          generate_name:[
            {required: true, message: '请填写生成的文件名', trigger: 'blur'}
          ],
          tag_name: [
            {required: true,validator: checkNavtype, trigger: 'blur'}
          ],
        }
      }
    },
    methods: {

      changeNavtype(value) {
        this.form.tag_name= value.label
        this.form.tag_id = value.value
      },
      changePtype(value) {
//        console.log(value)
        this.form.type_id = value.value
        this.form.type_name =  value.label
      },
      addproduct() {
          this.$refs.productadd.validate((valid) => {
              if(valid){
                this.modal_loading = true;
                let data = this.form;
                this.apiPost('menu', data).then((res) => {
                  this.handelResponse(res, (data, msg) => {
                    this.modal = false;
                    this.$parent.getData();
                    this.$Message.success(msg);
                    this.modal_loading = false;
                    this.$refs.productadd.resetFields();
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

      navtype: {
        default: []
      },
      ptype: {
        default: []
      }
    }
  }
</script>

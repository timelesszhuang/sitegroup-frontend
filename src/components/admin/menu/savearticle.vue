<template>
  <div>
    <Modal
      v-model="modal" width="600"  :styles="{top: '20px'}">
      <p slot="header">
        <span>修改文章型栏目</span>
      </p>
      <div>
        <Form ref="data" :model="form" :label-width="150" :rules="AddRule" class="node-add-form">
          <Form-item label="栏目/菜单名称" prop="name">
            <Input type="text"
                   v-model="form.name" placeholder="请填写栏目/菜单名字"></Input>
          </Form-item>
          <Form-item label="英文名" prop="generate_name">
            <Input type="text" v-model="form.generate_name" placeholder="请填写英文名，用于生成静态页命名(不要输入.html)"></Input>
          </Form-item>
          <Form-item label="详情" prop="title">
            <Input type="text" v-model="form.title" placeholder="请填写栏目的详情"></Input>
          </Form-item>
          <Form-item label="文章分类" prop="type_id">
            <Select ref="select" :clearable="selects"v-model="form.type_id" style="width:200px;position: relative;z-index: 10000"
                    multiple    >
              <Option-group  v-for="(item,index) in articletype" :label="index" :key="item">
                <Option v-for="items in item"  :value="items.id" :label="items.name" :key="index">{{ items.name }}</Option>
              </Option-group>
            </Select>
          </Form-item>
          <Form-item label="分类" prop="tag_name">
            <Select  ref="select" :clearable="selects" v-model="form.tag_id" style="text-align: left;width:200px;"
                    label-in-value filterable　@on-change="changeNavtype">
              <Option v-for="item in navtype" :value="item.id" :label="item.text" :key="item">
                {{ item.text }}
              </Option>
            </Select>
          </Form-item>
          <Form-item label="上级分类" prop="p_id">
            <Select v-model="form.p_id"  style="text-align: left;width:250px;"
                    label-in-value @on-change="changeArticletype">
              <Option v-for="item in pidtype" :value="item.id" :label="item.name" :key="item">
                {{ item.text }}
              </Option>
            </Select>
          </Form-item>
          <Form-item label="列表页面模板名" prop="listtemplate">
            <Input type="text" v-model="form.listtemplate" placeholder="请填写列表页面模板名(加.html)"></Input>
          </Form-item>
          <Form-item label="详情页面的相关模板名" prop="detailtemplate">
            <Input type="text" v-model="form.detailtemplate" placeholder="请填写详情页面的相关模板名(加.html)"></Input>
          </Form-item>
          <Form-item label="栏目列表调取的数量" prop="listsize">
            <Input-number  :min="0" v-model="form.listsize"  placeholder="请填写当前栏目列表调取的数量"></Input-number>
          </Form-item>
        </Form>
      </div>
      <div slot="footer">
        <Button type="success" size="large" :loading="modal_loading" @click="savearticle">保存</Button>
      </div>
    </Modal>
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
        if (!value) {
          callback(new Error('请选择文章分类'));
        } else {
          callback();
        }
      };
      return {
        modal: false,
        type_name:'',
        modal_loading: false,
        selects: true,
        AddRule: {
          name: [
            {required: true, message: '请填写菜单名字', trigger: 'blur'},
          ],
          title: [
            {required: true, message: '请填写栏目的详情', trigger: 'blur'},
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
      changeArticletype(value) {
        this.form.p_id = value.value
      },
      savearticle() {
        this.$refs.data.validate((valid) => {
          if (valid) {
            this.modal_loading = true;
            let data = this.form;
            let id = data.id;
            data.type_name=this.type_name;
            this.apiPut('menu/' + id, data).then((res) => {
              this.handelResponse(res, (data, msg) => {
                this.modal = false;
                this.$parent.getData();
                this.$Message.success(msg);
                this.modal_loading = false;
                this.$refs.data.resetFields();
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
      articletype: {
        default: {

        }
      },
    navtype: {
      default: []
    },
      pidtype: {
        default: []
      },
      form: {
        default: {
          name: "",
          title: '',
        }
      }
    }
  }
</script>


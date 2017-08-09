<template>
  <div>
    站点选择:
    <Select v-model="site_type_id" style="width:300px" label-in-value filterable clearable>
    <Option v-for="item in sitetype" :value="item.id" :label="item.text" :key="item">{{ item.text}}</Option>
  </Select>
    <Button type="primary" @click="getInfo">查询</Button>
    <Button type="info" @click="addTemplate">添加模板</Button>
    <div class="content" style="margin-top:10px;">
      <el-table
        :data="datas"
        stripe
        style="width: 100%">
        <el-table-column
          prop="name"
          label="文件名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="size"
          label="大小"
          width="180">
        </el-table-column>
        <el-table-column
          prop="filemtime"
          label="创建时间">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template scope="scope">
            <el-button type="text" size="small" @click="editTemplate(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--<Table ref="table"  :context="self" :border="border" :stripe="stripe" :show-header="showheader"-->
      <!--:size="size" :data="datas" :columns="tableColumns" style="width: 100%">-->
      <!--</Table>-->
    </div>
    <Save ref="save" :content="content" :filename="filename" :site_id="site_id"></Save>
    <Add ref="add" :site_id="site_id"></Add>
  </div>
</template>

<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';
  import Save from './templatesave.vue';
  import Add from './templateadd.vue'
  export default {
    data() {
      return {
        sitetype: [],
        site_type_id: '',
        self: this,
        border: true,
        stripe: true,
        showheader: true,
        size: 'small',
        datas: [],
        site_id: 0,
        content: '',
        filename: ''
      }
    },
    components: {
      Save, Add
    },
    created() {
      this.getSiteType()
    },
    methods: {
      addTemplate(){
        if (this.site_id > 0) {
          this.$refs.add.modal1 = true
        } else {
          this.$Message.error('请先选择站点->点击查询!');
        }
      },
      editTemplate(row){
        let name = row.name
        if (this.site_id > 0) {
          this.apiGet('/templateRead/' + this.site_id + "/" + name).then((res) => {
            this.handelResponse(res, (data, msg) => {
              this.content = data.content
              this.filename = data.filename
              this.$refs.save.modal1 = true
            }, (data, msg) => {
              this.$Message.error(msg);
            })
          }, (res) => {
            //处理错误信息
            this.$Message.error('网络异常，请稍后重试。');
          });
        } else {
          this.$Message.error('请先选择站点->点击查询!');
        }
      },
      getInfo() {
        this.site_id = this.site_type_id
        if (this.site_id > 0) {
          this.apiGet('/templateList/' + this.site_id).then((res) => {
            this.handelResponse(res, (data, msg) => {
              this.datas = data
            }, (data, msg) => {
              this.$Message.error(msg);
            })
          }, (res) => {
            //处理错误信息
            this.$Message.error('网络异常，请稍后重试。');
          });
        }
      },
      getSiteType() {
        this.apiGet('Site/getSites').then((res) => {
          this.handelResponse(res, (data, msg) => {
            this.sitetype = data
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (res) => {
          //处理错误信息
          this.$Message.error('网络异常，请稍后重试。');
        });
      }
    },
    computed: {
      tableColumns()
      {
        let columns = [];
        if (this.showCheckbox) {
          columns.push({
            type: 'selection',
            width: 60,
            align: 'center'
          })
        }
        columns.push({
          title: '文件名称',
          key: 'name',
          sortable: true
        });

        columns.push({
          title: '大小',
          key: 'size',
        });
        columns.push({
          title: '创建时间',
          key: 'filemtime',
          sortable: true
        });
        columns.push(
          {
            title: '操作',
            key: 'action',
            width: 100,
            align: 'center',
            fixed: 'right',
            render (row, column, index) {
              return `<i-button type="info" size="big" @click="editTemplate(${index})">修改</i-button>`;
            }
          }
        );
        return columns;
      }
    },
    mixins: [http]
  }

</script>


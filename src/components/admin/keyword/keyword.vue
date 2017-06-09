<!--该组件使用 饿了么 tree 实现-->
<template>
  <div>
    <Row>
      <Col span="24" style="padding: 10px;">
      <Button type="primary" shape="circle" icon="android-add" @click="addkeyword">批量添加关键词</Button>
      <Button type="success" shape="circle" icon="android-add" @click="addAkeyword">添加A类关键词</Button>
      <Button type="error" shape="circle" icon="android-add" @click="removeKeyword">删除关键词</Button>
      </Col>
    </Row>
    <el-input
      placeholder="输入关键字进行过滤"
      v-model="filterText"
      style="margin-bottom: 10px;">
    </el-input>
    <el-tree :data="data"
             :props="props"
             :load="loadNode"
             class="filter-tree"
             lazy="" show-checkbox
             check-strictly
             ref="tree"
             :filter-node-method="filterNode">
    </el-tree>
    <!--操作相关子组件-->
    <keywordUpload ref="upload" :id="checkedNodeId"></keywordUpload>
    <AkeywordAdd ref="akeywordadd"></AkeywordAdd>
  </div>
</template>


<script>
  import http from '../../../assets/js/http.js';
  import keywordUpload from './keywordupload.vue';
  import AkeywordAdd from './Akeywordadd.vue';

  export default {
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    components: {keywordUpload, AkeywordAdd},
    data() {
      return {
        checkedNodeId: 0,
        data: [],
        props: {
          label: 'label',
          children: 'children'
        },
        filterText: '',
      };
    },
    methods: {
      addkeyword(){
        let node = this.$refs.tree.getCheckedNodes();
        if (node.length == 1) {
          if (node[0].tag == 'C') {
            this.$Message.info('不能选择C类关键词作为上级节点');
            return;
          }
          this.checkedNodeId = node[0].id;
          this.$refs.upload.modal = true;
        } else if (node.length == 0) {
          this.$Message.info('请至少选择一个父亲关键词');
        } else {
          this.$Message.info('只能选择一个节点作为上级关键词');
        }
      },
      removeKeyword(){
        let node = this.$refs.tree.getCheckedNodes();
        if (node.length == 1) {
          let _this = this
          this.$Modal.confirm({
            title: '确认删除',
            content: '您确定删除该节点?',
            okText: '删除',
            cancelText: '取消',
            onOk: () => {
              _this.apiDelete('keyword/' , node[0].id).then((res) => {
                _this.handelResponse(res, (data, msg) => {
                  setTimeout(function () {
                    location.reload();
                  }, 1000);
                  // 删除数据库中信息
                  _this.$Message.success(msg);
                }, (data, msg) => {
                  _this.$Message.error(msg);
                })
              }, (res) => {
                //处理错误信息
                _this.$Message.error('网络异常，请稍后重试');
              })
            },
            onCancel: () => {
              return false
            }
          })
        } else if (node.length == 0) {
          this.$Message.info('请至少选择一个父亲关键词');
        } else {
          this.$Message.info('只能选择一个节点作为上级关键词');
        }
      },
      //添加A 类关键词
      addAkeyword(){
        //添加A 类 关键词
        this.$refs.akeywordadd.modal = true
      },
      //过滤数据
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      //获取数据
      getData(id, func){
        let data = {}
        if (id != 0) {
          data = {
            params: {
              id: id,
            }
          }
        }
        this.apiGet('keyword', data).then((res) => {
          this.handelResponse(res, (childdata, msg) => {
            func(childdata)
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (res) => {
          //处理错误信息
          this.$Message.error('网络异常，请稍后重试。');
        })
      },
      loadNode(node, resolve) {
        if (node.level === 0) {
          //第一次请求资源的时候
          this.getData(0, (data) => {
            return resolve(data);
          });
        } else if (node.level >= 3) {
          return resolve([]);
        } else {
          this.getData(node.data.id, (data) => {
            resolve(data)
          });
        }
      }
    },
    mixins: [http]
  };
</script>

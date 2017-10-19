<template>
  <div>
    <div class="top">
      模板名
      <Input v-model="name" placeholdr="模板名" style="width:300px;"></Input>
      <Button type="primary" @click="queryData">查询</Button>
      <Button type="success" @click="add">添加</Button>
    </div>
    <div class="content" style="margin-top:10px;">
      <div style="width:90%;margin: 0px auto">

        <Row>
          <Col span="6" v-for="(item,index) in datas" :key="index">
          <div class="siteborder">
            <div class="sitewidth" :style=choose_bgimg(index)>
              <div class="siteclass">
                <p>{{item.name}}</p>
                <p>{{item.detail}}</p>
                <span style="font-size: 12px"v-if="item.node_id != 0">定制版 </span>
                <span style="font-size: 12px" v-if="item.node_id == 0">公共模板 </span>
              </div>
            </div>
            <div class="sitebottom" style="text-align: left;">
              <ButtonGroup>
                <p>
                  <Button v-if="item.node_id != 0" size="small" @click="edit(index)" type="primary">修改</Button>
                  <Button v-if="item.node_id == 0" size="small" @click="showhtml(index)" type="error">预览模板</Button>
                  &nbsp;
                 <span v-if="item.industry_name">
                  <Icon type="ios-navigate-outline"></Icon>
                  <span style="font-size: 13px;"> {{item.industry_name}}</span></span>
                  <span >{{item.create_time}}</span>
                </p>
                <!--<Button size="small" @click="generateStatic(item.id)" type="info">静态化</Button>-->
                <!--<Button size="small" @click="sendTemp(item.id)" type="warning">发送模板</Button>-->
                <!--<Button size="small" @click="other(item)" type="success">其他操作</Button>-->
              </ButtonGroup>
            </div>
          </div>
          </Col>
        </Row>
      </div>
      <div style="float: right;">
        <Page :total="total" :current="current" @on-change="changePage" @on-page-size-change="changePageSize"
              show-total show-elevator>
        </Page>
      </div>
      <br>
    </div>

    <templateadd ref="add"></templateadd>
    <templatesave ref="save" :form="editinfo"></templatesave>
  </div>
</template>

<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';
  import templateadd from './templateadd.vue';
  import templatesave from './temlatesave.vue';

  export default {
    data() {
      return {
        self: this,
        border: true,
        stripe: true,
        showheader: true,
        showIndex: true,
        size: 'small',
        current: 1,
        total: 0,
        page: 1,
        rows: 10,
        name: '',
        datas: [],
        editinfo: {}
      }
    },
    components: {templateadd, templatesave},
    created() {
      this.getData();
    },
    methods: {
      init() {
        this.getData();
      },
      showhtml(index){
        let showdata= this.datas[index]
        let showurl = ROOTHOST + showdata['show_path_href'];
//        console.log(dataimg)
        window.open(showurl);
      },
      choose_bgimg(index) {
        let dataimg = this.datas[index]
        let background = this.$store.state.background.backgroundcolor;
        index = index % background.length
        if (dataimg['node_id'] == 0) {
          var bgurl = ROOTHOST  + dataimg['thumbnails']
          return "background-image:url(" + bgurl + ");background-size: 100% 100%"
        }
        else {
          return background[index]
        }
      },
      getData() {
        let data = {
          params: {
            page: this.page,
            rows: this.rows,
            name: this.name
          }
        }
        this.apiGet('template', data).then((data) => {
          this.handelResponse(data, (data, msg) => {
            this.datas = data.rows
            this.total = data.total;
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (data) => {
          this.$Message.error('网络异常，请稍后重试');
        })
      },
      changePage(page) {
        this.page = page;
        this.getData();
      },
      changePageSize(pagesize) {
        this.rows = pagesize;
        this.getData();
      },
      queryData() {
        this.getData();
      },
      add() {
        this.$refs.add.modal = true
      },
      edit(index) {
        let editid = this.datas[index].id
        this.apiGet('template/' + editid).then((res) => {
          this.handelResponse(res, (data, msg) => {
            this.editinfo = data
            this.modal = false;
            this.$refs.save.modal = true
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (res) => {
          //处理错误信息
          this.$Message.error('网络异常，请稍后重试。');
        })
      },
    },
    computed: {
      tableColumns() {
        let columns = [];
        if (this.showCheckbox) {
          columns.push({
            type: 'selection',
            width: 60,
            align: 'center'
          })
        }
        if (this.showIndex) {
          columns.push({
            type: 'index',
            width: 60,
            align: 'center'
          })
        }
        columns.push({
          title: '模板名',
          key: 'name',
          sortable: true
        });
        columns.push({
          title: '详情',
          key: 'detail',
          sortable: true
        });
        columns.push({
          title: '创建时间',
          key: 'create_time',
          sortable: true
        });
        columns.push(
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            fixed: 'right',
            render(row, column, index) {
              var btn = `<i-button type="primary" size="small" @click="edit(${index})">修改</i-button>`;
              return btn;
            }
          }
        );
        return columns;
      }
    },
    mixins: [http]
  }
</script>

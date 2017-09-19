<template>
  <div>
    <div class="top" style="font-weight: 700;font-size: 17px">
      时间轴:
    </div>
    <div style="margin: 10px">
      <div style="float: left">
        <DatePicker type="year" format="yyyy" v-model="year" placeholder="选择年" @on-change="formatterData"
                    style="width: 200px"></DatePicker>
      </div>
      <Button type="primary" icon="ios-search" @click="queryData">搜索</Button>
    </div>
    <div class="timemain" style="margin: 40px auto">
      <Row>
        <Col span="7">
        <Timeline style="margin-left: 30px">
          <TimelineItem v-for="(todo,index) in datas" :key="todo.id">
            <p class="time" v-if="todo.color==1" style="color: red">{{todo.startday}}</p>
            <p class="time" v-else>{{todo.startday}}</p>
            <p>&nbsp;</p>
            <p class="timecontent" style="cursor: pointer" @click="getTemplateData(index)">{{todo.name}}&nbsp; &nbsp;&nbsp;<span
              @click="getTemplateData(index)"><Icon type="paper-airplane"></Icon></span>
            </p>
          </TimelineItem>
        </Timeline>
        </Col>
        <Col span="17">
        <div style="font-size: 15px;font-weight: 700;margin-bottom: 10px">上传模板展示</div>
        <Table :context="self" :border="border" :stripe="stripe" :show-header="showheader"
               :size="size" :data="data" :columns="tableColumns" style="width: 100%">
        </Table>
        <div style="margin-top: 10px;font-size: 15px;font-weight: 700;margin-bottom: 10px">已生成页面</div>
        <Table :context="self" :border="border" :stripe="stripe" :show-header="showheader"
               :size="size" :data="holidaydata" :columns="tableColumn" style="width: 100%">
        </Table>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page v-show="page_show" :total="total" :current="current" :page-size="pageSize" @on-change="changePage"
                  @on-page-size-change="changePageSize"
                  show-total
                  show-elevator show-sizer></Page>
          </div>
        </div>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';

  export default {
    data() {
      return {
        page_show: true,
        self: this,
        border: true,
        stripe: true,
        showheader: true,
        showIndex: true,
        size: 'small',
        total: 0,
        page: 1,
        rows: 10,
        pageSize: 10,
        current: 1,
        data: [],
        datas: [],
        year: '',
        editinfo: {},
        holidaydata: []
      }
    },
    components: {},
    created() {
      this.getData();
    },
    methods: {
      formatterData(str) {
        this.year = str;
      },
      formatter_str(str) {
        return ROOTHOST + str;
      },
      getData() {
        let data = {
          params: {
            year: this.year,
          }
        }
        this.apiGet('admin/eventmarketholiday', data).then((data) => {
          this.handelResponse(data, (data, msg) => {
            this.datas = data
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (data) => {
          this.$Message.error('网络异常，请稍后重试');
        })
      },

      getTemplateData(index) {
        let editid = this.datas[index].id
        this.apiGet('admin/AllHtmlTemplate/' + editid).then((data) => {
          this.handelResponse(data, (data, msg) => {
            this.data = data
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (data) => {
          this.$Message.error('网络异常，请稍后重试');
        })
        let data = {
          params: {
            page: this.page,
            rows: this.rows,
            holiday_id: this.datas[index].id
          }
        }
        this.apiGet('admin/eventRecord', data).then((data) => {
          this.handelResponse(data, (data, msg) => {
            this.holidaydata = data.rows
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (data) => {
          this.$Message.error('网络异常，请稍后重试');
        })
      },
      edittemplate(index) {
        let editid = this.data[index].id
        let salesman = "http://admin.salesman.cc/index.htm?template_id" + "=" + editid ;
        window.open(salesman)
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
          title: '缩略图',
          width: '200',
//          key: 'img',
          sortable: true,
          render(row, index) {
//            + row.img + '
            var type = '<div class="imggg"> <img :src=formatter_str(row.img) >    </div>';
            return type;
          },
        });
        columns.push({
          title: '模板名称',
          key: 'template_name',
          sortable: true
        });

        columns.push({
          title: '当前节日',
          key: 'holiday_name',
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
              return `<i-button type="primary" size="small" @click="edittemplate(${index})">修改</i-button>

`;
            }
          }
        );
        return columns;
      },
      tableColumn() {
        let column = [];
        if (this.showCheckbox) {
          column.push({
            type: 'selection',
            width: 60,
            align: 'center'
          })
        }
        if (this.showIndex) {
          column.push({
            type: 'index',
            width: 60,
            align: 'center'
          })
        }
        column.push({
          title: '当前节日',
          key: 'holiday',
          sortable: true
        });
        column.push({
          title: '链接',
          key: 'path',
          sortable: true,
          render(row, index) {
            return '<a href="http://api.salesman.cc/upload/' + row.path + '" target="_blank">http://api.salesman.cc/upload/' + row.path + '</a>';
          }
        });

        return column;
      }
    },
    mixins: [http]
  }
</script>
<style scoped>
  .time {
    font-size: 16px;
    font-weight: bold;
  }

  .timecontent {
    padding-left: 5px;
    font-size: 14px;
    font-weight: 600;
  }
</style>

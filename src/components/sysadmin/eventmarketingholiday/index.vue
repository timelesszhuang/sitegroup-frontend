<template>
  <div>
    <div class="top" style="font-weight: 700;font-size: 17px">
      时间轴:
    </div>
    <div style="margin: 10px">
      <div style="float: left">
      <DatePicker type="year" format="yyyy"   v-model="year" placeholder="选择年" @on-change="formatterData" style="width: 200px"></DatePicker>
      </div>
      <Button type="primary" icon="ios-search" @click="queryData">搜索</Button>
      <Button type="success" @click="add">添加</Button>
    </div>
    <div class="timemain" style="margin: 40px auto">
      <Row>
        <Col span="7">
      <Timeline style="margin-left: 30px">
        <TimelineItem v-for="(todo,index) in datas" :key="todo.id">
          <p class="time" v-if="todo.color==1"style="color: red" >{{todo.startday}}</p>
          <p class="time"   v-else>{{todo.startday}}</p>
          <p>&nbsp;</p>
          <p class="timecontent" @click="getTemplateData(index)">{{todo.name}}&nbsp; &nbsp;&nbsp;
            <span @click="edit(index)"><Icon type="edit" ></Icon></span>
            &nbsp;&nbsp;
            <span @click="remove(index)">
            <Icon type="ios-close-outline"></Icon></span>  &nbsp;&nbsp;
            <span @click="upload(index)"><Icon type="upload" style="font-size:16px"></Icon></span>
          </p>
          <!--<p>&nbsp;</p>-->
        </TimelineItem>
      </Timeline>
        </Col>
        <Col span="17" >
        <div>模板</div>
        <Table :context="self" :border="border" :stripe="stripe" :show-header="showheader"
               :size="size" :data="data" :columns="tableColumns" style="width: 100%">
        </Table>
        </Col>
      </Row>
    </div>
    <eventmarketingholidayadd ref="add"></eventmarketingholidayadd>
    <eventmarketingholidaysave ref="save"  :form="editinfo"></eventmarketingholidaysave>
    <eventmarketingholidayupload ref="upload" :form="editinfo"></eventmarketingholidayupload>
    <uploadsave ref="upsave" :form="editinfo"></uploadsave>
  </div>
</template>
<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';
    import eventmarketingholidayadd from './add.vue';
    import eventmarketingholidaysave from './save.vue';
    import eventmarketingholidayupload from './upload.vue';
    import uploadsave from './uploadsave.vue';
  export default {
    data() {
      return {
        self: this,
        border: true,
        stripe: true,
        showheader: true,
        showIndex: true,
        size: 'small',
        data:[],
        datas: [

        ],
        year:'',
        editinfo: {},
      }
    },
    components: {eventmarketingholidayadd,eventmarketingholidaysave,eventmarketingholidayupload,uploadsave},
    created() {
      this.getData();
    },
    methods: {
      formatterData(str) {
        this.year=str;
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
        this.apiGet('sys/eventmarketholiday',data).then((data) => {
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
        this.apiGet('sys/AllHtmlTemplate/'+ editid).then((data) => {
          this.handelResponse(data, (data, msg) => {
            this.data = data
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (data) => {
          this.$Message.error('网络异常，请稍后重试');
        })
      },
      queryData(){
        this.getData();
      },
      add() {
        this.$refs.add.modal = true
      },

      edit(index) {
        let editid = this.datas[index].id
        this.apiGet('sys/eventmarketholiday/' + editid).then((res) => {
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
      edittemplate(index) {
        let editid = this.data[index].id
        this.apiGet('sys/HtmlTemplate/' + editid).then((res) => {
          this.handelResponse(res, (data, msg) => {
            this.editinfo = data
            this.modal = false;
            this.$refs.upsave.modal = true
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (res) => {
          //处理错误信息
          this.$Message.error('网络异常，请稍后重试。');
        })
      },
      upload(index) {
        let editid = this.datas[index].id
        this.apiGet('sys/eventmarketholiday/' + editid).then((res) => {
          this.handelResponse(res, (data, msg) => {
            this.editinfo = data
            this.modal = false;
            this.$refs.upload.modal = true
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (res) => {
          //处理错误信息
          this.$Message.error('网络异常，请稍后重试。');
        })

      },
      remove(index) {
        //需要删除确认
        let id = this.datas[index].id
        let _this = this
        this.$Modal.confirm({
          title: '确认删除',
          content: '您确定删除该记录?',
          okText: '删除',
          cancelText: '取消',
          onOk: (index) => {
            _this.apiDelete('sys/eventmarketholiday/', id).then((res) => {
              _this.handelResponse(res, (data, msg) => {
                _this.getData()
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
        if (this.showIndex) {
          columns.push({
            type: 'index',
            width: 60,
            align: 'center'
          })
        }
        columns.push({
          title: '模板名称',
          key: 'template_name',
          sortable: true
        });
        columns.push({
          title: '缩略图',
          width:'200',
//          key: 'img',
          sortable: true,
          render(row, index) {
//            + row.img + '
            var type = '<div class="imggg"> <img :src=formatter_str(row.img) >    </div>';
            return type;
          },
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
            render (row, column, index) {
              return `<i-button type="primary" size="small" @click="edittemplate(${index})">修改</i-button>
            <i-button type="error" size="small" @click="remove(${index})">删除</i-button>`;
            }
          }
        );
        return columns;
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
    font-weight:600;
  }
</style>

<template>
  <div>
    <div class="top">
      时间轴:
      <Button type="success" @click="add">添加</Button>
    </div>
    <div class="timemain" style="width:600px;margin: 40px auto">

      <Timeline>
        <TimelineItem v-for="(todo,index) in datas" :key="todo.id">
          <p class="time" v-if="todo.color==1"style="color: red" >{{todo.startday}}</p>
          <p class="time"   v-else>{{todo.startday}}</p>
          <p class="timecontent">{{todo.name}}&nbsp; &nbsp;&nbsp;<span @click="edit(index)"><Icon type="edit" ></Icon></span> &nbsp;&nbsp;<span @click="remove(index)"><Icon type="ios-close-outline"></Icon></span></p>
        </TimelineItem>
      </Timeline>
    </div>
    <eventmarketingholidayadd ref="add"></eventmarketingholidayadd>
    <eventmarketingholidaysave ref="save"  :form="editinfo"></eventmarketingholidaysave>
  </div>
</template>
<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';
    import eventmarketingholidayadd from './add.vue';
    import eventmarketingholidaysave from './save.vue';
  export default {
    data() {
      return {
        datas: [
        ],
        editinfo: {},
      }
    },
    components: {eventmarketingholidayadd,eventmarketingholidaysave},
    created() {
      this.getData();
    },
    methods: {
      getData() {
        this.apiGet('sys/eventmarketholiday').then((data) => {
          this.handelResponse(data, (data, msg) => {
            this.datas = data
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (data) => {
          this.$Message.error('网络异常，请稍后重试');
        })
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
    computed: {},
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
  }
</style>

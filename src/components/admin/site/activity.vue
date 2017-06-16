<template>
  <Modal v-model="modal2" width="460">
    <p slot="header" style="color:dodgerblue;text-align:center;font-size: 18px;">
      <Icon type="flag"></Icon>
      <span>活动主题列表</span>
    </p>
    <div style="text-align:center">
      <Table border :columns="columns" :data="datas"></Table>
    </div>
    <div slot="footer">
    </div>
  </Modal>
</template>

<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';
  export default{
    data() {
      return {
        modal2: false,
        modal_loading: false,
      }
    },
    computed: {
      columns() {
        let columns = [];
        columns.push({
          title: '模板id',
          key: 'id',
          sortable: true
        });
        columns.push({
          title: '模板名称',
          key: 'name',
          sortable: true
        })
        columns.push({
          title: '是否同步',
          key: 'issync',
          sortable: true
        })
        columns.push(
          {
            title: '操作',
            key: 'action',
            align: 'center',
            fixed: 'right',
            render (row, column, index) {
              return `<i-button type="primary" size="small" @click="sendTemp(${$index})">sdfsd</i-button>`;
            }
          })
//        columns.push({
//          title:'操作',
//          key:'action',
//          render(row,column){
//              return `<i-button type="primary" size="small" @click="sendTemp(${row.id})">sdfsd</i-button>`;
//          }
//        })
        return columns;
      }
    },
    methods: {
      sendTemp(index){
        alert(index)
      },
    },
    props: {
      sid: Number,
      datas: {
        default: {}
      }
    },
    mixins: [http]
  }

</script>
<style>


</style>

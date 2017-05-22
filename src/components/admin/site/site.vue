<template>
  <div>
    <div class="top">
     站点管理:
      <Input v-model="site_name" placeholder="站点名字" style="width:300px;"></Input>
      <Button type="primary" @click="queryData">查询</Button>
      <Button type="success" @click="add">添加</Button>
    </div>
    <div class="content" style="margin-top:10px;">
      <Table :context="self" :border="border" :stripe="stripe" :show-header="showheader"
             :size="size" :data="datas" :columns="tableColumns" style="width: 100%">
      </Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="total" :current="current" @on-change="changePage" @on-page-size-change="changePageSize"
                show-total
                show-elevator show-sizer></Page>
        </div>
      </div>
    </div>
    <siteadd ref="add"   :domainlist="domainlist"   :userlist="userlist"  :hotline="hotline"   :sitetype="sitetype" :temptype="temptype" :menutype="menutype"></siteadd>
    <sitesave ref="save" :domainlist="domainlist"   :userlist="userlist" :hotline="hotline"   :sitetype="sitetype" :temptype="temptype" :menutype="menutype" :form="editinfo" ></sitesave>
  </div>
</template>

<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';
  import siteadd from './add.vue';
  import sitesave from './save.vue';
  export default {
    data () {
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
        site_name: '',
        datas: [],
        editinfo: {},
        menutype:[],
        temptype:[],
        sitetype:[],
        hotline:[],
        domainlist:[],
        userlist:[]
      }
    },
    components: {siteadd,sitesave},
    created () {
      this.getData();
      this.getMenuType((data) => {
        this.menutype = data
      });
      this.getTempType((data) => {
        this.temptype = data
      });
      this.getSiteType((data) => {
        this.sitetype = data
      });
      this.getHotline((data) => {
        this.hotline = data
      });
      this.getDomain((data) => {
        this.domainlist = data
      });
      this.getUserType((data) => {
        this.userlist = data
      });

    },
    methods: {
      getData() {
        let data = {
          params: {
            page: this.page,
            rows: this.rows,
            site_name: this.site_name
          }
        }
        this.apiGet('Site', data).then((data) => {
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
      getMenuType(func) {
        this.apiGet('menu/getMenu').then((res) => {
          this.handelResponse(res, (data, msg) => {
            func(data)
          }, (data, msg) => {
            this.$Message.error('没有获取到');
          })
        }, (res) => {
          //处理错误信息
          this.$Message.error('网络异常，请稍后重试。');
        });
      },

    getDomain(func) {
      this.apiGet('domain/getDomain').then((res) => {
        this.handelResponse(res, (data, msg) => {
          func(data)
        }, (data, msg) => {
          this.$Message.error('没有获取到');
        })
      }, (res) => {
        //处理错误信息
        this.$Message.error('网络异常，请稍后重试。');
      });
    },
      getSiteType(func) {
        this.apiGet('sitetype/getSiteType').then((res) => {
          this.handelResponse(res, (data, msg) => {
            func(data)
          }, (data, msg) => {
            this.$Message.error('没有获取到');
          })
        }, (res) => {
          //处理错误信息
          this.$Message.error('网络异常，请稍后重试。');
        });
      },
      getUserType(func) {
        this.apiGet('siteuser/getUsers').then((res) => {
          this.handelResponse(res, (data, msg) => {
            func(data)
          }, (data, msg) => {
            this.$Message.error('没有获取到');
          })
        }, (res) => {
          //处理错误信息
          this.$Message.error('网络异常，请稍后重试。');
        });
      },

      getTempType(func) {
        this.apiGet('template/getTemplate').then((res) => {
          this.handelResponse(res, (data, msg) => {
            func(data)
          }, (data, msg) => {
            this.$Message.error('没有获取到');
          })
        }, (res) => {
          //处理错误信息
          this.$Message.error('网络异常，请稍后重试。');
        });
      },
      getHotline(func) {
        this.apiGet('contactway/getContactway').then((res) => {
          this.handelResponse(res, (data, msg) => {
            func(data)
          }, (data, msg) => {
            this.$Message.error('没有获取到');
          })
        }, (res) => {
          //处理错误信息
          this.$Message.error('网络异常，请稍后重试。');
        });
      },
      changePage(page){
        this.page = page;
        this.getData();
      },
      changePageSize(pagesize){
        this.rows = pagesize;
        this.getData();
      },
      queryData(){
        this.getData();
      },
      add(){
        this.$refs.add.modal = true
      },
      edit(index){
        let editid = this.datas[index].id
        this.apiGet('site/' + editid).then((res) => {
          this.handelResponse(res, (data, msg) => {
            this.editinfo = data
            let tempNUmber=[];
            this.editinfo.menu.split(",").map(function(key){
              tempNUmber.push(Number(key))
            })
            this.editinfo.menu=tempNUmber
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
      changeStatus(index, main_site){
        //需要删除确认
        let id = this.datas[index].id
        let _this = this
        let data = {
          'main_site': main_site,
           id:id
        }
        if(data.main_site == 20){
          this.$Modal.confirm({
            title: '设为主站',
            content: '您确定设为主站?',
            okText: '设为主站',
            cancelText: '取消',
            onOk: (index) => {
              _this.apiPost('Site/setMainSite', data).then((res) => {
                _this.handelResponse(res, (data, msg) => {
                  _this.getData();
                  _this.$Message.success(msg);
                }, (data, msg) => {
                  _this.$Message.error(msg);
                })
              }, (res) => {
                //处理错误信息
                _this.$Message.error('网络异常，请稍后重试。');
              })
            },
            onCancel: () => {
              return false
            }
          })
        }else if(data.main_site == 10){
           this.$Modal.confirm({
            title: '确认取消',
            content: '您确定取消主站?',
            okText: '确认',
            cancelText: '取消',
            onOk: (index) => {
              _this.apiPost('Site/setMainSite', data).then((res) => {
                _this.handelResponse(res, (data, msg) => {
                  _this.getData();
                  _this.$Message.success(msg);
                }, (data, msg) => {
                  _this.$Message.error(msg);
                })
              }, (res) => {
                //处理错误信息
                _this.$Message.error('网络异常，请稍后重试。');
              })
            },
            onCancel: () => {
              return false
            }
          })
        }


      },
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
          title: '名称',
          key: 'site_name',
          sortable: true
        });
        columns.push({
          title: '网站分类',
          key: 'site_type',
          sortable: true
        });
        columns.push({
          title: '域名',
          key: 'domain',
          sortable: true
        });

        columns.push(
          {
            title: '操作',
            key: 'action',
//            width: 150,
            align: 'center',
            fixed: 'right',
            render (row, column, index) {
              var btn = `<i-button type="error" size="small" @click="changeStatus(${index},'20')">设为主站</i-button>`;
              if (row.main_site == '20') {
                //20 表示禁用 按钮应该为启用
                btn = `<i-button type="primary" size="small" @click="changeStatus(${index},'10')">取消</i-button>`;
              }
              return `<i-button type="success" size="small" @click="edit(${index})">修改</i-button> ` + btn;
            }
          }
        );
        return columns;
      }
    },
    mixins: [http]
  }
</script>

<template>
  <div>
    <div class="top">
      站点管理:
      <Input v-model="site_name" placeholder="站点名字" style="width:200px;"></Input>
      <Input v-model="url" placeholder="url" style="width:200px;"></Input>
      <Select v-model="site_type_id" style="width:200px;" placeholder="根据站点分类查询" label-in-value filterable clearable>
        <Option v-for="item in sitetype" :value="item.id" :label="item.text" :key="item">
          {{ item.text }}
        </Option>
      </Select>
      <Button type="primary" @click="queryData">查询</Button>
      <Button type="success" @click="add">添加</Button>
    </div>
    <div class="content" style="margin-top:10px;">
      <div style="width: 90%;margin: 0px auto">
        <Row>
          <Col span="6" v-for="(item,index) in datas" :key="index">
          <div class="siteborder">
            <div class="sitewidth"
                 :style=formatter_str(index)
            >
              <!--<img src="" alt="">-->

              <!--style=";"-->
              <div class="siteclass"
              >
                <p>{{item.site_name}}</p>
                <p><a :href="item.url" target="_blank">{{item.url}}</a></p>
              </div>
            </div>
            <div class="sitebottom">
              <ButtonGroup>
                <Button size="small"  @click="edit(index)" type="primary">修改</Button>
                <Button size="small" @click="generateStatic(item.id)" type="info">静态化</Button>
                <Button size="small" @click="sendTemp(item.id)" type="warning">发送模板</Button>
                <Button size="small" type="success">其他操作</Button>
              </ButtonGroup>
            </div>
          </div>
          </Col>
        </Row>
      </div>
      <br>

      <Table :context="self" :border="border" :stripe="stripe" :show-header="showheader"
             :size="size" :data="datas" :columns="tableColumns" style="width: 100%">
      </Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="total" :current="current" @on-change="changePage" @on-page-size-change="changePageSize"
                show-total
                show-elevator>
          </Page>
        </div>
      </div>
    </div>
    <siteadd ref="add" :code="code" :link="link" :domainlist="domainlist" :keyword="keyword" :userlist="userlist"
             :hotline="hotline"
             :sitetype="sitetype" :temptype="temptype" :menutype="menutype" :mobileSite="mobileSite"></siteadd>
    <sitesave ref="save" :code="code" :link="link" :domainlist="domainlist" :keyword="keyword" :userlist="userlist"
              :hotline="hotline"
              :sitetype="sitetype" :temptype="temptype" :menutype="menutype" :form="editinfo"
              :mobileSite="mobileSite"></sitesave>
    <ftpsave ref="ftpsave" :ftp_id="ftp_id" :form="ftp_info"></ftpsave>
    <cdnsave ref="cdnsave" :cdn_id="ftp_id" :form="cdn_info"></cdnsave>
    <win ref="windows" :genaraterId="genarate_id"></win>
    <Activity ref="activity" :datas="activity_data" :sid="site_id"></Activity>
  </div>
</template>

<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';
  import siteadd from './add.vue';
  import sitesave from './save.vue';
  import ftpsave from './ftp.vue';
  import cdnsave from './cdn.vue';
  import win from './window.vue';
  import Activity from './activity.vue';

  export default {
    data() {
      return {
        modal_loading: false,
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
        menutype: [],
        temptype: [],
        sitetype: [],
        hotline: [],
        domainlist: [],
        userlist: [],
        keyword: [],
        link: [],
        ftp_id: 0,
        ftp_info: {},
        cdn_info: {},
        mobileSite: [],
        code: [],
        genarate_id: 0,
        site_id: 0,
        activity_data: [],
        site_type_id: '',
        url: '',
        backgroundclass:[
            "linear-gradient(45deg, rgb(252, 54, 253) 0%, rgb(93, 63, 218) 100%)",
            "linear-gradient(45deg, rgb(248, 240, 35) 0%, rgb(5, 174, 53) 100%)",
            "url(../../../../src/assets/sitebackimg/blue.jpg) repeat right center;"
        ]
      }
    },
    components: {siteadd, sitesave, ftpsave, cdnsave, win, Activity},
    created() {
//      this.getCode();
      this.getData();
      this.getCommontype()

    },
    methods: {
      formatter_str(index) {
        return "background-image:linear-gradient(45deg, rgb(252, 54, 253) 0%, rgb(93, 63, 218) 100%)";
      },
      init() {
//        this.getCode();
        this.getData();

      },
      sendActivity(id) {
        this.site_id = id
        this.getActivity(id)
      },
      getActivity(id) {
        this.apiGet('Site/getActivily/' + id).then((res) => {
          this.handelResponse(res, (data, msg) => {
            this.activity_data = data
            this.$refs.activity.modal2 = true;
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (res) => {
          //处理错误信息
          this.$Message.error('网络异常，请稍后重试。');
        })
      },
      getCommontype() {
        this.apiGet('commontype').then((res) => {
          this.handelResponse(res, (data, msg) => {
            this.code = data.code;
            this.menutype = data.menutype
            this.temptype = data.temptype
            this.sitetype = data.sitetype
            this.hotline = data.hotline
            this.domainlist = data.domainlist
            this.userlist = data.userlist
            this.keyword = data.keyword
            this.link = data.link
            this.mobileSite = data.mobileSite;
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (res) => {
          //处理错误信息
          this.$Message.error('网络异常，请稍后重试。');
        })
      },
      sendTemp(index) {
        let _this = this
        this.$Modal.confirm({
          title: '确认',
          content: '您确定发送?发送会替换已有的模板',
          okText: '确认',
          cancelText: '取消',
          onOk: () => {
            _this.apiGet('Site/ignoreFrontend/1' + "/" + index + "/template").then((res) => {
              _this.handelResponse(res, (data, msg) => {
                _this.getData()
                _this.$Message.success(msg);
              }, (data, msg) => {
                _this.modal_loading = false;
                _this.$Message.error(msg, 5);
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
      },
      removeCache(index) {
        let linkid = this.datas[index].id
        this.apiGet('Site/siteGetCurl/' + linkid + "/clearCache").then((res) => {
          this.handelResponse(res, (data, msg) => {
            this.getData()
            this.$Message.success(msg);
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (res) => {
          //处理错误信息
          this.$Message.error('网络异常，请稍后重试。');
        })
      },
      getMobileSite() {
        this.apiGet('Site/mobileSite').then((res) => {
          this.handelResponse(res, (data, msg) => {
            this.mobileSite = data;
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (res) => {
          //处理错误信息
          this.$Message.error('网络异常，请稍后重试。');
        })
      },
      getData() {
        let data = {
          params: {
            page: this.page,
            rows: this.rows,
            site_name: this.site_name,
            site_type_id: this.site_type_id,
            url: this.url
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
        this.apiGet('site/' + editid).then((res) => {
          this.handelResponse(res, (data, msg) => {
            this.editinfo = data
            let tempNUmber = [];
            let keyAar = [];
            let link_id = [];
            let code = [];
            if (this.editinfo.menu !== "") {
              this.editinfo.menu.split(",").map(function (key) {
                tempNUmber.push(Number(key))
              })
            }
            if (this.editinfo.keyword_ids !== "") {
              this.editinfo.keyword_ids.split(",").map(function (key) {
                keyAar.push(Number(key))
              })
            }
            if (this.editinfo.link_id !== "") {
              this.editinfo.link_id.split(",").map(function (key) {
                link_id.push(Number(key))
              })
            }
            if (this.editinfo.public_code !== "") {
              this.editinfo.public_code.split(",").map(function (key) {
                code.push(Number(key))
              })
            }
            this.editinfo.menu = tempNUmber
            this.editinfo.keyword_ids = keyAar
            this.editinfo.link_id = link_id
            this.editinfo.public_code = code
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
      changeStatus(index, main_site) {
        //需要删除确认
        let id = this.datas[index].id
        let _this = this
        let data = {
          'main_site': main_site,
          id: id
        }
        if (data.main_site == 20) {
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
        } else if (data.main_site == 10) {
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
      ftpInfo(index) {
        this.ftp_id = this.datas[index].id;
        this.ftp_info.ftp_place = this.datas[index].ftp_place
        this.ftp_info.ftp_host = this.datas[index].ftp_host
        this.ftp_info.ftp_user = this.datas[index].ftp_user
        this.ftp_info.ftp_pwd = this.datas[index].ftp_pwd
        this.$refs.ftpsave.modal = true
      },
      changeCdn(index) {
        this.ftp_id = this.datas[index].id;
        this.cdn_info.cdn_type = this.datas[index].cdn_type
        this.cdn_info.cdn_ip = this.datas[index].cdn_ip
        this.$refs.cdnsave.modal = true
      },
      generateStatic(index) {
        this.genarate_id = index;
        this.$refs.windows.modal2 = true
      }
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
        columns.push({
          title: '站点id',
          key: 'id',
          sortable: true
        });

        columns.push({
          title: '名称',
          key: 'site_name',
          sortable: true
        });
        columns.push({
          title: '网站分类',
          key: 'site_type_name',
          sortable: true
        });
        columns.push({
          title: 'url',
          key: 'url',
          sortable: true,
          render(row, index) {
            return '<a href="' + row.url + '" target="_blank">' + row.url + '</a>';
          }
        });
        columns.push({
          title: '模板状态',
          align: 'center',
          render(row, index) {
            if (row.template_status == 10) {
              var type = `<Icon type="checkmark-round" style="color:#2db7f5;font-size: 18px"></Icon>`;
              return type;
            } else {
              var type = `<Icon type="close-round" style="color:red;font-size: 18px"></Icon>`;
              return type;
            }

          },
          sortable: true
        });
        columns.push(
          {
            title: '操作',
            key: 'action',
            width: 580,
            align: 'center',
            fixed: 'right',
            render(row, column, index) {
              var btn = `<i-button type="error" size="small" @click="changeStatus(${index},'20')">设为主站</i-button>`;
              if (row.main_site == '20') {
                //20 表示禁用 按钮应该为启用
                btn = `<i-button type="primary" size="small" @click="changeStatus(${index},'10')">取消主站</i-button>`;
              }
              return `<i-button type="info" size="small" @click="changeCdn(${index})">cdn信息</i-button>&nbsp;<i-button type="info" size="small" @click="ftpInfo(${index})">FTP信息</i-button>&nbsp;<i-button type="success" size="small" @click="edit(${index})">修改</i-button>&nbsp;<i-button type="info" size="small" @click="sendTemp(${row.id})">发送模板</i-button> &nbsp;<i-button type="info" size="small" @click="sendActivity(${row.id})">发送主题模板</i-button> &nbsp;<i-button type="warning" @click="removeCache(${index})"size="small">清除缓存</i-button>&nbsp;` + btn + `&nbsp;<i-button type="warning" @click="generateStatic(${row.id})" size="small">生成静态</i-button>`;
            }
          }
        );
        return columns;
      }
    },
    mixins: [http]
  }
</script>
<style>
  .siteborder {
    width: 100%;
    max-width: 281px;
    border: 2px solid #e9eaec;
  }

  .siteclass {
    text-align: center;
    width: 100%;
    color: #ffffff;
    font-size: 20px;
    font-weight: bold;
    padding-top: 60px
  }

  .sitebottom {
    padding: 5px;
    text-align: center;
  }
  .sitewidth{
    height:203px;
  }
</style>

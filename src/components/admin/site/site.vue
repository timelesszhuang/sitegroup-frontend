<template>
  <div>
    <div class="top" style="padding-left: 5px;margin-left: 5px;margin-right: 5px">
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
      <div style="width:90%;margin: 0px auto">
        <Row>
          <Col span="6" v-for="(item,index) in datas" :key="index">
          <div class="siteborder">
            <div class="sitewidth" :style=choose_bgimg(index)>
              <div class="siteclass">
                <p :title=formatter_title(item)>{{item.site_name}}</p>
                <p><a :href="item.url" target="_blank">{{item.url}}</a></p>
              </div>
            </div>
            <div class="sitebottom">
              <ButtonGroup>
                <Button size="small" @click="edit(index)" type="primary">修改</Button>
                <Button size="small" @click="generateStatic(item.id)" type="info">静态化</Button>
                <Button size="small" @click="sendTemp(item.id)" type="warning">发送模板</Button>
                <Button size="small" @click="other(item)" type="success">其他操作</Button>
              </ButtonGroup>
            </div>
          </div>
          </Col>
        </Row>
      </div>
      <br>
    </div>
    <siteadd ref="add" :code="code" :logodata="logodata" :icodata="icodata" :link="link" :domainlist="domainlist" :keyword="keyword" :userlist="userlist"
             :hotline="hotline"
             :sitetype="sitetype"  :temptype="temptype" :menutype="menutype" :mobileSite="mobileSite"></siteadd>
    <sitesave ref="save" :code="code" :logodata="logodata" :icodata="icodata"  :link="link" :domainlist="domainlist" :keyword="keyword" :userlist="userlist"
              :hotline="hotline"
              :sitetype="sitetype" :temptype="temptype" :menutype="menutype" :form="editinfo"
              :mobileSite="mobileSite"></sitesave>
    <ftpsave ref="ftpsave" :ftp_id="ftp_id" :form="ftp_info"></ftpsave>
    <cdnsave ref="cdnsave" :cdn_id="ftp_id" :form="cdn_info"></cdnsave>
    <win ref="windows" :genaraterId="genarate_id"></win>
    <other ref="other" :otherArr="others"></other>
    <Activity ref="activity" :datas="activity_data" :sid="site_id"></Activity>
    <activepush  :ping_id="ping_id" :form="ping" ref="activepush" ></activepush>
  </div>
</template>

<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';
  import siteadd from './add.vue';
  import sitesave from './save.vue';
  import ftpsave from './ftp.vue';
  import cdnsave from './cdn.vue';
  import win from './window.vue';
  import other from './other.vue';
  import Activity from './activity.vue';
  import activepush from './activepush.vue'

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
        others: {},
        site_id: 0,
        activity_data: [],
        site_type_id: '',
        logodata:[],
        icodata:[],
        url: '',
        ping:{},
        ping_id :0,

      }
    },
    components: {siteadd, sitesave, ftpsave, cdnsave, win, Activity, other,activepush},
    created() {
      this.getData();
      this.getCommontype();
      this.getLogo();
      this.getIco();


    },
    methods: {
      formatter_title(str) {
        return str.id + str.site_name + str.site_type_name
      },
      choose_bgimg(index) {
        let background = this.$store.state.background.backgroundcolor;
        index = index % background.length
        return background[index]
      },
      init() {
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
      getLogo(){
        this.apiGet('admin/getsitelogolist').then((res) => {
          this.handelResponse(res, (data, msg) => {
            this.logodata = data
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (res) => {
          //处理错误信息
          this.$Message.error('网络异常，请稍后重试。');
        })

      },
      getIco(){
        this.apiGet('admin/getsiteicolist').then((res) => {
          this.handelResponse(res, (data, msg) => {
            this.icodata = data
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
        let linkid = index.id
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
            console.log(this.editinfo.menu)
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
            console.log(this.editinfo)
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
        let id = index.id
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
        this.ftp_id = index.id;
        this.ftp_info.ftp_place = index.ftp_place
        this.ftp_info.ftp_host = index.ftp_host
        this.ftp_info.ftp_user = index.ftp_user
        this.ftp_info.ftp_pwd = index.ftp_pwd
        this.$refs.ftpsave.modal = true
        this.$refs.other.modal2 = false
      },
      changeCdn(index) {
        this.ftp_id = index.id;
        this.cdn_info.cdn_type = index.cdn_type
        this.cdn_info.cdn_ip = index.cdn_ip
        this.$refs.cdnsave.modal = true
      },
      activepush(index){
        this.ping_id = index.id;
        this.ping.pingbaiduurl = index.pingbaiduurl
        this.$refs.activepush.modal= true;
      },
      generateStatic(index) {
        this.genarate_id = index;
        this.$refs.windows.modal2 = true
      },
      other(index) {
        this.others = index
        this.$refs.other.modal2 = true
      }
    },
    computed: {},
    mixins: [http]
  }
</script>
<style>
  .siteborder {
    width: 100%;
    max-width: 281px;
    border: 2px solid #07d0d3;
    margin: 5px;
    padding: 3px;
  }

  .siteclass {
    text-align: center;
    width: 100%;
    color: #ffffff;
    font-size: 20px;
    font-weight: bold;
    padding-top: 60px
  }

  .siteclass a {
    color: #ffffff;
    font-size: 18px;
  }

  .sitebottom {
    padding: 5px;
    text-align: center;
  }

  .sitewidth {
    height: 203px;
  }
</style>

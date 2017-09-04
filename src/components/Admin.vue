<style scoped>
  .layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    height: 100%;
  }

  .layout-logo-left {
    width:100%;
    background-color: #ffffff;
    height: 60px;
  }

  .layout-breadcrumb {
    padding: 10px 15px 0;
  }

  .layout-content {
    min-height: 63%;
    margin: 15px;
    background: #fff;
    border-radius: 4px;
    flex: 1;
  }

  .layout-content-main {
    padding: 10px;
  }

  .ivu-menu-dark {
    background: #009ca2;
    color: #ffffff;
  }

  .ivu-row-flex {
    height: 100%;
  }

  /**图标颜色改为 白色*/
  .ivu-menu .ivu-icon {
    color: #ffffff;
  }

  .ivu-menu-vertical .ivu-menu-submenu-title-icon {
    color: #ffffff;
  }

  /** 左侧全部都是空*/
  .layout-menu-left {
    background: #009ca2;
  }

  /*字体改为白色*/
  .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item, .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title {
    color: #ffffff;
  }

  .ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened .ivu-menu-submenu-title {
    background: #ffffff;
  }

  .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu {
    background: #16b8be !important;
  }

  .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active, .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active:hover {
    border-right: none;
    color: #fff;
    background-color: #009ca2 !important;
  }

  .layout-header {
    width:84%;
    float:right;
    z-index: 999;
    /*height:30px;*/
    position:fixed;
    top:0;
    left:16.7%;
    height: 60px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
  }
  /**底部版权信息*/
  .layout-copy {
    text-align: center;
    padding: 10px 0 10px;
    /*color: #9ea7b4;*/
  }

  .Site {
    display: flex;
    min-height: 100vh;
    flex-direction: column;

  }
  .ivu-breadcrumb {
    color: #999;
    font-size: 14px;
    padding-top: 3.5%;
  }
  .layout-hide-text, .layout-text {
    display: inline-block;
    width: 100%;
  }

  .parent-menu-title {
    color: #ffffff !important;
  }


</style>

<template>
  <div class="layout" :class="{'layout-hide-text': spanLeft < 4}" @click="menuClick" ref="menuClickEle">
    <Row type="flex">
      <i-col :span="spanLeft" class="layout-menu-left" style="overflow: auto;overflow-x:visible ">
        <Menu active-name="activename" theme="dark" width="auto" :open-names="opennames" accordion>
          <div class="layout-logo-left" @click="routerChange('/admin/index')">
            <img style="width: 200px" src="../../src/assets/img/logo.png" alt="乐销易创意发布平台">
          </div>
          <Submenu name="1">
            <template slot="title">
              <Icon type="ios-navigate"></Icon>
              <span class="parent-menu-title">关键词管理</span>
            </template>
            <Menu-item name="站点关键词">
              <span class="layout-text" @click="routerChange('/admin/keyword','站点关键词')">
                <Icon type="key"></Icon>
                站点关键词
              </span>
            </Menu-item>
            <Menu-item name="推荐关键词库">
              <span class="layout-text" @click="routerChange('/admin/recommendationkeyword','推荐关键词库')">
                <Icon type="ios-list-outline"></Icon>
                推荐关键词库
              </span>
            </Menu-item>
            <Menu-item name="主关键词排名">
              <span class="layout-text" @click="routerChange('/admin/mainkeyword','主关键词排名')">
                <Icon type="android-archive"></Icon>
                主关键词排名
              </span>
            </Menu-item>
          </Submenu>
          <Submenu name="8">
            <template slot="title">
              <Icon type="ios-bookmarks-outline"></Icon>
              <span class="parent-menu-title">推荐文章库</span>
            </template>
            <Menu-item name="微信公众号关键词">
              <span class="layout-text" @click="routerChange('/admin/wechatkeyword','微信公众号关键词')">
                <Icon type="key"></Icon>
                微信公众号关键词
              </span>
            </Menu-item>
            <Menu-item name="微信公众号文章">
              <span class="layout-text" @click="routerChange('/admin/wechatarticle','微信企业号文章')">
                <Icon type="ios-bookmarks"></Icon>
                微信公众号文章
              </span>
            </Menu-item>
            <Menu-item name="新闻类文章管理">
              <span class="layout-text" @click="routerChange('/admin/hotnews','新闻类文章管理')">
                <Icon type="ios-copy"></Icon>
                新闻管理
              </span>
            </Menu-item>

          </Submenu>
          <Submenu name="2">
            <template slot="title">
              <Icon type="ios-keypad"></Icon>
              <span class="parent-menu-title">文章库</span>
            </template>
            <Menu-item name="文章分类">
              <span class="layout-text" @click="routerChange('/admin/articletype','文章分类')">
                <Icon type="settings"></Icon>
                文章分类
              </span>
            </Menu-item>
            <Menu-item name="文章列表">
              <span class="layout-text" @click="routerChange('/admin/article','文章列表')">
                <Icon type="document"></Icon>
                文章列表
              </span>
            </Menu-item>
          </Submenu>
          <Submenu name="3">
            <template slot="title">
              <Icon type="scissors"></Icon>
              <span class="parent-menu-title">文章段落库</span>
            </template>
            <Menu-item name="文章段落分类">
              <span class="layout-text" @click="routerChange('/admin/scatteredtype','文章段落分类')">
                <Icon type="social-dropbox-outline"></Icon>
                文章段落分类
              </span>
            </Menu-item>
            <Menu-item name="文章段落">
              <span class="layout-text" @click="routerChange('/admin/scatteredarticle','文章段落')">
                <Icon type="social-dropbox-outline"></Icon>
                文章段落
              </span>
            </Menu-item>
            <Menu-item name="文章段落标题">
              <span class="layout-text" @click="routerChange('/admin/title','文章段落标题')">
                <Icon type="flag"></Icon>
                段落标题
              </span>
            </Menu-item>
          </Submenu>
          <Submenu name="6">
            <template slot="title">
              <Icon type="ios-navigate"></Icon>
              <span class="parent-menu-title">产品管理</span>
            </template>
            <Menu-item name="产品分类管理">
              <span class="layout-text" @click="routerChange('/admin/producttype','产品分类管理')">
                <Icon type="map"></Icon>
                产品分类管理
              </span>
            </Menu-item>
            <Menu-item name="产品管理">
              <span class="layout-text" @click="routerChange('/admin/product','产品管理')">
                <Icon type="map"></Icon>
                产品管理
              </span>
            </Menu-item>
          </Submenu>
          <Submenu name="4">
            <template slot="title">
              <span class="parent-menu-title">
                <Icon type="chatbox-working"></Icon>
                问答库
              </span>
            </template>
            <Menu-item name="问答分类">
              <span class="layout-text" @click="routerChange('/admin/questiontype','问答分类')">
                <Icon type="settings"></Icon>
                问答分类
              </span>
            </Menu-item>
            <Menu-item name="问答">
              <span class="layout-text" @click="routerChange('/admin/question','问答')">
                <Icon type="help"></Icon>
                问答
              </span>
            </Menu-item>
          </Submenu>
          <Submenu name="5">
            <template slot="title">
              <span class="parent-menu-title">
                <Icon type="briefcase"></Icon>
                站点元素设置
              </span>
            </template>
            <Menu-item name="站点栏目">
              <span class="layout-text" @click="routerChange('/admin/nav','站点栏目')">
                              <Icon type="drag"></Icon>
                站点栏目管理
              </span>
            </Menu-item>
            <Menu-item name="友情链接">
              <span class="layout-text" @click="routerChange('/admin/link','友情链接')">
                  <Icon type="drag"></Icon>
                  友情链接管理
              </span>
            </Menu-item>
            <Menu-item name="域名管理">
              <span class="layout-text" @click="routerChange('/admin/domain','域名管理')">
                <Icon type="android-globe"></Icon>
                域名管理
              </span>
            </Menu-item>
            <Menu-item name="公共代码管理">
              <span class="layout-text" @click="routerChange('/admin/code','公共代码管理')">
                <Icon type="social-javascript"></Icon>
                公共代码管理
              </span>
            </Menu-item>
            <Menu-item name="联系方式管理">
              <span class="layout-text" @click="routerChange('/admin/contactway','联系方式管理')">
                <Icon type="ios-telephone"></Icon>
                联系方式管理
              </span>
            </Menu-item>
            <Menu-item name="主题/活动创意">
              <span class="layout-text" @click="routerChange('/admin/activity','主题/活动创意')">
                <Icon type="beer"></Icon>
                主题/活动创意管理
              </span>
            </Menu-item>
            <Menu-item name="模板管理">
              <span class="layout-text" @click="routerChange('/admin/template','模板管理')">
                <Icon type="map"></Icon>
                模板管理
              </span>
            </Menu-item>
            <Menu-item name="自定义表单">
              <span class="layout-text" @click="routerChange('/admin/customeform','自定义表单')">
                <Icon type="map"></Icon>
                自定义表单
              </span>
            </Menu-item>

          </Submenu>
          <Submenu name="6">
            <template slot="title">
              <Icon type="pinpoint"></Icon>
              <span class="parent-menu-title">站点/用户管理</span>
            </template>
            <Menu-item name="站点分类">
              <span class="layout-text" @click="routerChange('/admin/sitetype','站点分类')">
                <Icon type="android-cloud-circle"></Icon>
                站点分类
              </span>
            </Menu-item>
            <Menu-item name="站点管理">
              <span class="layout-text" @click="routerChange('/admin/site','站点管理')">
                <Icon type="android-cloud-circle"></Icon>
                站点管理
              </span>
            </Menu-item>
            <Menu-item name="模板管理">
              <span class="layout-text" @click="routerChange('/admin/templatemanage','站点模板管理')">
                <Icon type="map"></Icon>
                站点模板管理
              </span>
            </Menu-item>

            <Menu-item name="SEO属性">
              <span class="layout-text" @click="routerChange('/admin/seo','SEO属性')">
                <Icon type="map"></Icon>
                搜索引擎优化管理
              </span>
            </Menu-item>
            <Menu-item name="站点静态化配置">
              <span class="layout-text" @click="routerChange('/admin/staticconfig','站点静态化配置')">
                <Icon type="android-cloud-circle"></Icon>
                站点静态化配置
              </span>
            </Menu-item>
            <Menu-item name="用户管理">
              <span class="layout-text" @click="routerChange('/admin/siteuser','用户管理')">
                <Icon type="person"></Icon>
                用户管理
              </span>
            </Menu-item>
          </Submenu>
          <Submenu name="7">
            <template slot="title">
              <span class="parent-menu-title">
                <Icon type="ios-analytics"></Icon>
                数据统计
              </span>
            </template>
            <Menu-item name="浏览量统计">
              <span class="layout-text" @click="routerChange('/admin/pv','浏览量统计')">
                <Icon type="android-cloud-circle"></Icon>
                浏览量统计
              </span>
            </Menu-item>
            <Menu-item name="浏览量展示">
              <span class="layout-text" @click="routerChange('/admin/show','浏览量展示')">
                <Icon type="android-cloud-circle"></Icon>
                浏览量展示
              </span>
            </Menu-item>
            <Menu-item name="爬虫统计">
              <span class="layout-text" @click="routerChange('/admin/crawler','爬虫统计')">
                <Icon type="android-cloud-circle"></Icon>
                爬虫统计
              </span>
            </Menu-item>
            <Menu-item name="甩单展示">
              <span class="layout-text" @click="routerChange('/admin/rejection','甩单展示')">
                <Icon type="android-cloud-circle"></Icon>
                甩单展示
              </span>
            </Menu-item>
            <Menu-item name="搜索引擎关键词统计">
              <span class="layout-text" @click="routerChange('/admin/countkeyword','搜索关键词统计')">
                <Icon type="android-cloud-circle"></Icon>
                搜索关键词统计
              </span>
            </Menu-item>
            <Menu-item name="其他统计">
              <span class="layout-text" @click="routerChange('/admin/other','其他统计')">
                <Icon type="android-cloud-circle"></Icon>
                其他统计</span>
            </Menu-item>
          </Submenu>
        </Menu>
      </i-col>
      <i-col :span="spanRight" style="overflow: auto">
        <div class="layout-header" >
          <Row type="flex" justify="end" align="middle" class="code-row-bg" >
            <Col span="17" align="left" style="cursor: pointer">
            <span class="layout-text" @click="routerChange('/admin/index')">
                <Icon type="home" style="font-size: 15px"></Icon>
                首页
            </span>
            </Col>
            <Col span="2" align="right">
            <Badge :count="count">
              <span @click="routerChange('/admin/messageLog','消息')" style="cursor:pointer;">
                <Icon type="ios-bell-outline" size="26"></Icon>
              </span>
            </Badge>
            </Col>

            <Col span="2" align="center" style="cursor: pointer">
            <span class="layout-text" @click="changePwd()">
              <Icon type="android-lock"></Icon>
              重置密码
            </span>
            </Col>
            <Col span="2" style="cursor: pointer">
            <span class="layout-text" @click="logOut()">
              <Icon type="log-out"></Icon>
              退出系统
            </span>
            </Col>
          </Row>
        </div>
        <div class="layout-breadcrumb">
          <Breadcrumb>
            <Breadcrumb-item>{{activeName}}</Breadcrumb-item>
          </Breadcrumb>
        </div>
        <div class="Site">
        <div class="layout-content" >
          <div class="layout-content-main">
            <router-view></router-view>
          </div>
        </div>
        <div class="layout-copy">
          2015-2017 &copy; 北京易至信科技有限公司
          <div>京ICP12019481号</div>
        </div>
        </div>
      </i-col>
    </Row>
    <logout ref="logout"></logout>
    <changepwd ref="changePwd"></changepwd>
  </div>
</template>
<script>
  import logout from './Account/Logout.vue';
  import changepwd from './Account/Changepwd.vue';
  import http from '../assets/js/http.js';

  export default {
    data() {
      return {
        spanLeft: 4,
        spanRight: 20,
        activeName: '',
        sysname: '',
        count: '无',
        opennames: ['1'],
      }
    },
    components: {
      changepwd,
      logout
    },

    methods: {
      menuClick(e) {

      },
      checkAlert() {
        this.apiGet('article/getErrorStatus').then((res) => {
          this.handelResponse(res, (data, msg) => {
            this.count = data;
          }, (data, msg) => {
//            this.$Message.error(msg);
          })
        }, (res) => {
          //处理错误信息
          this.$Message.error('网络异常，请稍后重试。');
        })
      },
      routerChange(path, activeName) {
        this.activeName = activeName;
        router.push(path);
      },
      changePwd() {
        this.$refs.changePwd.modal = true
      },
      logOut() {
        this.$refs.logout.modal = true
      },

      messageLog() {
        router.replace('/admin/messageLog');
      }
    },
    //created 是函数
    created() {
      let _this = this;
      _this.checkAlert();
      setInterval(function () {
        _this.checkAlert();
      }, 60000);
//      console.log(Lockr.get('userInfo'));
      if (!Lockr.get('userInfo')) {
        this.$Message.error("请先登录");
        //表示没有登陆
        setTimeout(() => {
          router.replace('/')
        }, 1500)
        return
      }

      this.sysname = Lockr.get('userInfo').node_name;
      document.title = this.sysname
      let rememberKey = Lockr.get('rememberKey')
      let user_id = Lockr.get('user_id')
      let type = Lockr.get('type');
    },
    mixins: [http]
  }
</script>

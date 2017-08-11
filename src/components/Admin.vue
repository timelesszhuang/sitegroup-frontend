<style scoped>
  .layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    height: 100%;
  }

  .layout-breadcrumb {
    padding: 10px 15px 0;
  }

  .layout-content {
    min-height: 63%;
    height: auto;
    margin: 15px;
    background: #fff;
    border-radius: 4px;
  }

  .layout-content-main {
    padding: 10px;
  }

  .ivu-row-flex {
    height: 100%;
  }

  .layout-copy {
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
    /*position:relative;*/
    margin-top: 5%;
    /*left:0%;*/
  }

  .layout-menu-left {
    background: #464c5b;
  }

  .layout-header {
    height: 60px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
  }

  .layout-logo-left {
    width: 90%;
    height: 30px;
    border-radius: 3px;
    padding-top: 10px;
    margin: 0px auto;
  }

</style>

<template>
  <div class="layout" @click="menuClick" ref="menuClickEle">
    <Row type="flex">
      <i-col span="4" class="layout-menu-left" style="min-width:170px">
        <Menu active-name="activename" theme="dark" width="auto" :open-names="opennames" accordion>
          <div class="layout-logo-left" @click="routerChange('/admin/index')"
               style="width: 150px;height: 58px;margin: 0 auto;">
            <img style="" src="../../src/assets/img/logo.png" alt="">
          </div>
          <Submenu name="1">
            <template slot="title">
              <Icon type="ios-navigate"></Icon>
              关键词管理
            </template>
            <Menu-item name="站点关键词">
              <Icon type="key"></Icon>
              <span class="layout-text" @click="routerChange('/admin/keyword','站点关键词')">站点关键词</span>
            </Menu-item>
            <Menu-item name="推荐关键词库">
              <Icon type="ios-list-outline"></Icon>
              <span class="layout-text" @click="routerChange('/admin/recommendationkeyword','推荐关键词库')">推荐关键词库</span>
            </Menu-item>
            <Menu-item name="主关键词排名">
              <Icon type="android-archive"></Icon>
              <span class="layout-text" @click="routerChange('/admin/mainkeyword','主关键词排名')">主关键词排名</span>
            </Menu-item>
          </Submenu>
          <Submenu name="8">
            <template slot="title">
              <Icon type="ios-bookmarks-outline"></Icon>
              推荐文章库
            </template>
            <Menu-item name="微信公众号关键词">
              <Icon type="key"></Icon>
              <span class="layout-text" @click="routerChange('/admin/wechatkeyword','微信公众号关键词')">微信公众号关键词</span>
            </Menu-item>
            <Menu-item name="微信公众号文章">
              <Icon type="ios-bookmarks"></Icon>
              <span class="layout-text" @click="routerChange('/admin/wechatarticle','微信企业号文章')">微信公众号文章</span>
            </Menu-item>
            <Menu-item name="新闻类文章管理">
              <Icon type="ios-copy"></Icon>
              <span class="layout-text" @click="routerChange('/admin/hotnews','新闻类文章管理')">新闻管理</span>
            </Menu-item>

          </Submenu>
          <Submenu name="2">
            <template slot="title">
              <Icon type="ios-keypad"></Icon>
              文章库
            </template>
            <Menu-item name="文章分类">
              <Icon type="settings"></Icon>
              <span class="layout-text" @click="routerChange('/admin/articletype','文章分类')">文章分类</span>
            </Menu-item>
            <Menu-item name="文章列表">
              <Icon type="document"></Icon>
              <span class="layout-text" @click="routerChange('/admin/article','文章列表')">文章列表</span>
            </Menu-item>
          </Submenu>
          <Submenu name="3">
            <template slot="title">
              <Icon type="scissors"></Icon>
              文章段落库
            </template>
            <Menu-item name="文章段落分类">
              <Icon type="social-dropbox-outline"></Icon>
              <span class="layout-text" @click="routerChange('/admin/scatteredtype','文章段落分类')">文章段落分类</span>
            </Menu-item>
            <Menu-item name="文章段落">
              <Icon type="social-dropbox-outline"></Icon>
              <span class="layout-text" @click="routerChange('/admin/scatteredarticle','文章段落')">文章段落</span>
            </Menu-item>
            <Menu-item name="文章段落标题">
              <Icon type="flag"></Icon>
              <span class="layout-text" @click="routerChange('/admin/title','文章段落标题')">段落标题</span>
            </Menu-item>
          </Submenu>
          <Submenu name="4">
            <template slot="title">
              <Icon type="chatbox-working"></Icon>
              问答库
            </template>
            <Menu-item name="问答分类">
              <Icon type="settings"></Icon>
              <span class="layout-text" @click="routerChange('/admin/questiontype','问答分类')">问答分类</span>
            </Menu-item>
            <Menu-item name="问答">
              <Icon type="help"></Icon>
              <span class="layout-text" @click="routerChange('/admin/question','问答')">问答</span>
            </Menu-item>
          </Submenu>
          <Submenu name="5">
            <template slot="title">
              <Icon type="briefcase"></Icon>
              站点元素设置
            </template>
            <Menu-item name="">
              <Icon type="drag"></Icon>
              <span class="layout-text" @click="routerChange('/admin/navigation','站点栏目')">站点栏目管理</span>
            </Menu-item>
            <Menu-item name="友情链接">
              <Icon type="drag"></Icon>
              <span class="layout-text" @click="routerChange('/admin/link','友情链接')">友情链接管理</span>
            </Menu-item>
            <Menu-item name="域名管理">
              <Icon type="android-globe"></Icon>
              <span class="layout-text" @click="routerChange('/admin/domain','域名管理')">域名管理</span>
            </Menu-item>
            <Menu-item name="公共代码管理">
              <Icon type="social-javascript"></Icon>
              <span class="layout-text" @click="routerChange('/admin/code','公共代码管理')">公共代码管理</span>
            </Menu-item>
            <Menu-item name="联系方式管理">
              <Icon type="ios-telephone"></Icon>
              <span class="layout-text" @click="routerChange('/admin/contactway','联系方式管理')">联系方式管理</span>
            </Menu-item>
            <Menu-item name="主题/活动创意">
              <Icon type="beer"></Icon>
              <span class="layout-text" @click="routerChange('/admin/activity','主题/活动创意')">主题/活动创意管理</span>
            </Menu-item>
            <Menu-item name="模板管理">
              <Icon type="map"></Icon>
              <span class="layout-text" @click="routerChange('/admin/template','模板管理')">模板管理</span>
            </Menu-item>
          </Submenu>
          <Submenu name="6">
            <template slot="title">
              <Icon type="pinpoint"></Icon>
              站点/用户管理
            </template>
            <Menu-item name="站点分类">
              <Icon type="android-cloud-circle"></Icon>
              <span class="layout-text" @click="routerChange('/admin/sitetype','站点分类')">站点分类</span>
            </Menu-item>
            <Menu-item name="站点管理">
              <Icon type="android-cloud-circle"></Icon>
              <span class="layout-text" @click="routerChange('/admin/site','站点管理')">站点管理</span>
            </Menu-item>
            <Menu-item name="模板管理">
              <Icon type="map"></Icon>
              <span class="layout-text" @click="routerChange('/admin/templatemanage','站点模板管理')">站点模板管理</span>
            </Menu-item>

            <Menu-item name="SEO属性">
              <Icon type="map"></Icon>
              <span class="layout-text" @click="routerChange('/admin/seo','SEO属性')">搜索引擎优化管理</span>
            </Menu-item>
            <Menu-item name="站点静态化配置">
              <Icon type="android-cloud-circle"></Icon>
              <span class="layout-text" @click="routerChange('/admin/staticconfig','站点静态化配置')">站点静态化配置</span>
            </Menu-item>
            <Menu-item name="用户管理">
              <Icon type="person"></Icon>
              <span class="layout-text" @click="routerChange('/admin/siteuser','用户管理')">用户管理</span>
            </Menu-item>
          </Submenu>
          <Submenu name="7">
            <template slot="title">
              <Icon type="ios-analytics"></Icon>
              数据统计
            </template>
            <Menu-item name="浏览量统计">
              <Icon type="android-cloud-circle"></Icon>
              <span class="layout-text" @click="routerChange('/admin/pv','浏览量统计')">浏览量统计</span>
            </Menu-item>
            <Menu-item name="浏览量展示">
              <Icon type="android-cloud-circle"></Icon>
              <span class="layout-text" @click="routerChange('/admin/show','浏览量展示')">浏览量展示</span>
            </Menu-item>
            <Menu-item name="爬虫统计">
              <Icon type="android-cloud-circle"></Icon>
              <span class="layout-text" @click="routerChange('/admin/crawler','爬虫统计')">爬虫统计</span>
            </Menu-item>
            <Menu-item name="甩单展示">
              <Icon type="android-cloud-circle"></Icon>
              <span class="layout-text" @click="routerChange('/admin/rejection','甩单展示')">甩单展示</span>
            </Menu-item>
            <Menu-item name="搜索引擎关键词统计">
              <Icon type="android-cloud-circle"></Icon>
              <span class="layout-text" @click="routerChange('/admin/countkeyword','搜索关键词统计')">搜索关键词统计</span>
            </Menu-item>
            <Menu-item name="其他统计">
              <Icon type="android-cloud-circle"></Icon>
              <span class="layout-text" @click="routerChange('/admin/other','其他统计')">其他统计</span>
            </Menu-item>
          </Submenu>
        </Menu>
      </i-col>
      <i-col span="20">
        <div class="layout-header">
          <Row type="flex" justify="end" align="middle" class="code-row-bg">
            <Col span="2" align="right">
            <Badge :count="count">
              <span @click="routerChange('/admin/messageLog','消息')" style="cursor:pointer;">
                <Icon type="ios-bell-outline" size="26"></Icon>
              </span>
            </Badge>
            </Col>
            <Col span="2" align="right" style="cursor: pointer">
            <Icon type="home" style="font-size: 15px" @click="routerChange('/admin/index')"></Icon>
            <span class="layout-text" style="font-family:Microsoft YaHei;font-size: 15px;"
                  @click="routerChange('/admin/index')">首页</span>
            </Col>
            <Col span="2" align="center" style="cursor: pointer">
            <Icon type="android-lock" @click="changePwd()"></Icon>
            <span class="layout-text" @click="changePwd()">重置密码</span>
            </Col>
            <Col span="2" style="cursor: pointer">
            <Icon type="log-out" @click="logOut()"></Icon>
            <span class="layout-text" @click="logOut()">退出系统</span>
            </Col>
          </Row>
        </div>
        <div class="layout-breadcrumb">
          <Breadcrumb>
            <Breadcrumb-item>{{activeName}}</Breadcrumb-item>
          </Breadcrumb>
        </div>
        <div class="layout-content">
          <div class="layout-content-main">
            <router-view></router-view>
          </div>
        </div>
        <div class="layout-copy">
          2015-2017 &copy; 北京易至信科技有限公司
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
      }, 12000);
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

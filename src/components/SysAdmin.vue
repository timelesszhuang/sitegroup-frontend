<!--suppress ALL -->
<style scoped>
  .layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    height: 100%;
  }

  .layout-pagetitle {
    padding: 10px 15px 5px 15px;
  }

  .layout-content {
    min-height: 200px;
    margin:15px 15px 50px 15px;
    background: #fff;
    border-radius: 4px;
  }

  .layout-content-main {
    padding: 10px;
  }
  .layout-copy{
    text-align: center;
    display:block;
    width:100%;
  }

  .layout-copy span{
    color: #9ea7b4;
    position:fixed;
    bottom:0;
    display:block;
    background-color:#fff;
    padding:10px 0;
    width:100%;
  }

  .layout-menu-left {
    background: #16b8be;
  }

  .layout-header {
    height: 60px;
    background: #fff;
  }

  .layout-logo-left {
    height: 65px;
    background-color: #fff;
    border-radius: 3px;
    padding: 15px auto;
    padding-bottom: 30px;
  }

  .layout-ceiling-main a {
    color: #9ba7b5;
  }

  .layout-hide-text .layout-text {
    display: none;
  }

  .ivu-col {
    transition: width .2s ease-in-out;
  }

  .ivu-row-flex {
    height: 100%;
  }

  .layout-content {
    /*height: 85%;*/
    height: auto;
    min-height: 63%;
  }

  .layout-ceiling {
    background: #464c5b;
    padding: 10px 0;
  }

  .layout-ceiling-main {
    float: right;
    margin-right: 15px;
  }

  .layout-ceiling-main a {
    color: #9ba7b5;
  }

  .layout-breadcrumb {
    padding: 10px 15px 0;
  }


  .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item, .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title {
    color: #fff;
  }

  .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu), .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title-active:not(.ivu-menu-submenu) {
    color: #fff;
  }
</style>
<template>
  <div class="layout" :class="{'layout-hide-text': spanLeft < 4}">
    <Row type="flex">
      <i-col :span="spanLeft" class="layout-menu-left">
        <Menu active-name="activeName" :theme="theme" width="auto">
          <div class="layout-logo-left" @click="routerChange('/sysadmin/')">
            <img style="width:205px;display: block;margin: 0 auto" src="../../src/assets/img/logo.png" alt="">
          </div>
          <Menu-item name="公众号文章管理">
            <Icon type="chatbubbles"></Icon>
            <span class="layout-text"
                  @click="routerChange('/sysadmin/sysarticlemanage','公众号文章管理')">公众号文章管理</span>
          </Menu-item>
          <Menu-item name="新闻类文章管理">
            <Icon type="ios-copy" :size="iconSize"></Icon>
            <span class="layout-text" @click="routerChange('/sysadmin/news','新闻类文章管理')">新闻类文章管理</span>
          </Menu-item>
          <Menu-item name="公共模板">
            <Icon type="ios-upload" :size="iconSize"></Icon>
            <span class="layout-text" @click="routerChange('/sysadmin/systemplate','公共模板')">公共模板</span>
          </Menu-item>
          <Menu-item name="营销模式">
            <Icon type="flag" :size="iconSize"></Icon>
            <span class="layout-text" @click="routerChange('/sysadmin/marketmodel','营销模式')">营销模式</span>
          </Menu-item>
          <Menu-item name="事件营销">
            <Icon type="alert" :size="iconSize"></Icon>
            <span class="layout-text" @click="routerChange('/sysadmin/eventmarketingholiday','事件营销')">事件营销</span>
          </Menu-item>
          <Menu-item name="案例中心">
            <Icon type="briefcase"></Icon>
            <span class="layout-text" @click="routerChange('/sysadmin/case','案例中心')">案例中心</span>
          </Menu-item>
          <Menu-item name="软文管理">
            <Icon type="briefcase"></Icon>
            <span class="layout-text" @click="routerChange('/sysadmin/advertorialmanage','软文管理')">软文管理</span>
          </Menu-item>
          <Menu-item name="系统推送">
            <Icon type="ios-navigate" :size="iconSize"></Icon>
            <span class="layout-text" @click="routerChange('/sysadmin/systempush','系统推送')">系统推送</span>
          </Menu-item>
          <Menu-item name="用户管理">
            <Icon type="person"></Icon>
            <span class="layout-text" @click="routerChange('/sysadmin/user','用户管理')">用户管理</span>
          </Menu-item>
          <Menu-item name="节点管理">
            <Icon type="ios-cloud-outline" :size="iconSize"></Icon>
            <span class="layout-text" @click="routerChange('/sysadmin/node','节点管理')">节点管理</span>
          </Menu-item>
          <Menu-item name="友商库">
            <Icon type="android-apps" :size="iconSize"></Icon>
            <span class="layout-text" @click="routerChange('/sysadmin/company','友商库')">友商库</span>
          </Menu-item>
        </Menu>
      </i-col>
      <i-col :span="spanRight" style="overflow: auto">
        <div class="layout-header">
          <Row type="flex" justify="end" align="middle" class="code-row-bg">

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
        <div class="layout-content">
          <div class="layout-content-main">
            <router-view></router-view>
          </div>
        </div>
        <div class="layout-copy">
          <span>2015-{{copytime}} &copy;  北京易至信科技有限公司</span>
        </div>
      </i-col>
    </Row>
    <changepwd ref="changePwd"></changepwd>
    <logout ref="logout"></logout>
  </div>
</template>
<script>
  import changepwd from './Account/Changepwd.vue';
  import logout from './Account/Logout.vue';

  export default {
    data() {
      return {
        spanLeft: 4,
        spanRight: 20,
        activeName: '',
        theme: 'dark',
        containerTitle: '',
        showChangepwdModal: false,
        copytime:''
      }
    },
    components: {
      changepwd,
      logout
    },
    computed: {
      iconSize() {
        return this.spanLeft === 4 ? 14 : 24;
      }
    },
    methods: {
      changePwd() {
        this.$refs.changePwd.modal = true
      },
      logOut() {
        this.$refs.logout.modal = true
      },
      toggleClick() {
        if (this.spanLeft === 4) {
          this.spanLeft = 2;
          this.spanRight = 22;
        } else {
          this.spanLeft = 4;
          this.spanRight = 20;
        }
      },
      routerChange(path, activeName) {
        this.activeName = activeName;
        router.push(path);
      },
    },
    //created 是函数
    created() {
      let date = new Date;
      this.copytime =  date.getFullYear()
      let rememberKey = Lockr.get('rememberKey')
//      let user_id = Lockr.get('user_id')
      let type = Lockr.get('type');
      if (!rememberKey || type != 1) {
        //表示没有登陆
        setTimeout(() => {
          router.replace('/')
        }, 1500)
        return
      }
    },
  }
</script>

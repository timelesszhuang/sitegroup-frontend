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
    margin: 15px;
    background: #fff;
    border-radius: 4px;
  }

  .layout-content-main {
    padding: 10px;
  }

  .layout-copy {
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
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
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
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

</style>
<template>
  <div class="layout" :class="{'layout-hide-text': spanLeft < 4}">
    <Row type="flex">
      <i-col :span="spanLeft" class="layout-menu-left">
        <Menu active-name="activeName" :theme="theme" width="auto">
          <div class="layout-logo-left"></div>
          <Menu-item name="用户管理">
            <Icon type="ios-navigate" :size="iconSize"></Icon>
            <span class="layout-text" @click="routerChange('/sysadmin/user','用户管理')">用户管理</span>
          </Menu-item>
          <Menu-item name="友商库">
            <Icon type="android-apps" :size="iconSize"></Icon>
            <span class="layout-text" @click="routerChange('/sysadmin/company','友商库')">友商库</span>
          </Menu-item>
          <Menu-item name="节点管理">
            <Icon type="ios-cloud-outline" :size="iconSize"></Icon>
            <span class="layout-text" @click="routerChange('/sysadmin/node','节点管理')">节点管理</span>
          </Menu-item>
          <Menu-item name="重置密码">
            <Icon type="android-lock" :size="iconSize" @click="changePwd()"></Icon>
            <span class="layout-text" @click="changePwd()">重置密码</span>
          </Menu-item>
          <Menu-item name="退出系统">
            <Icon type="log-out" :size="iconSize" @click="logOut()"></Icon>
            <span class="layout-text" @click="logOut()">退出系统</span>
          </Menu-item>
        </Menu>
      </i-col>
      <i-col :span="spanRight" style="overflow: auto">
        <div class="layout-header">
          <i-button type="text" @click="toggleClick">
            <Icon type="navicon" size="32"></Icon>
          </i-button>
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
          2015-2017 &copy; 山东强比信息技术有限公司
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
    data () {
      return {
        spanLeft: 4,
        spanRight: 20,
        activeName: '',
        theme: 'dark',
        containerTitle: '',
        showChangepwdModal: false
      }
    },
    components: {
      changepwd,
      logout
    },
    computed: {
      iconSize () {
        return this.spanLeft === 4 ? 14 : 24;
      }
    },
    methods: {
      changePwd () {
        this.$refs.changePwd.modal = true
      },
      logOut(){
        this.$refs.logout.modal = true
      },
      toggleClick () {
        if (this.spanLeft === 4) {
          this.spanLeft = 2;
          this.spanRight = 22;
        } else {
          this.spanLeft = 4;
          this.spanRight = 20;
        }
      },
      routerChange (path, activeName) {
        this.activeName = activeName;
        router.push(path);
      },
    },
    //created 是函数
    created () {
      let rememberKey = Lockr.get('rememberKey')
      let user_id = Lockr.get('user_id')
      let type = Lockr.get('type');
      if (!rememberKey || !user_id || type != 1) {
        //表示没有登陆
        setTimeout(() => {
          router.replace('/')
        }, 1500)
        return
      }
    },
  }
</script>

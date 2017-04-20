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
    overflow: hidden;
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
    height: 75%;
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
</style>
<template>
  <div class="layout" :class="{'layout-hide-text': spanLeft < 4}">
    <Row type="flex">
      <i-col :span="spanLeft" class="layout-menu-left">
        <Menu active-name="1" :theme="theme" width="auto">
          <div class="layout-logo-left"></div>
          <Menu-item name="1">
            <Icon type="ios-navigate" :size="iconSize"></Icon>
            <span class="layout-text" @click="routerChange('/home/menu1','1')">选项 1</span>
          </Menu-item>
          <Menu-item name="2">
            <Icon type="ios-keypad" :size="iconSize"></Icon>
            <span class="layout-text">选项 2</span>
          </Menu-item>
          <Menu-item name="3">
            <Icon type="ios-analytics" :size="iconSize"></Icon>
            <span class="layout-text">选项 3</span>
          </Menu-item>
        </Menu>
      </i-col>
      <i-col :span="spanRight">
        <div class="layout-ceiling">
          <Menu mode="horizontal" :theme="theme" active-name="1">
            <Menu-item name="1">
              <Icon type="ios-paper"></Icon>
              内容管理
            </Menu-item>
            <Menu-item name="2">
              <Icon type="ios-people"></Icon>
              用户管理
            </Menu-item>
            <Submenu name="3">
              <template slot="title">
                <Icon type="stats-bars"></Icon>
                切换主题
              </template>
              <Menu-group title="左侧菜单">
                <Menu-item name="3-1"><span @click="changeThemes('light')">LIGHT</span></Menu-item>
                <Menu-item name="3-2"><span @click="changeThemes('dark')">DARK</span></Menu-item>
              </Menu-group>
            </Submenu>
            <Menu-item name="4">
              <Icon type="settings"></Icon>
              综合设置
            </Menu-item>
          </Menu>
        </div>
        <div class="layout-header">
          <i-button type="text" @click="toggleClick">
            <Icon type="navicon" size="32"></Icon>
          </i-button>
          <h3 style="display: inline-block; padding-top: 10px">
            <Icon type="chevron-right"></Icon>&nbsp;&nbsp;&nbsp;{{containerTitle}}菜单1
          </h3>
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
  </div>
</template>
<script>
  export default {
    data () {
      return {
        spanLeft: 4,
        spanRight: 20,
        activeName: '',
        theme: 'dark',
        containerTitle: ''
      }
    },
    computed: {
      iconSize () {
        return this.spanLeft === 4 ? 14 : 24;
      }
    },
    methods: {
      changeThemes(theme){
        console.log(theme);
//        this.theme = theme;
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
      routerChange(path, activeName){
        this.activeName = activeName;
        router.push(path);
      }
    }
  }
</script>

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import 'iview/dist/styles/iview.css';    // 使用 CSS
import '../my-theme/index.less'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import Drilldown from '../node_modules/highcharts/modules/drilldown.js'
import Highcharts from 'highcharts'
Drilldown(Highcharts);
import VueQriously from 'vue-qriously'
Vue.use(VueQriously)
import axios from 'axios'
import Lockr from 'lockr'
import moment from 'moment'
import Cookies from 'js-cookie'

import VueHtml5Editor from 'vue-html5-editor'
import Store from './vuex/store.js'
Vue.config.productionTip = false
Vue.use(iView);
Vue.use(router);
Vue.use(ElementUI)

let domain = 'api.salesman.cc'

// let domain = 'www.sitegroupback.com'

var HOST = 'http://' + domain + '/index.php/'
var ROOTHOST = 'http://' + domain + '/'
Vue.use(VueHtml5Editor, {
  // 全局组件名称，使用new VueHtml5Editor(options)时该选项无效
  // global component name
  name: "editor",
  // 是否显示模块名称，开启的话会在工具栏的图标后台直接显示名称
  // if set true,will append module name to toolbar after icon
  showModuleName: false,
  // 自定义各个图标的class，默认使用的是font-awesome提供的图标
  // custom icon class of built-in modules,default using font-awesome
  icons: {
    text: "custom-icon text",
    color: "custom-icon color",
    font: "custom-icon font",
    align: "custom-icon align",
    list: "custom-icon list",
    link: "custom-icon link",
    unlink: "custom-icon unlink",
    tabulation: "custom-icon table",
    image: "custom-icon image",
    "horizontal-rule": "custom-icon hr",
    eraser: "custom-icon eraser",
    hr: "custom-icon hr",
    undo: "custom-icon undo",
    "full-screen": "custom-icon full-screen",
    info: "custom-icon info ",
  },
  // 配置图片模块
  // config image module
  image: {
    // 文件最大体积，单位字节  max file size
    sizeLimit: 1024 * 1024,
    // 上传参数,默认把图片转为base64而不上传
    // upload config,default null and convert image to base64
    upload: {
      url: HOST+'uploadimg',
      headers: {},
      params: {},
      fieldName: 'img'
    },
    // 压缩参数,默认使用localResizeIMG进行压缩,设置为null禁止压缩
    // compression config,default resize image by localResizeIMG (https://github.com/think2011/localResizeIMG)
    // set null to disable compression
    compress: {
      width: 1600,
      height: 1600,
      quality: 80
    },
    // 响应数据处理,最终返回图片链接
    // handle response data，return image url
    uploadHandler(responseText){
      //default accept json data like  {ok:false,msg:"unexpected"} or {ok:true,data:"image url"}
      var json = JSON.parse(responseText)
      if (!json.status) {
        alert(json.msg)
      } else {
        return json.url
      }
    }
  },
  // 语言，内建的有英文（en-us）和中文（zh-cn）
  //default en-us, en-us and zh-cn are built-in
  language: "zh-cn",
  // 自定义语言
  i18n: {
    //specify your language here
    "zh-cn": {
      "align": "对齐方式",
      "image": "图片",
      "list": "列表",
      "link": "链接",
      "unlink": "去除链接",
      "table": "表格",
      "font": "文字",
      "full screen": "全屏",
      "text": "排版",
      "eraser": "格式清除",
      "color": "颜色",
      "please enter a url": "请输入地址",
      "create link": "创建链接",
      "bold": "加粗",
      "italic": "倾斜",
      "underline": "下划线",
      "strike through": "删除线",
      "subscript": "上标",
      "superscript": "下标",
      "heading": "标题",
      "font name": "字体",
      "font size": "文字大小",
      "left justify": "左对齐",
      "center justify": "居中",
      "right justify": "右对齐",
      "ordered list": "有序列表",
      "unordered list": "无序列表",
      "fore color": "前景色",
      "background color": "背景色",
      "row count": "行数",
      "column count": "列数",
      "save": "确定",
      "upload": "上传",
      "progress": "进度",
      "unknown": "未知",
      "please wait": "请稍等",
      "error": "错误",
      "abort": "中断",
      "reset": "重置"
    }
  },
  // 隐藏不想要显示出来的模块
  // the modules you don't want
  hiddenModules: [],
  // 自定义要显示的模块，并控制顺序
  // keep only the modules you want and customize the order.
  // can be used with hiddenModules together
  visibleModules: [
    "text",
    "color",
    "font",
    "align",
    "list",
    "link",
    "unlink",
    "tabulation",
    "image",
    "hr",
    "eraser",
    "undo",
    "full-screen",
  ],
  // 扩展模块，具体可以参考examples或查看源码
  // extended modules
  modules: {
    //omit,reference to source code of build-in modules
  }
})



axios.defaults.baseURL = HOST
axios.defaults.timeout = 1000 * 15
axios.defaults.headers['Content-Type'] = 'application/json'
axios.defaults.withCredentials = true

//变为全局的变量
window.HOST = HOST
window.ROOTHOST = ROOTHOST
window.router = router
window.axios = axios
window.moment = moment
window.Cookies = Cookies
window.Lockr = Lockr


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: Store,
  template: '<App/>',
  components: {App}
})

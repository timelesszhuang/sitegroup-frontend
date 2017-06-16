// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import 'iview/dist/styles/iview.css';    // 使用 CSS

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import Drilldown from '../node_modules/highcharts/modules/drilldown.js'
import Highcharts from 'highcharts'
Drilldown(Highcharts);

import axios from 'axios'
import Lockr from 'lockr'
import moment from 'moment'
import Cookies from 'js-cookie'
import VueQuillEditor from 'vue-quill-editor'

Vue.config.productionTip = false
Vue.use(iView);
Vue.use(router);
Vue.use(ElementUI)
Vue.use(VueQuillEditor)

// let domain = 'api.admin.com.cn'

let domain = 'www.sitegroupback.com'
var HOST = 'http://' + domain + '/index.php/'
var ROOTHOST = 'http://' + domain + '/'

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
  template: '<App/>',
  components: {App}
})

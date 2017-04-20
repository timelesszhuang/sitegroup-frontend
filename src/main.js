// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import 'iview/dist/styles/iview.css';    // 使用 CSS
import axios from 'axios'
import Lockr from 'lockr'
import moment from 'moment'
import Cookies from 'js-cookie'

Vue.config.productionTip = false
Vue.use(iView);
Vue.use(router);


var HOST = 'http://sitegroup.youdao.so/index.php/'

axios.defaults.baseURL = HOST
axios.defaults.timeout = 1000 * 15
axios.defaults.headers['Content-Type'] = 'application/json'
axios.defaults.withCredentials = true

//变为全局的变量
window.HOST = HOST
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
  components: { App }
})

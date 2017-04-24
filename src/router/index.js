import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Account/Login.vue'
import Sysadmin from '../components/SysAdmin.vue'
import Changepwd from '../components/Account/Changepwd.vue'
import User from '../components/sysadmin/user/user.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/sysadmin',
      name: 'sysadmin',
      component: Sysadmin,
      children: [
        {path: 'user', component: User, name: 'user'},
        {path: 'changepwd', component: Changepwd, name: 'changepwd'}
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: Sysadmin,
      children: [
        // {path: 'leftmenu', component: Leftmenu, name: 'menu1'}
      ]
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Account/Login.vue'
import Home from '../components/Home.vue'
import Menu1 from '../components/demo/menu1.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        // {path: 'refresh', component: refresh, name: 'refresh'},
        {path: 'menu1', component: Menu1, name: 'menu1'}
      ]
    }
  ]
})

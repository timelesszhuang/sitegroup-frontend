import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Account/Login.vue'
import Sysadmin from '../components/SysAdmin.vue'
import Admin from '../components/Admin.vue'
import Changepwd from '../components/Account/Changepwd.vue'
import User from '../components/sysadmin/user/user.vue'
import Node from '../components/sysadmin/node/node.vue'
import Company from '../components/sysadmin/industry/tab.vue'

import Keyword from '../components/admin/keyword/keyword.vue'
import Articletype from '../components/admin/articletype/index.vue'
import Article from '../components/admin/article/index.vue'
import Navigation from '../components/admin/navigation/index.vue'
import Question from '../components/admin/question/index.vue'
import Scatteredarticle from '../components/admin/scatteredarticle/scatteredarticle.vue'
import Title from '../components/admin/title/title.vue'
import Questiontype from '../components/admin/questiontype/questiontype.vue'
import Template from '../components/admin/template/template.vue'
import Code from '../components/admin/code/index.vue'
import Domain from '../components/admin/domain/index.vue'
import Contactway from '../components/admin/contactway/contactway.vue'

import Activity from '../components/admin/activity/activity.vue'

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
        {path: 'company', component: Company, name: 'company'},
        {path: 'node', component: Node, name: 'node'},
        {path: 'changepwd', component: Changepwd, name: 'changepwd'},
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      children: [
        {path: 'keyword', component: Keyword, name: 'keyword'},
        {path: 'articletype', component: Articletype, name: 'articletype'},
        {path: 'article', component: Article, name: 'article'},
        {path: 'navigation', component: Navigation, name: 'navigation'},
        {path: 'question', component: Question, name: 'question'},
        {path: 'scatteredarticle', component: Scatteredarticle, name: 'scatteredarticle'},
        {path: 'title', component: Title, name: 'title'},
        {path: 'questiontype', component: Questiontype, name: 'questiontype'},
        {path: 'template', component: Template, name: 'template'}
      ]
    }
  ]
})

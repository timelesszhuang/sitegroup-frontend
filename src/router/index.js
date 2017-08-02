import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Account/Login.vue'
import Sysadmin from '../components/SysAdmin.vue'
import Admin from '../components/Admin.vue'
import Changepwd from '../components/Account/Changepwd.vue'
import User from '../components/sysadmin/user/user.vue'
import Node from '../components/sysadmin/node/node.vue'
import Company from '../components/sysadmin/industry/tab.vue'
import Syskeyword from '../components/sysadmin/wechatkeyword/index.vue'
import Weixinarticle from '../components/sysadmin/wechatarticle/index.vue'
import Newsarticle from '../components/sysadmin/163article/index.vue'
import Qqarticle from '../components/sysadmin/qqarticle/index.vue'
import WechatKeywordType from '../components/sysadmin/wechatkeywordtype/index.vue'



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
import Siteuser from '../components/admin/siteuser/siteuser.vue'
import Sitetype from '../components/admin/sitetype/sitetype.vue'
import Site from '../components/admin/site/site.vue'
import Link from '../components/admin/link/index.vue'
import MessageLog from '../components/messageLog/messageLog.vue';
import Flow from '../components/admin/flow/index.vue';
import Countkeyword from '../components/admin/countkeyword/index.vue'
import Index from '../components/admin/index/index.vue'
import Crawler from '../components/admin/crawler/crawler.vue'
import Pv from '../components/admin/pv/pv.vue'
import Other from '../components/admin/other/index.vue'
import Show from '../components/admin/show/index.vue'
import Staticconfig from '../components/admin/staticconfig/index.vue'
import Rejection from '../components/admin/rejection/index.vue'
import Templatemanage from '../components/admin/templatemanage/index.vue'
import Seo from '../components/admin/tdk/index.vue'
import Wechatkeyword from '../components/admin/wechatkeyword/index.vue'
import Wechatarticle from '../components/admin/wechatarticle/index.vue'
import Wangyiarticle from '../components/admin/163article/index.vue'
import Tengxunarticle from '../components/admin/qqarticle/index.vue'
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
        {path: 'syskeyword', component: Syskeyword, name: 'syskeyword'},
        {path: 'weixinarticle', component: Weixinarticle, name: 'weixinarticle'},
        {path: 'newsarticle', component: Newsarticle, name: 'newsarticle'},
        {path: 'qqarticle', component: Qqarticle, name: 'qqarticle'},
        {path: 'wechatkeywordtype', component:WechatKeywordType,name:'wechatkeywordtype'}
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      children: [
        {path: 'keyword', component: Keyword, name: 'keyword'},
        {path: 'index', component: Index, name: 'index'},
        {path: 'articletype', component: Articletype, name: 'articletype'},
        {path: 'article', component: Article, name: 'article'},
        {path: 'navigation', component: Navigation, name: 'navigation'},
        {path: 'question', component: Question, name: 'question'},
        {path: 'scatteredarticle', component: Scatteredarticle, name: 'scatteredarticle'},
        {path: 'title', component: Title, name: 'title'},
        {path: 'questiontype', component: Questiontype, name: 'questiontype'},
        {path: 'template', component: Template, name: 'template'},
        {path: 'code', component: Code, name: 'code'},
        {path: 'contactway', component: Contactway, name: 'contactway'},
        {path: 'domain', component: Domain, name: 'doamin'},
        {path: 'activity', component: Activity, name: 'activity'},
        {path: 'siteuser', component: Siteuser, name: 'siteuser'},
        {path: 'sitetype', component: Sitetype, name: 'sitetype'},
        {path: 'site', component: Site, name: 'site'},
        {path: 'link', component: Link, name: 'link'},
        {path: 'messageLog', component: MessageLog, name: 'messageLog'},
        {path: 'flow', component: Flow, name: 'flow'},
        {path: 'countkeyword', component: Countkeyword, name: 'countkeyword'},
        {path: 'crawler', component: Crawler, name: 'crawler'},
        {path: 'pv', component: Pv, name: 'pv'},
        {path: 'other', component: Other, name: 'other'},
        {path: 'show', component: Show, name: 'show'},
        {path: 'staticconfig', component: Staticconfig, name: 'staticconfig'},
        {path: 'templatemanage', component: Templatemanage, name: 'templatemanage'},
        {path: 'rejection', component: Rejection, name: 'rejection'},
        {path: 'seo', component: Seo, name: 'seo'},
        {path: 'wechatkeyword', component: Wechatkeyword, name: 'wechatkeyword'},
        {path: 'wechatarticle', component: Wechatarticle, name: 'wechatarticle'},
        {path: 'wangyiarticle', component: Wangyiarticle, name: 'wangyiarticle'},
        {path: 'tengxunarticle', component: Tengxunarticle, name: 'tengxunarticle'},
      ]
    }
  ]
})

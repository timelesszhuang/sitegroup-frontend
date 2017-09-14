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
import WechatKeywordType from '../components/sysadmin/wechatkeywordtype/index.vue'
import News from '../components/sysadmin/news/tab.vue'
import Marketmodel from '../components/sysadmin/marketmodel/index.vue'
import Systempush from '../components/sysadmin/systempush/index.vue'
import Case from '../components/sysadmin/case/index.vue'


import Keyword from '../components/admin/keyword/keyword.vue'
import Articlemanage from '../components/admin/articlemanage/tab.vue'
import Title from '../components/admin/title/title.vue'
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
import Index from '../components/admin/index/index.vue'
import Staticconfig from '../components/admin/staticconfig/index.vue'
import Rejection from '../components/admin/rejection/index.vue'
import Templatemanage from '../components/admin/templatemanage/index.vue'
import Seo from '../components/admin/tdk/index.vue'
import Wechatkeyword from '../components/admin/wechatkeyword/index.vue'
import Wechatarticle from '../components/admin/wechatarticle/index.vue'
import Wangyiarticle from '../components/admin/163article/index.vue'
import Tengxunarticle from '../components/admin/qqarticle/index.vue'
import MainKwyword from '../components/admin/mainkeyword/index.vue'
import Recommendationkeyword from '../components/admin/recommendationkeyword/index.vue'
import Hotnews from '../components/admin/news/tab.vue'
import Menutype from '../components/admin/menutype/index.vue'
import Nav from '../components/admin/nav/tab.vue'
import Customeform from '../components/admin/customeform/index.vue'
import Pageview from '../components/admin/pageview/index.vue'
import Wechat from '../components/admin/wechat/tab.vue'
import Questionmanage from '../components/admin/questionmanage/tab.vue'
import Productmanage from '../components/admin/productmanage/tab.vue'
import Newsmanage from '../components/admin/newsmanage/tab.vue'
import Siteelement from '../components/admin/siteelement/index.vue'
import Sitemanage from '../components/admin/sitemanage/index.vue'
import Marketingmodel from '../components/admin/marketingmodel/index.vue'
import Systemp from '../components/admin/systempush/systempush.vue';
import Casecenter from '../components/admin/case/index.vue';
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
        {path: 'news', component: News, name: 'news'},
        {path: 'node', component: Node, name: 'node'},
        {path: 'changepwd', component: Changepwd, name: 'changepwd'},
        {path: 'syskeyword', component: Syskeyword, name: 'syskeyword'},
        {path: 'weixinarticle', component: Weixinarticle, name: 'weixinarticle'},
        {path: 'wechatkeywordtype', component:WechatKeywordType,name:'wechatkeywordtype'},
        {path: 'marketmodel',component:Marketmodel,name:'marketmodel'},
        {path: 'systempush',component:Systempush,name:'systempush'},
        {path: 'case',component:Case,name:'case'}
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      children: [
        {path: 'keyword', component: Keyword, name: 'keyword'},
        {path: 'index', component: Index, name: 'index'},
        {path: 'articlemanage', component: Articlemanage, name: 'articlemanage'},
        {path: 'title', component: Title, name: 'title'},
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
        {path: 'staticconfig', component: Staticconfig, name: 'staticconfig'},
        {path: 'templatemanage', component: Templatemanage, name: 'templatemanage'},
        {path: 'rejection', component: Rejection, name: 'rejection'},
        {path: 'seo', component: Seo, name: 'seo'},
        {path: 'wechatkeyword', component: Wechatkeyword, name: 'wechatkeyword'},
        {path: 'wechatarticle', component: Wechatarticle, name: 'wechatarticle'},
        {path: 'wangyiarticle', component: Wangyiarticle, name: 'wangyiarticle'},
        {path: 'tengxunarticle', component: Tengxunarticle, name: 'tengxunarticle'},
        {path: 'mainkeyword', component: MainKwyword, name: 'mainkeyword'},
        {path: 'recommendationkeyword', component: Recommendationkeyword, name: 'recommendationkeyword'},
        {path: 'hotnews', component: Hotnews, name: 'hotnews'},
        {path: 'menutype', component: Menutype, name: 'menutype'},
        {path: 'nav', component: Nav, name: 'nav'},
        {path: 'customeform', component: Customeform, name: 'customeform'},
        {path: 'pageview', component: Pageview, name: 'pageview'},
        {path: 'wechat', component: Wechat, name: 'wechat'},
        {path: 'questionmanage', component: Questionmanage, name: 'questionmanage'},
        {path: 'productmanage', component: Productmanage, name: 'productmanage'},
        {path: 'newsmanage', component: Newsmanage, name: 'newsmanage'},
        {path:'sitemanage',component:Sitemanage,name:'sitemanage'},
        {path: 'siteelement',component:Siteelement,name:'siteelement'},
        {path: 'marketingmodel',component:Marketingmodel,name:'marketingmodel'},
        {path: 'systemp', component: Systemp, name: 'systemp'},
        {path: 'casecenter', component: Casecenter, name: 'casecenter'},
      ]
    }
  ]
})

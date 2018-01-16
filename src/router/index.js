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
import Mediatype from '../components/sysadmin/mediatype/index.vue'
import Advertorialmanage from '../components/sysadmin/advertorial/tab.vue'
import SysarticleManage from '../components/sysadmin/articleManage/index.vue'
import Systemplate from '../components/sysadmin/template/template.vue'


import Keyword from '../components/admin/keyword/keyword.vue'
import Articlemanage from '../components/admin/articlemanage/tab.vue'
import Title from '../components/admin/title/title.vue'
import Template from '../components/admin/template/template.vue'
import Code from '../components/admin/code/index.vue'
import Domain from '../components/admin/domain/index.vue'
import Contactway from '../components/admin/contactway/contactway.vue'
import Activity from '../components/admin/activity/index.vue'
import Siteuser from '../components/admin/siteuser/siteuser.vue'
import Sitetype from '../components/admin/sitetype/sitetype.vue'
import Site from '../components/admin/site/site.vue'
import Link from '../components/admin/link/index.vue'
import MessageLog from '../components/messageLog/messageLog.vue'
import Flow from '../components/admin/flow/index.vue'
import Index from '../components/admin/index/index.vue'
//静态化配置
import Staticconfig from '../components/admin/staticconfig/index.vue'
//甩单
import Rejection from '../components/admin/rejection/index.vue'
//模板管理
import Templatemanage from '../components/admin/templatemanage/index.vue'
//seo优化
import Seo from '../components/admin/tdk/index.vue'
//微信关键词
import Wechatkeyword from '../components/admin/wechatkeyword/index.vue'
//微信文章
import Wechatarticle from '../components/admin/wechatarticle/index.vue'
//网易文章
import Wangyiarticle from '../components/admin/163article/index.vue'
//腾讯列表
import Tengxunarticle from '../components/admin/qqarticle/index.vue'
//主关键词
import MainKeyword from '../components/admin/mainkeyword/index.vue'
//推荐关键词
import Recommendationkeyword from '../components/admin/recommendationkeyword/index.vue'
//热点新闻
import Hotnews from '../components/admin/news/tab.vue'
//菜单分类
import Menutype from '../components/admin/menutype/index.vue'
//
import Nav from '../components/admin/nav/tab.vue'
//用户自定义表单
import Customeform from '../components/admin/customeform/index.vue'
//pageview
import Pageview from '../components/admin/pageview/index.vue'
//企业微信
import Wechat from '../components/admin/wechat/tab.vue'
//问答管理
import Questionmanage from '../components/admin/questionmanage/tab.vue'
//产品管理
import Productmanage from '../components/admin/productmanage/tab.vue'
//新闻管理
import Newsmanage from '../components/admin/newsmanage/tab.vue'
//站点元素
import Siteelement from '../components/admin/siteelement/index.vue'
//站点管理
import Sitemanage from '../components/admin/sitemanage/index.vue'
//营销模式
import Marketingmodel from '../components/admin/marketingmodel/index.vue'
//系统推送
import Systemp from '../components/admin/systempush/systempush.vue'
//案例中心
import Casecenter from '../components/admin/case/index.vue'

//追踪关键词
import Trackkeyword from '../components/admin/trackkeyword/index.vue'
import Trackrecommendkeyword from '../components/admin/keywordtab/tab.vue'
//软文管理
import Advertorial from '../components/admin/advertorial/index.vue'
//乐销易秀
import Yqx from '../components/admin/yiqixiu/index.vue'
//
import Imglist from '../components/admin/imglist/index.vue'
//内容调取
import Content from '../components/admin/content/index'
//标签
import Tag from '../components/admin/tag/index'
//公共文章
import Publicarticle from '../components/admin/publicarticle/index'


Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
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
        {path: 'marketmodel', component: Marketmodel, name: 'marketmodel'},
        {path: 'systempush', component: Systempush, name: 'systempush'},
        {path: 'case', component: Case, name: 'case'},
        {path: 'mediatype', component: Mediatype, name: 'mediatype'},
        {path: 'advertorialmanage', component: Advertorialmanage, name: 'advertorialmanage'},
        {path: 'sysarticlemanage', component: SysarticleManage, name: 'sysarticlemanage'},
        {path: 'systemplate', component: Systemplate, name: 'systemplate'},
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
        {path: 'mainkeyword', component: MainKeyword, name: 'mainkeyword'},
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
        {path: 'sitemanage', component: Sitemanage, name: 'sitemanage'},
        {path: 'siteelement', component: Siteelement, name: 'siteelement'},
        {path: 'marketingmodel', component: Marketingmodel, name: 'marketingmodel'},
        {path: 'systemp', component: Systemp, name: 'systemp'},
        {path: 'casecenter', component: Casecenter, name: 'casecenter'},
        {path: 'trackkeyword', component: Trackkeyword, name: 'trackkeyword'},
        {path: 'trackrecommendkeyword', component: Trackrecommendkeyword, name: 'trackrecommendkeyword'},
        {path: 'advertorial', component: Advertorial, name: 'advertorial'},
        {path: 'yqx', component: Yqx, name: 'yqx'},
        {path: 'imglist', component: Imglist, name: 'imglist'},
        {path: 'content', component: Content, name: 'content'},
        {path: 'tag', component: Tag, name: 'tag'},
        {path: 'publicarticle', component: Publicarticle, name: 'publicarticle'},
      ]
    }
  ]
})

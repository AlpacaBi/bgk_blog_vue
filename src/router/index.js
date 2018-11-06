import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home/Home'
import Article from '@/components/Article/Article'
import Messagebroad from '@/components/Messagebroad/Messagebroad'
import BackStage from '@/components/BackStage/BackStage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/article',
      name: 'Article',
      component: Article
    },
    {
      path: '/messagebroad',
      name: 'Messagebroad',
      component: Messagebroad
    },
    {
      path: '/backstage',
      name: 'BackStage',
      component: BackStage
    }
  ]
})

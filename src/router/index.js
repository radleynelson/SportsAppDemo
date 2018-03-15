import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import NBAArticles from '@/components/NBA-Articles'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/NBA-News',
      name: 'NBA-Articles',
      component: NBAArticles
    }
  ]
})

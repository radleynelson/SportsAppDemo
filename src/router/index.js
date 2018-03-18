import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import NBAArticles from '@/components/NBA-Articles'
import NBAScores from '@/components/NBA-Scores'

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
    },
    {
      path: '/NBA-Scores',
      name: 'NBA-Scores',
      component: NBAScores
    }
  ]
})

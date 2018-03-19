import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import NBAArticles from '@/components/NBA-Articles'
import NBAScores from '@/components/NBA-Scores'
import Galary from '@/components/Galary'
import NBAStandings from '@/components/NBA-Standings'
import UserLogin from '@/components/User-Login'

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
    },
    {
      path: '/NBA-Galary',
      name: 'Galary',
      component: Galary
    },
    {
      path: '/NBA-Standings',
      name: 'NBA-Standings',
      component: NBAStandings
    },
    {
      path: '/User-Login',
      name: 'User-Login',
      component: UserLogin
    }
  ]
})

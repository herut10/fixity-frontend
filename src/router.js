import Vue from 'vue'
import Router from 'vue-router'
import home from './views/home.vue'
import about from './views/about.vue'
import issueDetails from './views/issueDetails.vue'
import issueAdd from './views/issueAdd.vue'
import user from './views/user.vue'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/about',
      name: 'about',
      component: about
    },
    {
      path: '/issue/:issueId',
      name: 'issueDetails',
      component: issueDetails
    },
    {
      path: '/issueAdd',
      name: 'issueAdd',
      component: issueAdd
    },
    
    {
      path: '/user',
      name: 'user',
      component: user
    }
  ]
})
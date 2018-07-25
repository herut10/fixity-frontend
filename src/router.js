import Vue from 'vue'
import Router from 'vue-router'
import home from './views/home.vue'
import about from './views/about.vue'
import issueDetails from './views/issueDetails.vue'
import addIssue from './views/issueAdd.vue'

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
      path: '/issueDetails/:issueId?',
      name: 'issueDetails',
      component: issueDetails
    },
    
    { 
      path: '/issue/add',
      name: 'add issue',
      component: addIssue
    }
  ]
})
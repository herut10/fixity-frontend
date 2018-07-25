import Vue from 'vue'
import Router from 'vue-router'
import home from './views/home.vue'
import about from './views/about.vue'
<<<<<<< HEAD
import issueDetails from './views/issueDetails.vue'
=======
import addIssue from './views/issueAdd.vue'
>>>>>>> 8833c63f5596af8a2fcd01ef4e08486a462da9e4

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
<<<<<<< HEAD
      path: '/issueDetails/:issueId?',
      name: 'issueDetails',
      component: issueDetails
=======
      path: '/issue/add',
      name: 'add issue',
      component: addIssue
>>>>>>> 8833c63f5596af8a2fcd01ef4e08486a462da9e4
    }
  ]
})
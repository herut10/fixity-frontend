import Vue from 'vue';
import Router from 'vue-router';
import home from './views/home.vue';
import issueDetails from './views/issueDetails.vue';
import issueAdd from './views/issueAdd.vue';
import userProfile from './views/userProfile.vue';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
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
      component: userProfile
    }
  ]
})
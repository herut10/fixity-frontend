import Vue from 'vue';
import Vuex from 'vuex';

import issueModule from './issueModule.js';
import userModule from './userModule.js';
import commentModule from './commentModule.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },

  mutations: {},

  actions: {

  },

  modules: {
    issueModule,
    commentModule,
    userModule,
  }
})
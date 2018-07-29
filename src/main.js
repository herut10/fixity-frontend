import Vue from 'vue';
import app from './app.vue';
import router from './router';
import store from './store/store';
import './registerServiceWorker';
import axios from 'axios';
import * as VueGoogleMaps from 'vue2-google-maps';
import VueCarousel from 'vue-carousel';
import '@/assets/scss/main.scss';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faMapMarkedAlt, faListUl } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faMapMarkedAlt);
library.add(faListUl);
Vue.component('font-awesome-icon', FontAwesomeIcon);

axios.defaults.withCredentials = true;
Vue.config.productionTip = false;

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAKgxLxUePB9fjgJ2D-IcAwXtx8BW9xEdg',
    libraries: 'places', 
  },
})

Vue.use(VueCarousel);

Vue.filter('distanceUnit', distance => {
  if (!distance) return '';
  if (distance.toString().length <= 3) return 'meters from you';
  else return 'KMs from you';
})

new Vue({
  router,
  store,
  render: h => h(app)
}).$mount('#app')
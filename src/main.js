import Vue from 'vue';
import app from './app.vue';
import router from './router';
import store from './store/store';
import './registerServiceWorker';
import axios from 'axios';
import * as VueGoogleMaps from 'vue2-google-maps';
import VueCarousel from 'vue-carousel';
import '@/assets/scss/main.scss';
import socketio from 'socket.io-client'
import VueSocketio from 'vue-socket.io';
import moment from 'moment';

let socketURL = 'http://localhost:3000'
if (process.env.NODE_ENV !== 'development') {
  socketURL = '/'
}

Vue.use(VueSocketio, socketio(socketURL));



import cloudinary from 'cloudinary'
import {
  library
} from '@fortawesome/fontawesome-svg-core';
import {
  faMapMarkedAlt,
  faListUl
} from '@fortawesome/free-solid-svg-icons';
import {
  FontAwesomeIcon
} from '@fortawesome/vue-fontawesome';

library.add(faMapMarkedAlt);
library.add(faListUl);
Vue.component('font-awesome-icon', FontAwesomeIcon);

axios.defaults.crossDomain = true;



Vue.config.productionTip = false;

cloudinary.config({
  cloud_name: 'djewvb6ty',
  api_key: '746648462286187',
  api_secret: 'S5ch4dT2yLZxSoCrrn9pu6sDdF0'
});



Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAKgxLxUePB9fjgJ2D-IcAwXtx8BW9xEdg',
    libraries: 'places',
  },
})

Vue.use(VueCarousel);

Vue.filter('distanceUnit', distance => {
  if (!distance || distance === 'Distance Unknown') return '';
  if (distance.toString().length <= 3) return 'meters from you';
  else return 'KMs from you';
})

Vue.filter('relativeTime', time => {
    return moment(time).fromNow();
})

new Vue({
  router,
  store,
  render: h => h(app)
}).$mount('#app')
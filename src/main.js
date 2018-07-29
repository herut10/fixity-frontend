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

let socketURL = 'http://localhost:3000'
if (process.env.NODE_ENV !== 'development') {
  socketURL = '/'
}

Vue.use(VueSocketio, socketio(socketURL));




axios.defaults.withCredentials = true
Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAKgxLxUePB9fjgJ2D-IcAwXtx8BW9xEdg',
    libraries: 'places',
  },
})

Vue.use(VueCarousel);


new Vue({
  router,
  store,
  render: h => h(app)
}).$mount('#app')
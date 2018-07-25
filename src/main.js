import Vue from 'vue'
import app from './app.vue'
import router from './router'
import store from './store/store'
import './registerServiceWorker'

Vue.config.productionTip = false


import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAKgxLxUePB9fjgJ2D-IcAwXtx8BW9xEdg',
    libraries: 'places', 
  },
})


new Vue({
  router,
  store,
  render: h => h(app)
}).$mount('#app')

<template>
  <div id="app">
    <app-header />
    <navbar />
    <router-view/>
  </div>
</template>

<script>
import mapService from '@/services/mapService.js'
import appHeader from '@/components/generalCmps/appHeaderCmp.vue';
import navbar from '@/components/generalCmps/navbarCmp.vue';
import { LOAD_ISSUES } from '@/store/issueModule.js';

export default {
  name: 'app',

  created() {
    this.$store.dispatch({ type: LOAD_ISSUES });
    // this.$store.dispatch({ type: LOAD_CURRLOC });
  },

  components: {
    appHeader,
    navbar
  }
};
</script>


<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.navbar {
  background-color: #312e2e;
  position: fixed;
  bottom: 0;
  padding: 15px;
  width: 100%;
  z-index: 1;
  a {
    font-weight: bold;
    color: white;
    &.router-link-exact-active {
      color: #0b83d9;
    }
  }
}
</style>

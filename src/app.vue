<template>
  <div id="app">
    <app-header @openAbout="toggleAbout" />
    <navbar />
    <about ref="about" />
    <div ref="curtain" class="curtain" @click="toggleAbout"></div>
    <router-view />
  </div>
</template>

<script>
import mapService from '@/services/mapService.js';
import appHeader from '@/components/generalCmps/appHeaderCmp.vue';
import navbar from '@/components/generalCmps/navbarCmp.vue';
import about from '@/views/about.vue';
import { LOAD_CURRLOC } from '@/store/userModule.js';
import { LOAD_ISSUES, ADD_ISSUE, UPDATE_ISSUE } from '@/store/issueModule.js';

export default {
  name: 'app',

  created() {
    this.$store.dispatch({ type: LOAD_ISSUES });
    this.$store.dispatch({ type: LOAD_CURRLOC });
    // this.$socket.emit("emit_method", 15);//testing sockets
  },
  sockets: {
    issueAdded(issueToSubmit) {
      this.$store.commit({
        type: ADD_ISSUE,
        issueToSubmit
      });
    },

    errorAdding() {
      console.log('errorAdding');
    },

    issueLikesChanged(updatedIssue) {
      this.$store.commit({ type: UPDATE_ISSUE, updatedIssue });
    }
  },

  methods: {
    toggleAbout() {
      this.$refs.about.$el.classList.toggle('about-open');
      this.$refs.curtain.classList.toggle('curtain-show');
    }
  },

  components: {
    appHeader,
    navbar,
    about
  }
};
</script>


<style lang="scss" scoped>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.curtain {
  background-color: rgba(0, 0, 0, 0.49);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 2;
  opacity: 0;
  visibility: hidden;
  transition: all .4s;
  &.curtain-show {
    visibility: visible;
    opacity: 1;
  }
}
</style>

<template>
  <div id="app">
    <app-header @openAbout="toggleAbout" />
    <about ref="about" />
    <notifications group="foo" />
    <div ref="curtain" class="curtain" @click="toggleAbout"></div>
    <router-view />
    <login-modal />
    <footer-navbar />
    <v-dialog/>  
  </div>
</template>

<script>
import demoService from '@/services/demoService.js';
import mapService from '@/services/mapService.js';
import appHeader from '@/components/generalCmps/appHeaderCmp.vue';
import footerNavbar from '@/components/generalCmps/footerNavbarCmp.vue';
import about from '@/views/about.vue';
import loginModal from '@/components/generalCmps/loginModalCmp.vue';
import { LOAD_CURRLOC, SET_USER } from '@/store/userModule.js';
import { SET_COMMENT } from '@/store/commentModule.js';
import { LOAD_ISSUES, ADD_ISSUE, UPDATE_ISSUE } from '@/store/issueModule.js';

export default {
  name: 'app',

  created() {
    demoService.setThis(this);
    this.$store.dispatch({ type: LOAD_ISSUES });
    this.$store.dispatch({ type: LOAD_CURRLOC });
    // this.$socket.emit('emit_method', 15);//testing sockets
  },
  sockets: {
    issueAdded(issueToSubmit) {
      this.$store.commit({
        type: ADD_ISSUE,
        issueToSubmit
      });
    },
    userFound(user) {
      this.$store.commit({ type: SET_USER, user });
    },

    errorAdding() {
      console.log('errorAdding');
    },

    issueLikesChanged(updatedIssue) {
      this.$store.commit({ type: UPDATE_ISSUE, updatedIssue });
    },

    commentReceived(comment) {
      this.$store.commit({ type: SET_COMMENT, comment });
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
    footerNavbar,
    about,
    loginModal
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
  transition: all 0.4s;
  &.curtain-show {
    visibility: visible;
    opacity: 1;
  }
}
</style>

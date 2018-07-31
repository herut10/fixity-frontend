<template>
  <div id="app">
    <app-header @openAbout="toggleAbout" />
    <navbar />
    <about ref="about" />
    <div ref="curtain" class="curtain" @click="toggleAbout"></div>
    <router-view />
    <loginModal></loginModal>
    <v-dialog/>


    
  </div>
</template>

<script>
import mapService from "@/services/mapService.js";
import { setCurrThis } from "@/components/generalCmps/dialogModalCmp.js";
import appHeader from "@/components/generalCmps/appHeaderCmp.vue";
import navbar from "@/components/generalCmps/navbarCmp.vue";
import about from "@/views/about.vue";
import { LOAD_CURRLOC, SET_USER } from "@/store/userModule.js";
import { LOAD_ISSUES, ADD_ISSUE, UPDATE_ISSUE } from "@/store/issueModule.js";
import loginModal from "@/components/generalCmps/loginModalCmp.vue";
export default {
  name: "app",

  created() {
    
    setCurrThis(this);
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
    userFound(user) {
      this.$store.commit({ type: SET_USER, user });
    },

    errorAdding() {
      console.log("errorAdding");
    },

    issueLikesChanged(updatedIssue) {
      this.$store.commit({ type: UPDATE_ISSUE, updatedIssue });
    }
  },

  methods: {
    toggleAbout() {
      this.$refs.about.$el.classList.toggle("about-open");
      this.$refs.curtain.classList.toggle("curtain-show");
    }
  },

  components: {
    appHeader,
    navbar,
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

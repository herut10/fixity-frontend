<template>
  <div id="app">
    <app-header @openAbout="openAbout" />
    <navbar />
    <about ref="about" />
    <div class="curtain hidden"></div>
    <router-view />
  </div>
</template>

<script>
import mapService from "@/services/mapService.js";
import appHeader from "@/components/generalCmps/appHeaderCmp.vue";
import navbar from "@/components/generalCmps/navbarCmp.vue";
import about from "@/views/about.vue";
import { LOAD_ISSUES } from "@/store/issueModule.js";
import { LOAD_CURRLOC } from "@/store/userModule.js";
import { ADD_ISSUE } from "@/store/issueModule.js";

export default {
  name: "app",

  created() {
    this.$store.dispatch({ type: LOAD_ISSUES });
    this.$store.dispatch({ type: LOAD_CURRLOC });
    // this.$socket.emit("emit_method", 15);//testing sockets
  },
  sockets: {
    issueAdded(issueToSubmit) {
      debugger;
      this.$store.commit({
        type: ADD_ISSUE,
        issueToSubmit
      });
    },
    errorAdding() {
      console.log("errorAdding");
    }
  },

  methods: {
    openAbout() {
      this.$refs.about.$el.classList.toggle("about-open");
      this.$el.children[3].classList.toggle("hidden");
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
  background-color: rgba(0, 0, 0, 0.637);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 0;
}
</style>

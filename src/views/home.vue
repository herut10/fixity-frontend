<template>
  <section class="home">
    <div class="site-entrance flex column justify-center">
      <div class="container">
        <h1 class="title">Be the change you wish to see in the world.</h1>
        <div class="subtitles">
          <h3>Report issues around you for the benefit of others.</h3>
          <h3>Form groups to make your city a better place.</h3>
        </div>
      </div>
    </div>

    <section class="main container">
      <div class="view-pick">
        <font-awesome-icon icon="list-ul" class="active" ref="listIcon" @click="changeCurrView('list')" /> 
        | 
        <font-awesome-icon icon="map-marked-alt" ref="mapIcon" @click="changeCurrView('map')" />
      </div>
      
      <autoComplete @change.native="isAdressEmpty" @place_changed="setCurrLoc"></autoComplete>

      <issue-list-cmp :mapLoaded="mapLoaded" :currLoc="center" :issues="issues" v-show="currView === 'list'" />
      <GmapMap
        v-show="currView === 'map'"
        :center="center"
        ref="map"
        :zoom="17"
        map-type-id="terrain"
      >
        <GmapMarker
          :position="center"
          :clickable="true"
          :draggable="false"
        />

        <GmapMarker
          v-for="issue in issues" :key="issue._id"
          :position="issue.loc"
          :clickable="true"
          @click="openIssuePreview(issue)"
          :draggable="false"
          :icon="`img/map-icons/${issue.category}-${issue.status}.png`"
        />
      </GmapMap>

      <!-- <issue-preview-cmp :issue:"issue" /> -->
    </section>    
  </section>
</template>

<script>
import {
  SET_ISSUES_VIEW,
  ISSUES_TO_DISPLAY,
  ISSUES_VIEW
} from "@/store/issueModule.js";
import { CURRLOC } from "@/store/userModule.js";
import issueListCmp from "@/components/issueCmps/issueListCmp.vue";
import issuePreviewCmp from "@/components/issueCmps/issuePreviewCmp.vue";
import autoComplete from "vue2-google-maps/dist/components/autocomplete.vue";

export default {
  name: "home",

  data() {
    return {
      mapLoaded: false,
      currLoc: null
    };
  },

  computed: {
    issues() {
      this.$store.getters[ISSUES_TO_DISPLAY].forEach(issue => {});

      return this.$store.getters[ISSUES_TO_DISPLAY];
    },

    currView() {
      return this.$store.getters[ISSUES_VIEW];
    },

    center() {
      var userLoc = this.$store.getters[CURRLOC];
      return this.currLoc || userLoc || { lat: 32, lng: 34 };
    }
  },

  methods: {
    isAdressEmpty(ev) {
      if (!ev.target.value) {
        this.currLoc = null;
      }
    },
    setCurrLoc(ev) {
      if(!ev.name) return
      this.currLoc = {};
      [this.currLoc.lat, this.currLoc.lng] = [
        ev.geometry.location.lat(),
        ev.geometry.location.lng()
      ];
    },
    changeCurrView(viewType) {
      if (this.$store.state.issueModule.issuesView === viewType) return;
      this.$store.commit({ type: SET_ISSUES_VIEW, viewType });
      this.$refs.listIcon.classList.toggle("active");
      this.$refs.mapIcon.classList.toggle("active");
    },
    resolveIssue() {
      if(this.issue.status === 'closed') {
        this.notify('Report already closed', 'warn');
        return;
      }  
      var user = this.$store.getters[USER];
      var userLoc = this.$store.getters[CURRLOC];
      var updatedIssue = JSON.parse(JSON.stringify(this.issue));
      var userDistance = utilsService.getDistanceFromLatLngInKm(updatedIssue.loc,userLoc);
      if(this.authorizedToClose(user, updatedIssue, userDistance)) {
        updatedIssue.status = 'closed';
        this.notify('The report is now closed', 'success');
      } else if(userDistance <=0.5){
        updatedIssue.nonIssueReportCount++;
        this.notify('The report is now modified', 'success');
      } else {
        
        this.notify('Failed to modify report', 'warn');
        return;
      }  
      this.$store.dispatch({type:UPDATE_ISSUE, updatedIssue})
        .then(updatedIssue=> {
          this.issue = updatedIssue;
        })
        .catch(err=>console.warn(err));
    },

    authorizedToClose(user, updatedIssue, userDistance) {
      return user._id === updatedIssue.reportedBy||user.isAdmin||
      (updatedIssue.nonIssueReportCount === 2 && userDistance <=0.5);
    },

    notify(text, type) {
        this.$notify({
          group: 'foo',
          title: 'Report Status',
          text: text,
          type: type,
          duration: 3000,
        });
    },

    openIssuePreview(issue) {
      console.log("issue opened", issue);
    }
  },

  mounted() {
    this.$refs.map.$mapPromise.then(() => {
      this.mapLoaded = true;
    });
  },

  components: {
    issueListCmp,
    issuePreviewCmp,
    autoComplete
  }
};
</script>

<style lang="scss" scoped>
@media (min-width: 460px) {
  .site-entrance {
    .title {
      font-size: 3em;
    }

    .subtitles {
      h3 {
        font-size: 1.4em;
      }
    }
  }
}

@media (min-width: 800px) {
  div.site-entrance {
    background-position: center;
  }
}

@media (min-width: 992px) {
  div.site-entrance {
    height: calc(100vh - 60px);
  }
}

@media (min-width: 1015px) {
  div.site-entrance {
    text-align: start;
  }

  .subtitles {
    h3 {
      text-indent: 40px;
      &:last-of-type {
        text-indent: 120px;
      }
    }
  }
}

.site-entrance {
  color: white;
  text-align: center;
  background-image: url("../../public/img/site-entrance.jpg");
  background-size: cover;
  background-position: -100px;
  // padding: 15px;
  margin-bottom: 10px;
  height: calc(100vh - 110px);
  width: 100%;
}

.title {
  font-size: 2.5em;
  line-height: 1.2em;
  text-shadow: -1px 1px 9px #454444;
  margin-bottom: 10px;
}

h3 {
  font-size: 1.2em;
  font-weight: lighter;
  text-shadow: -1px 1px 9px #000000;
  margin: 15px 0;
}

.main {
  padding-bottom: 10px;
}

.view-pick {
  color: lightgrey;
  font-family: "Open Sans", sans-serif;
  padding-bottom: 15px;
}

svg {
  cursor: pointer;
  margin: 0 5px;
  &:hover {
    color: rgb(77, 76, 76);
  }
  &.active {
    color: rgb(77, 76, 76);
  }
}

.vue-map-container {
  height: 70vh;
}
</style>

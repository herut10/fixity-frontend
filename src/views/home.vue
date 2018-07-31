<template>
  <section class="home container">
    <div class="view-pick">
      <font-awesome-icon icon="list-ul" class="active" ref="listIcon" @click="changeCurrView('list')" /> 
      | 
      <font-awesome-icon icon="map-marked-alt" ref="mapIcon" @click="changeCurrView('map')" />
    </div>
    <issue-list-cmp :mapLoaded="mapLoaded" :issues="issues" v-show="currView === 'list'" />
    
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
</template>

<script>
import {
  SET_ISSUES_VIEW,
  ISSUES_TO_DISPLAY,
  ISSUES_VIEW
} from "@/store/issueModule.js";
import { CURRLOC } from "@/store/userModule.js";
import issueListCmp from "@/components/issueCmps/issueListCmp.vue";
import issuePreviewCmp from '@/components/issueCmps/issuePreviewCmp.vue';

export default {
  name: "home",

  data() {
    return {
      mapLoaded: false
    };
  },

  computed: {
    issues() {
      this.$store.getters[ISSUES_TO_DISPLAY].forEach(issue => {
      });

      return this.$store.getters[ISSUES_TO_DISPLAY];
    },

    currView() {
      return this.$store.getters[ISSUES_VIEW];
    },

    center() {
      var userLoc = this.$store.getters[CURRLOC];
      if (!userLoc) return { lat: 32, lng: 34 };
      else return userLoc;
    }
  },

  methods: {
    changeCurrView(viewType) {
      if (this.$store.state.issueModule.issuesView === viewType) return;
      this.$store.commit({ type: SET_ISSUES_VIEW, viewType });
      this.$refs.listIcon.classList.toggle('active');
      this.$refs.mapIcon.classList.toggle('active');
    },
    resolveIssue(issue) {
      if(issue.status === 'closed') return;
      var user = this.$store.getters[USER];
      var userLoc = this.$store.getters[CURRLOC];
      var updatedIssue = JSON.parse(JSON.stringify(issue));
      var userDistance = utilsService.getDistanceFromLatLngInKm(updatedIssue.loc,userLoc);
      if(user._id === updatedIssue.reportedBy||
      (updatedIssue.nonIssueReportCount === 2 && userDistance <=0.5))
      updatedIssue.status = 'closed';
      else if(userDistance <=0.5) updatedIssue.nonIssueReportCount++;
      else return;
      this.$store.dispatch({type:UPDATE_ISSUE, issueId:updatedIssue._id, updatedIssue})
        .then(updatedIssue=> console.log('issue updated'))
        .catch(err=>console.warn(err));
    },    

    openIssuePreview(issue) {
      console.log('issue opened', issue);
      
    }
  },

  mounted() {
    this.$refs.map.$mapPromise.then(() => {
      this.mapLoaded = true;
    });
  },

  components: {
    issueListCmp,
    issuePreviewCmp
  }
};
</script>

<style lang="scss" scoped>
.view-pick {
  color: lightgrey;
  font-family: 'Open Sans', sans-serif;
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

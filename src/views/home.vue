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
      <button class="cta-report-btn" @click="$router.push('/issueAdd')">
        <font-awesome-icon icon="plus" /> Report
      </button>
    </div>

    <section class="main container">
      <div class="view-pick">
        <font-awesome-icon icon="list-ul" class="active" ref="listIcon" @click="changeCurrView('list')" /> 
        | 
        <font-awesome-icon icon="map-marked-alt" ref="mapIcon" @click="changeCurrView('map')" />
      </div>
      
      <autoComplete @change.native="isAddressEmpty" @place_changed="setCurrLoc"></autoComplete>
      
      <resolved-issues-cmp v-if="completedIssues" :issues="completedIssues" :currLoc="center" v-show="currView === 'list'" />
      
      <issue-list-cmp v-if="issues" :mapLoaded="mapLoaded" :currLoc="center" :issues="issues" v-show="currView === 'list'" />
      <img class="loading-gif" v-else src="img/loading.gif"/>
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
          :animation=2
        />

        <GmapMarker
          v-for="issue in issues" :key="issue._id"
          :position="issue.loc"
          :clickable="true"
          @click="openInfoWindow(issue)"
          :draggable="false"
          :icon="`img/map-icons/${issue.category}-${issue.status}.png`"
        />

        <gmap-info-window
          :options="{maxWidth: 300}"
          :position="infoWindow.position"
          :opened="infoWindow.open"
          @closeclick="infoWindow.open=false">
          <div @click="goToIssue" v-html="infoWindow.template" class="issue-info-window flex column"></div>
        </gmap-info-window>
      </GmapMap>

    </section>    
  </section>
</template>

<script>
import {
  SET_ISSUES_VIEW,
  ISSUES_TO_DISPLAY,
  ISSUES_VIEW
} from '@/store/issueModule.js';
import { CURRLOC } from '@/store/userModule.js';
import issueListCmp from '@/components/issueCmps/issueListCmp.vue';
import resolvedIssuesCmp from '@/components/issueCmps/resolvedIssuesCmp.vue';
import issuePreviewCmp from '@/components/issueCmps/issuePreviewCmp.vue';
import autoComplete from 'vue2-google-maps/dist/components/autocomplete.vue';
import demoService from '@/services/demoService.js';

export default {
  name: 'home',

  data() {
    return {
      mapLoaded: false,
      currLoc: null,
      infoWindow: {
        currIssueId: '',
        position: { lat: 0, lng: 0 },
        open: false,
        template: ''
      }
    };
  },

  computed: {
    issues() {
      return this.$store.getters[ISSUES_TO_DISPLAY];
    },

    currView() {
      return this.$store.getters[ISSUES_VIEW];
    },

    center() {
      var userLoc = this.$store.getters[CURRLOC];
      return this.currLoc || userLoc || { lat: 32, lng: 34 };
    },

    completedIssues() {
      if (this.issues) {
        let closedIssues = this.issues.filter(issue => issue.status === 'closed');

        closedIssues.sort((issueA, issueB) => {
          return issueB.closeDate - issueA.closeDate;
        });
        // console.log(closedIssues);
        
        return closedIssues.slice(0, 4);
      }
    }
  },

  methods: {
    isAddressEmpty(ev) {
      if (!ev.target.value) {
        this.currLoc = null;
      }
    },
    setCurrLoc(ev) {
      if (!ev.name) return;
      this.currLoc = {};
      [this.currLoc.lat, this.currLoc.lng] = [
        ev.geometry.location.lat(),
        ev.geometry.location.lng()
      ];
    },
    changeCurrView(viewType) {
      if (this.$store.state.issueModule.issuesView === viewType) return;

      // demoService.addRandomIssue();

      this.$store.commit({ type: SET_ISSUES_VIEW, viewType });
      this.$refs.listIcon.classList.toggle('active');
      this.$refs.mapIcon.classList.toggle('active');
    },

    notify(text, type) {
      this.$notify({
        group: 'foo',
        title: 'Report Status',
        text: text,
        type: type,
        duration: 3000
      });
    },

    openInfoWindow(issue) {
      this.setInfoWindowTemplate(issue);
      this.infoWindow.position = issue.loc;
      this.infoWindow.open = true;
      this.infoWindow.currIssueId = issue._id;
    },

    goToIssue() {
      this.$router.push(`/issue/${this.infoWindow.currIssueId}`);
    },

    setInfoWindowTemplate(issue) {
      var strHtml = `
          <h2 style="text-transform: capitalize; text-align: center; font-size: 1.4em; margin-bottom: 5px">${
            issue.title
          }</h2>
          <img src="${
            issue.imgUrls[0]
          }" style="max-width: 150px; margin: 0 auto" />
      `;
      this.infoWindow.template = strHtml;
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
    autoComplete,
    resolvedIssuesCmp
  }
};
</script>

<style lang="scss" scoped>
.loading-gif {
  display: block;
  margin: 0 auto;
}

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

    .title {
      font-size: 4em;
    }

    .subtitles {
      h3 {
        font-size: 1.7em;
      }
    }
  }
}

@media (min-width: 992px) {
  div.site-entrance {
    height: calc(90vh - 60px);

    h1.title {
      font-size: 5em;
    }
  }
}

.site-entrance {
  color: white;
  text-align: center;
  background-image: url('../../public/img/site-entrance-buildings.jpg');
  background-size: cover;
  background-position: -678px;
  margin-bottom: 10px;
  height: calc(90vh - 110px);
  width: 100%;
}

.title {
  font-size: 2.5em;
  line-height: 1.2em;
  text-shadow: -1px 1px 9px black, 2px -1px 8px black;
  margin-bottom: 10px;
}

h3 {
  font-size: 1.2em;
  font-weight: lighter;
  text-shadow: -1px 1px 9px black, 2px -1px 8px black;
  margin: 15px 0;
}

.cta-report-btn {
  font-size: 1.7em;
  font-weight: bold;
  color: white;
  border-radius: 8px;
  border: none;
  background-color: #289aee;
  width: 180px;
  height: 80px;
  margin: 30px auto 0;
  transition: all 0.4s;
  &:hover {
    background-color: #e1ebf4;
    color: #289aee;
  }
}

.main {
  padding-bottom: 10px;
}

.view-pick {
  color: lightgrey;
  font-family: 'Open Sans', sans-serif;
  display: inline-block;
  padding-bottom: 15px;
  margin-right: 15px;
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

input {
  padding: 3px;
  color: #619ac4;
  border-radius: 4px;
  border: 1px solid #aeaeae;
}

.vue-map-container {
  height: 70vh;
}

.issue-info-window {
  cursor: pointer;
}
</style>

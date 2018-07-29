<template>
  <section class="home container">
    <div class="view-pick">
      <font-awesome-icon icon="list-ul" title="List View" @click="changeCurrView('list')" /> 
      | 
      <font-awesome-icon icon="map-marked-alt" title="Map View" @click="changeCurrView('map')" />
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
        :draggable="false"
      />
    </GmapMap>
  </section>
</template>

<script>
import {
  SET_ISSUES_VIEW,
  ISSUES_TO_DISPLAY,
  ISSUES_VIEW
} from '@/store/issueModule.js';
import { GET_CURRLOC } from '@/store/userModule.js';
import issueListCmp from '@/components/issueCmps/issueListCmp.vue';

export default {
  name: 'home',

  data() {
    return {
      mapLoaded: false
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
      var userLoc = this.$store.getters[GET_CURRLOC];
      if (!userLoc) return { lat: 32, lng: 34 };
      else return userLoc;
    }
  },

  methods: {
    changeCurrView(viewType) {
      this.$store.commit({ type: SET_ISSUES_VIEW, viewType });
    }
  },

  mounted() {
    this.$refs.map.$mapPromise.then(() => {
      this.mapLoaded = true;
    });
  },

  components: {
    issueListCmp
  }
};
</script>

<style lang="scss" scoped>
.view-pick {
  color: lightgrey;
  font-family: Arial, Helvetica, sans-serif;
  padding-bottom: 15px;
}

svg {
  cursor: pointer;
  margin: 0 5px;
  &:hover {
    color: rgb(77, 76, 76);
  }
}

.vue-map-container {
  height: 70vh;
}
</style>

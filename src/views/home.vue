<template>
  <section class="home container">
    <issue-list-cmp :mapLoaded="mapLoaded" :issues="issues" v-show="currView === 'list'" />

    <GmapMap
      v-show="currView === 'map'"
      :center="center"
      ref="map"
      :zoom="7"
      map-type-id="terrain"
    >
      <GmapMarker
        :position="center"
        :clickable="true"
        :draggable="false"
      />
    </GmapMap>
  </section>
</template>

<script>
// @ is an alias to /src
import { ISSUES_TO_DISPLAY, ISSUES_VIEW } from '@/store/issueModule.js';
import issueListCmp from '@/components/issueCmps/issueListCmp.vue';
import { gmapApi } from 'vue2-google-maps';

export default {
  name: 'home',

  data() {
    return {
      center: {
        lat: 10,
        lng: 10
      },
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

    google: gmapApi
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

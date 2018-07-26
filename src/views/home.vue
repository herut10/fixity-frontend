<template>
  <section class="home container">
    <issue-list-cmp :mapLoaded="mapLoaded" :issues="issues"></issue-list-cmp>
    <GmapMap
        ref="map"
        :center="center"
        :zoom="7"
        map-type-id="terrain"
      >
      </GmapMap>
  </section>
</template>

<script>
// @ is an alias to /src
import { ISSUES_TO_DISPLAY } from '@/store/issueModule.js';
import issueListCmp from '@/components/issueCmps/issueListCmp.vue';

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

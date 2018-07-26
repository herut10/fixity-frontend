<template>
    <section class="issue-preview flex column space-between">
        <carousel :perPage="1" :autoplay="true" :autoplayTimeout="1500" :paginationEnabled="false">
            <slide>
                <div class="issue-img" :style="{backgroundImage: `url('${issue.imgUrls[0]}')`}"></div>
            </slide>
            <slide>
                <div class="issue-img" :style="{backgroundImage: `url('${issue.imgUrls[0]}')`}"></div>
            </slide>
        </carousel>
        <div class="issue-info">
            <h2>{{issue.title}}</h2>
            <h3>{{issueAddress}}</h3>
            <h4>{{issue.category}}</h4>
        </div>
    </section>
</template>

<script>
import mapService from '@/services/mapService.js';

export default {
  name: 'issuePreview',

  props: {
    issue: {
      type: Object
    }
  },

  data() {
      return {
          issueAddress: ''
      }
  },

  mounted() {
      mapService.convertCoordsToAddress(this.issue.loc)
        .then(address => this.issueAddress = address);
  },
};
</script>

<style scoped>
.VueCarousel {
    height: 60%;
}

.issue-img {
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    height: 100%;
    width: 220px;
}
</style>

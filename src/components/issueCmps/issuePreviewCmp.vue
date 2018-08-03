<template>
    <section class="issue-preview flex column space-between">
        <carousel :perPage="1" :autoplay="true" :autoplayTimeout="2000" :paginationEnabled="false" :loop="true">
            <slide v-for="issueImgUrl in issue.imgUrls" :key="issueImgUrl">
                <div
                  class="issue-img"
                  :title="issue.title"
                  :style="{backgroundImage: `url('${issueImgUrl}')`, backgroundSize: issueImgSize}"
                >
                </div>
            </slide>
        </carousel>
        
        <div class="issue-info">
            <div class="issue-header flex space-between">
              <h2>{{issue.title}}</h2>
              <div v-if="issue.status==='closed'" class="resolved-stamp flex">
                <font-awesome-icon icon="check" />
                <h3>Issue Resolved</h3>
              </div>
            </div>
            <h3 class="issue-distance">{{issue.distance}} {{issue.distance | distanceUnit}}</h3>
            <h3>{{issueAddress}}</h3>
            <h4>{{issue.category}}</h4>
        </div>

        <div class="issue-footer flex space-between">
          <h5 class="issue-time">Reported {{issue.createdAt | relativeTime}}</h5>
          <issue-likes-cmp :issue="issue" />
        </div>

    </section>
</template>

<script>
import utilsService from '@/services/utilsService.js';
import mapService from '@/services/mapService.js';
import issueLikesCmp from '@/components/issueCmps/issueLikesCmp.vue';
import { CURRLOC } from '@/store/userModule.js';

export default {
  name: 'issuePreview',

  props: {
    issue: {
      type: Object
    }
  },

  data() {
    return {
      issueAddress: '',
      addressloc: null
    };
  },

  computed: {
    issueImgSize() {
      if (
        this.issue.imgUrls[0] ===
        'https://res.cloudinary.com/djewvb6ty/image/upload/v1532962154/placeholder.png'
      )
        return 'contain';
      else return 'cover';
    }
  },

  mounted() {
    mapService
      .convertCoordsToAddress(this.issue.loc)
      .then(address => (this.issueAddress = address));
  },

  components: {
    issueLikesCmp
  }
};
</script>

<style lang="scss" scoped>
.issue-preview {
  color: black;
  height: 100%;
  padding: 12px 10px 6px 10px;

  h2 {
    text-transform: capitalize;
    font-family: 'Roboto', sans-serif;
    font-size: 1.2em;
    margin-bottom: 8px;
  }

  h3 {
    font-size: 0.9em;
    font-weight: normal;
  }

  h4 {
    text-transform: capitalize;
    font-size: 0.8em;
  }
}

.resolved-stamp {
  color: #50b891;
  svg {
    margin-right: 5px;
  }
}

.VueCarousel {
  height: 60%;
  margin-bottom: 5px;
}

.issue-img {
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  height: 100%;
  width: 100%;
}

.issue-info {
  text-align: left;
}

.issue-distance {
  color: #439475;
}

.issue-time {
  color: rgb(175, 172, 172);
  font-weight: normal;
  height: fit-content;
  align-self: flex-end;
  margin-right: 4px;
}
</style>
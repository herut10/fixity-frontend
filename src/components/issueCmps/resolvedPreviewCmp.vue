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
            <h3>{{issue.title}}</h3>
            <!-- <h4 class="issue-distance">{{issue.distance}} {{issue.distance | distanceUnit}}</h4> -->
            <h4>{{issueAddress}}</h4>
            <h5>{{issue.category}}</h5>
        </div>

        <div class="issue-footer flex column space-between">
          <h5 class="issue-time">Reported {{issue.createdAt | relativeTime}}</h5>
        </div>

    </section>
</template>

<script>
import mapService from "@/services/mapService.js";
import issueLikesCmp from "@/components/issueCmps/issueLikesCmp.vue";
import { CURRLOC } from "@/store/userModule.js";

export default {
  name: "resolvedPreviewCmp",

  props: {
    issue: {
      type: Object
    }
  },

  data() {
    return {
      issueAddress: "",
      addressloc: null
    };
  },

  computed: {
    issueImgSize() {
      if (
        this.issue.imgUrls[0] ===
        "https://res.cloudinary.com/djewvb6ty/image/upload/v1532962154/placeholder.png"
      )
        return "contain";
      else return "cover";
    }
  },

  mounted() {
    mapService
      .convertCoordsToAddress(this.issue.loc)
      .then(address => (this.issueAddress = address));
  },

  components: {
    
  },

  created () {
      console.log(this.issue);
      
  }
};
</script>

<style lang="scss" scoped>
.issue-preview {
  color: black;
  height: 100%;
  padding: 12px 10px 6px 10px;

  h3 {
    text-transform: capitalize;
    font-family: 'Roboto', sans-serif;
    font-size: 1.2em;
    margin-bottom: 3px;
  }

  h4 {
    font-size: .9em;
    font-weight: normal;
    margin-bottom: 3px;
  }

  h5 {
    text-transform: capitalize;
    font-size: 0.8em;
  }
}

.VueCarousel {
  height: 40%;
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
  align-self: flex-start;
  margin-right: 4px;
}
</style>
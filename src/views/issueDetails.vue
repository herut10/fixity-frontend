
<template>
    <section v-if = 'issue'>
      <GmapMap
  :center="issue.loc"
  :zoom="12"
  map-type-id="terrain"
  style="width: 500px; height: 300px"
>
  <GmapMarker
    :position="issue.loc"
  />
</GmapMap>

      <div>{{issue.title}}</div>
      <div>{{issue.desc}}</div>
      <div>{{issue.category}}</div>
      <div>{{issue.status}}</div>

      <carousel :per-page="1">
  <slide>
      <img src="https://i.pinimg.com/originals/2a/0a/91/2a0a91b9a6e1db1e717963baf73aa9ed.png" >
  </slide>
  <slide>
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQMPhXXBzALNe-u0ev7fFv-iLAWJ3GcdcKzBOB9nJgM9Q4sIKESA" alt="">
  </slide>
  <slide>
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQMPhXXBzALNe-u0ev7fFv-iLAWJ3GcdcKzBOB9nJgM9Q4sIKESA" alt="">
  </slide>
  <slide>
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQMPhXXBzALNe-u0ev7fFv-iLAWJ3GcdcKzBOB9nJgM9Q4sIKESA" alt="">
  </slide>
</carousel>
    </section>
</template>

<script>
// import helloWorld from '@/components/helloWorld.vue';
import { GET_ISSUE_BY_ID } from '@/store/issueModule.js';
import { Carousel, Slide } from 'vue-carousel';

// import issueListCmp from '@/components/issueCmps/issueListCmp.vue';

export default {

  data() {
    return {
      issue: null,
    };
  },

  created() {
    let issueId = this.$route.params.issueId;
    this.$store.dispatch({ type: GET_ISSUE_BY_ID, issueId })
      .then(issue => {
        this.issue = issue;
      }).catch(err => console.warn(err))
  },

  computed: {},

    components: {
      Carousel,
      Slide,
    
    
    }
};
</script>

<template>
  <section class="home">
    <issue-list-cmp :issues="issues"></issue-list-cmp>
    <!-- <img src="../assets/logo.png"> -->
    <!-- <helloWorld msg="Welcome to Your Vue.js App"/> -->
  </section>
</template>

<script>
// @ is an alias to /src
import helloWorld from '@/components/helloWorld.vue';
import issueListCmp from '@/components/issueCmps/issueListCmp.vue';

export default {
  name: 'home',

  computed: {
    issues() {
      return this.$store.getters.issuesToDisplay;
    }
  },

  components: {
    helloWorld,
    issueListCmp
  }
}
</script>

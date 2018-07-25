<template>
  <section class="home">
    <issue-list-cmp :issues="issues"></issue-list-cmp>
  </section>
</template>

<script>
// @ is an alias to /src
import { ISSUES_TO_DISPLAY } from '@/store/issueModule.js';
import issueListCmp from '@/components/issueCmps/issueListCmp.vue';

export default {
  name: 'home',

  computed: {
    issues() {
      return this.$store.getters[ISSUES_TO_DISPLAY];
    }
  },

  components: {
    issueListCmp
  }
};
</script>

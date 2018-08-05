<template>
    <section class="issue-list">
        <ul class="clean-list">
            <li v-for="issue in issuesToDisplay" :key="issue._id" class="issue">
                <router-link :to="`/issue/${issue._id}`">
                    <issue-preview-cmp  v-if="mapLoaded" :issue="issue"></issue-preview-cmp>
                </router-link>
            </li>
        </ul>
    </section>
</template>

<script>
import issuePreviewCmp from './issuePreviewCmp.vue';
import utilsService from '@/services/utilsService.js';

export default {
  name: 'issueList',
  methods: {
    issueDistance(loc, issueLoc) {
      return utilsService.getDistanceFromLatLngInKm(loc, issueLoc);
    }
  },
  computed: {
    issuesToDisplay() {
      var issuesWithDistances = this.issues.map(issue => {
        var newIssue = JSON.parse(JSON.stringify(issue));
        newIssue.distance = this.issueDistance(this.currLoc, issue.loc);
        return newIssue;
      });
      issuesWithDistances = issuesWithDistances.sort((a, b) => {
        return a.distance - b.distance;
      });
      issuesWithDistances.forEach(issue => {
        issue.distance =
          issue.distance < 1
            ? (issue.distance * 1000).toFixed(0)
            : issue.distance.toFixed(2);
      });
      return issuesWithDistances;
    }
  },

  props: {
    issues: {
      type: Array,
      required: true
    },
    currLoc: {
      type: Object,
      required: true
    },
    mapLoaded: null
  },

  components: {
    issuePreviewCmp
  }
};
</script>

<style lang="scss" scoped>
ul {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  grid-gap: 30px;
  margin-top: 0;
}

.issue {
  border-radius: 4px;
  border: 1px solid #ebeef5;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.4);
  height: 440px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
}
</style>

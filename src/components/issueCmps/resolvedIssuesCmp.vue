<template>
    <section v-if="issues" class="issue-list">
        <h2>Recently Resolved Reports</h2>
        <ul class="clean-list">
            <li v-for="issue in issues" :key="issue._id" class="issue">
                <router-link :to="`/issue/${issue._id}`">
                    <resolved-preview-cmp :issue="issue"></resolved-preview-cmp>
                </router-link>
            </li>
        </ul>
    </section>
</template>

<script>
import resolvedPreviewCmp from "./resolvedPreviewCmp.vue";

export default {
  name: "resolvedIssuesCmp",
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
    resolvedPreviewCmp
  }
};
</script>

<style lang="scss" scoped>
h2 {
  text-align: center;
  margin: 10px 0 20px;
}

ul {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 15px;
  margin-top: 0;
}

.issue {
  border-radius: 4px;
  border: 1px solid #d5d8de;
  height: 280px;
  transition: all 0.5s;
}
</style>

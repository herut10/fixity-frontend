<template>
    <section v-if="userIssues" class="user-issues">
        <div class="issue-container flex" v-for="issue in userIssues" :key="issue._id"
        @click="routeToIssue(issue._id)">
            <div class="issue-img-container" 
            :style="{backgroundImage: `url('${issue.imgUrls[0]}')`}"></div>
            <div class="issue-content flex column">
                <H3>{{issue.title}}</H3>
                <div>{{issue.desc}}</div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
  name: 'userIssues',
  props: ['userIssues'],

  data() {
    return {};
  },
  created() {},
  methods: {
    routeToIssue(issueId) {
      this.$router.push(`/issue/${issueId}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.user-issues {
  width: 100%;
}

.issue-container {
  width: 90%;
  border: 1px solid lightgray;
  min-height: 70px;
  // border-radius: 8px;
  margin: 0 5% 3px 5%;
  cursor: pointer;

  .issue-img-container {
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    min-width: 17%;
    // border-radius: 6px 0 0 8px;
  }
  .issue-content {
    padding: 7px 7px;
    font-size: 0.8em;
    h3 {
      font-size: 1em;
      text-transform: capitalize;
    }
  }
}
</style>

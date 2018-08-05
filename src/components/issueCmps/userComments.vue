
<template>
    <section v-if="comments" class="user-comments">
        <div class="comment-container flex" v-for="comment in comments" :key="comment._id"
        @click="routeToIssue(comment.issue[0]._id)">
            <div class="issue-img-container"
            :style="{backgroundImage: `url('${comment.issue[0].imgUrls[0]}')`}"></div>
            <div class="issue-content flex column">
                <H3>{{comment.issue[0].title}}</H3>
                <div>{{comment.txt}}</div>
            </div>
        </div>
    </section>
</template>

<script>
import { GET_ISSUE_BY_ID } from '@/store/issueModule.js';
import { LOAD_ISSUES } from '@/store/issueModule.js';

export default {
  name: 'userComments',
  props: ['userComments'],

  data() {
    return {
      comments: null
    };
  },
  created() {
    this.$store
      .dispatch({ type: LOAD_ISSUES, getBy: {} })
      .then(issues => {
        this.getComments(issues);
      })
      .catch(err => console.warn(err));
  },

  methods: {
    getComments(issues) {
      var comments = JSON.parse(JSON.stringify(this.userComments));
      this.comments = comments.map(comment => {
        var issue = issues.filter(issue => issue._id === comment.issueId);
        if (issue) {
          comment.issue = issue;
          return comment;
        }
      });
    //   console.log(this.comments);
    },

    routeToIssue(issueId) {
      this.$router.push(`/issue/${issueId}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.user-comments {
  width: 100%;
}

.comment-container {
  width: 90%;
  border: 1.5px solid #69c8a4;
  min-height: 70px;
  border-radius: 8px;
  margin: 0 5% 3px 5%;
  cursor: pointer;

  .issue-img-container {
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    min-width: 17%;
    border-radius: 6px 0 0 8px;
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


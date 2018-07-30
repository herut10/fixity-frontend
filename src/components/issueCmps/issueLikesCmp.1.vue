<template>
    <section class="issue-likes flex">
        <div class="likeHappy flex column">
            <span ref="likeHappy" title="Happy" @click.prevent="changeIssueLikes('likeHappy')">😃</span>
            <span>{{issue.likes.likeHappy}}</span>
        </div>
        <div class="likeSad flex column">
            <span ref="likeSad" title="Sad" @click.prevent="changeIssueLikes('likeSad')">😢</span>
            <span>{{issue.likes.likeSad}}</span>
        </div>
        <div class="likeAngry flex column">
            <span ref="likeAngry" title="Angry" @click.prevent="changeIssueLikes('likeAngry')">😡</span>
            <span>{{issue.likes.likeAngry}}</span>
        </div>
        <div class="likeShocked flex column">
            <span ref="likeShocked" title="Shocked" @click.prevent="changeIssueLikes('likeShocked')">😮</span>
            <span>{{issue.likes.likeShocked}}</span>
        </div>
        <div class="likeDisgusted flex column">
            <span ref="likeDisgusted" title="Disgusted" @click.prevent="changeIssueLikes('likeDisgusted')">🤢</span>
            <span>{{issue.likes.likeDisgusted}}</span>
        </div>
    </section>
</template>

<script>
import { UPDATE_ISSUE, GET_ISSUE_BY_ID } from '@/store/issueModule.js';
import { USER, USER_LIKES, UPDATE_USER } from '@/store/userModule.js';

export default {
  name: 'issueLikes',

  props: {
    issue: {
      type: Object
    }
  },

  methods: {
    changeIssueLikes(likeType) {
      //TODO: only logged in user can like. if user is not logged- open the modal for signing up.
      //TODO: connect likes with user, so that when user logs in the emoji is marked clicked if he already clicked on it.
      
      var user = this.$store.getters[USER];
      var updatedUser = JSON.parse(JSON.stringify(user));

      var userLikes = this.$store.getters[USER_LIKES];
      var issueLiked = userLikes.find(
        userLike => userLike.issueId === this.issue._id
      );
      if (!issueLiked) {
        var updatedIssue = JSON.parse(JSON.stringify(this.issue));
        updatedIssue.likes[likeType]++;
        this.$store
          .dispatch({
            type: UPDATE_ISSUE,
            issueId: updatedIssue._id,
            updatedIssue
          })
          .then(() => {
            // EventBusService.$emit(SHOW_MSG, { txt: 'Todo deleted', type: 'success' })
            console.log('Like updated successfully');
            updatedUser.likes.push({ issueId: this.issue._id, likeType });

            this.$refs[likeType].classList.toggle('clicked');
          })
          .catch(() => {
            // EventBusService.$emit(SHOW_MSG, { txt: 'Problem with server! Could not delete todo', type: 'danger' })
            console.log('Problem liking issue');
          });
      } else {
        var updatedIssue = JSON.parse(JSON.stringify(this.issue));
        var likeIdx = updatedUser.likes.findIndex(
          like => like.issueId === this.issue._id
        );
        if (issueLiked.likeType === likeType) {
          updatedIssue.likes[likeType]--;
          updatedUser.likes.splice(likeIdx, 1);
        } else {
          updatedIssue.likes[issueLiked.likeType]--;
          updatedIssue.likes[likeType]++;
          updatedUser.likes[likeIdx].likeType = likeType;
        }
        this.$store
          .dispatch({
            type: UPDATE_ISSUE,
            issueId: updatedIssue._id,
            updatedIssue
          })
          .then(() => {
            this.$refs[likeType].classList.toggle('clicked');
            this.$refs[issueLiked.likeType].classList.toggle('clicked');
            console.log('Like updated successfully');
          })
          .catch(() => {
            // EventBusService.$emit(SHOW_MSG, { txt: 'Problem with server! Could not delete todo', type: 'danger' })
            console.log('Problem liking issue');
          });

        this.$store
          .dispatch({ type: UPDATE_USER, user: updatedUser })
          .then(() => {
            console.log('User like updated successfully');
          })
          .catch(() => {
            console.log('Problem updating user likes');
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.issue-likes {
  justify-content: flex-end;
}

.issue-likes div span:first-child {
  cursor: pointer;
  opacity: 0.6;
  &:hover,
  &.clicked {
    opacity: 1;
  }
}

.issue-likes div span:last-child {
  text-align: center;
  font-size: 0.6em;
  font-family: 'Rubik', sans-serif;
}
</style>

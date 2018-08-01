<template>
    <section class="issue-likes flex">
        <div class="likeHappy flex column" @mouseover="showLikesCount">
            <span>{{issue.likes.likeHappy}}</span>
            <span ref="likeHappy" title="Happy" @click.prevent="changeIssueLikes('likeHappy')">😃</span>
        </div>
        <div class="likeSad flex column">
            <span>{{issue.likes.likeSad}}</span>
            <span ref="likeSad" title="Sad" @click.prevent="changeIssueLikes('likeSad')">😢</span>
        </div>
        <div class="likeAngry flex column">
            <span>{{issue.likes.likeAngry}}</span>
            <span ref="likeAngry" title="Angry" @click.prevent="changeIssueLikes('likeAngry')">😡</span>
        </div>
        <div class="likeShocked flex column">
            <span>{{issue.likes.likeShocked}}</span>
            <span ref="likeShocked" title="Shocked" @click.prevent="changeIssueLikes('likeShocked')">😮</span>
        </div>
        <div class="likeDisgusted flex column">
            <span>{{issue.likes.likeDisgusted}}</span>
            <span ref="likeDisgusted" title="Disgusted" @click.prevent="changeIssueLikes('likeDisgusted')">🤢</span>
        </div>
    </section>
</template>

<script>
import dialogModal from '@/components/generalCmps/dialogModalCmp.js';
import { UPDATE_ISSUE, GET_ISSUE_BY_ID } from '@/store/issueModule.js';
import { USER, UPDATE_USER } from '@/store/userModule.js';

export default {
  name: 'issueLikes',

  props: {
    issue: {
      type: Object
    }
  },

  mounted() {
    var user = this.$store.getters[USER];
    var issueLiked = user.likes.find(
      userLike => userLike.issueId === this.issue._id
    );
    if (issueLiked) this.$refs[issueLiked.likeType].classList.add('clicked');
  },

  methods: {
    changeIssueLikes(likeType) {
      //TODO: only logged in user can like. if user is not logged- open the modal for signing up.
      var user = this.$store.getters[USER];
      // var userPrompt = this.$store.state.isPrompted;
      // if (!user && !userPrompt) {
      //   this.$modal.show('dialog', dialogModal);
      // } else {
      //   this.$modal.show('loginModal');
      // }
      var updatedUser = JSON.parse(JSON.stringify(user));
      var userLikes = user.likes;
      var issueLiked = userLikes.find(
        userLike => userLike.issueId === this.issue._id
      );
      if (!issueLiked) {
        var updatedIssue = JSON.parse(JSON.stringify(this.issue));
        updatedIssue.likes[likeType]++;
        this.$store
          .dispatch({ type: UPDATE_ISSUE, updatedIssue })
          .then(() => {
            // EventBusService.$emit(SHOW_MSG, { txt: 'Todo deleted', type: 'success' })
            console.log('Like updated successfully');
            updatedUser.likes.push({ issueId: this.issue._id, likeType });
            this.updateUser(updatedUser);
            this.$refs[likeType].classList.toggle('clicked');
            this.$socket.emit('issueLikesChanged', updatedIssue);
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
        if (
          issueLiked.likeType === likeType &&
          updatedIssue.likes[likeType] > 0
        ) {
          updatedIssue.likes[likeType]--;
          updatedUser.likes.splice(likeIdx, 1);
        } else {
          updatedIssue.likes[issueLiked.likeType]--;
          updatedIssue.likes[likeType]++;
          updatedUser.likes[likeIdx].likeType = likeType;
        }
        this.$store
          .dispatch({ type: UPDATE_ISSUE, updatedIssue })
          .then(() => {
            this.updateUser(updatedUser);
            this.$refs[likeType].classList.toggle('clicked');
            this.$refs[issueLiked.likeType].classList.toggle('clicked');
            console.log('Like updated successfully');
            this.$socket.emit('issueLikesChanged', updatedIssue);
          })
          .catch(() => {
            // EventBusService.$emit(SHOW_MSG, { txt: 'Problem with server! Could not delete todo', type: 'danger' })
            console.log('Problem liking issue');
          });
      }
    },

    updateUser(userToUpdate) {
      this.$store
        .dispatch({ type: UPDATE_USER, user: userToUpdate })
        .then(() => {
          console.log('User like updated successfully');
        })
        .catch(() => {
          console.log('Problem updating user likes');
        });
    },

    showLikesCount() {

    }
  }
};
</script>

<style lang="scss" scoped>
.issue-likes {
  width: fit-content;
  align-self: flex-end;
}

.issue-likes div span:last-child {
  cursor: pointer;
  font-size: 1.3em;
  opacity: 0.6;
  &:hover,
  &.clicked {
    opacity: 1;
  }
}

.issue-likes div span:first-child {
  display: none;
  text-align: center;
  font-size: 0.6em;
  font-family: 'Open Sans', sans-serif;
}
</style>
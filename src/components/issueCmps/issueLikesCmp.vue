<template>
    <section class="issue-likes flex column">
      <div class="likes-counts flex space-around" ref="likesCounts">
          <span>{{issue.likes.likeHappy}}</span>
          <span>{{issue.likes.likeSad}}</span>
          <span>{{issue.likes.likeAngry}}</span>
          <span>{{issue.likes.likeShocked}}</span>
          <span>{{issue.likes.likeDisgusted}}</span>
      </div>
      <div class="emojis">
          <span ref="likeHappy" title="Happy" @click.prevent="changeIssueLikes('likeHappy')">😃</span>
          <span ref="likeSad" title="Sad" @click.prevent="changeIssueLikes('likeSad')">😢</span>
          <span ref="likeAngry" title="Angry" @click.prevent="changeIssueLikes('likeAngry')">😡</span>
          <span ref="likeShocked" title="Shocked" @click.prevent="changeIssueLikes('likeShocked')">😮</span>
          <span ref="likeDisgusted" title="Disgusted" @click.prevent="changeIssueLikes('likeDisgusted')">🤢</span>
      </div>
    </section>
</template>

<script>
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
    if (!user) {
      return;
    }
    var issueLiked = user.likes.find(
      userLike => userLike.issueId === this.issue._id
    );
    if (issueLiked) this.$refs[issueLiked.likeType].classList.add('clicked');
  },

  methods: {
    changeIssueLikes(likeType) {
      var user = this.$store.getters[USER];
      if (!user) {
        this.$modal.show('loginModal');
        return;
      }

      var updatedIssue = JSON.parse(JSON.stringify(this.issue));
      var updatedUser = JSON.parse(JSON.stringify(user));
      var userLikes = user.likes;
      var issueLiked = userLikes.find(
        userLike => userLike.issueId === this.issue._id
      );
      
      
      if (!issueLiked) {
        updatedIssue.likes[likeType]++;
        this.$store
          .dispatch({ type: UPDATE_ISSUE, updatedIssue })
          .then(() => {
            console.log('Like updated successfully');
            updatedUser.likes.push({ issueId: this.issue._id, likeType });
            this.updateUser(updatedUser);
            this.$refs[likeType].classList.toggle('clicked');
            this.$socket.emit('issueLikesChanged', updatedIssue);
          })
          .catch(() => {
            console.log('Problem liking issue');
          });
      } else {
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
    }
  }
};
</script>

<style lang="scss" scoped>
.issue-likes {
  width: fit-content;
  align-self: flex-end;
  &:hover {
    .likes-counts {
      transform: translate(0, -1px);
      opacity: 1;
    }
  }
}

.emojis {
  span {
    cursor: pointer;
    font-size: 1.3em;
    opacity: 0.6;
    &:hover,
    &.clicked {
      opacity: 1;
    }
  }
}

.likes-counts {
  opacity: 0;
  text-align: center;
  font-size: 0.6em;
  font-family: 'Open Sans', sans-serif;
  transition: all 0.6s;
  transform: translate(0, 5px);
}
</style>
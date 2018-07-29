<template>
    <section class="issue-preview flex column space-between">
        <carousel :perPage="1" :autoplay="true" :autoplayTimeout="2000" :paginationEnabled="false">
            
            <!-- <slide v-for="issueImgUrl in issue.imgUrls" :key="issueImgUrl">
                <div class="issue-img" :title="issue.title" :style="{backgroundImage: `url('${issueImgUrl}')`}"></div>
            </slide> -->

            <slide>
                <div class="issue-img" :title="issue.title" :style="{backgroundImage: `url('${issue.imgUrls[0]}')`}"></div>
            </slide>
            <slide>
                <div class="issue-img" :title="issue.title" :style="{backgroundImage: `url('${issue.imgUrls[0]}')`}"></div>
            </slide>
            <slide>
                <div class="issue-img" :title="issue.title" :style="{backgroundImage: `url('${issue.imgUrls[0]}')`}"></div>
            </slide>
        </carousel>
        
        <div class="issue-info">
            <h2>{{issue.title}}</h2>
            <h3>{{issueAddress}}</h3>
            <h4>{{issue.category}}</h4>
        </div>

        <div class="likes-emojis flex">
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
        </div>
    </section>
</template>

<script>
import mapService from '@/services/mapService.js';
import { UPDATE_ISSUE } from '@/store/issueModule.js';

export default {
  name: 'issuePreview',

  props: {
    issue: {
      type: Object
    }
  },

  data() {
    return {
      issueAddress: ''
    };
  },

  mounted() {
    mapService
      .convertCoordsToAddress(this.issue.loc)
      .then(address => (this.issueAddress = address));
  },

  methods: {
    changeIssueLikes(likeType) {
      //TODO: only logged in user can like. if user is not logged- open the modal for signing up.
      //TODO: connect likes with user, so that when user logs in the emoji is marked clicked if he already clicked on it.
      var updatedIssue = JSON.parse(JSON.stringify(this.issue));
      if (this.$refs[likeType].classList.contains('clicked'))
        updatedIssue.likes[likeType]--;
      else updatedIssue.likes[likeType]++;
      this.$store
        .dispatch({
          type: UPDATE_ISSUE,
          issueId: updatedIssue._id,
          updatedIssue
        })
        .then(() => {
          // EventBusService.$emit(SHOW_MSG, { txt: 'Todo deleted', type: 'success' })
          console.log('Like updated successfully');

          this.$refs[likeType].classList.toggle('clicked');
        })
        .catch(() => {
          // EventBusService.$emit(SHOW_MSG, { txt: 'Problem with server! Could not delete todo', type: 'danger' })
          console.log('Problem liking issue');
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.issue-preview {
  // box-shadow: inset -2px 2px #7e7e7e;
  color: black;
  height: 100%;
  padding: 12px 10px 6px 10px;

  h2 {
    text-transform: capitalize;
    font-size: 1.2em;
  }

  h3 {
    font-size: 1em;
  }

  h4 {
    text-transform: capitalize;
    font-size: 0.8em;
  }
  img {
    max-width: 100px;
    max-height: 100px;
  }
}

.VueCarousel {
  height: 60%;
}

.issue-img {
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  height: 100%;
  width: 103%;
}

.issue-info {
  text-align: left;
}

.likes-emojis {
  justify-content: flex-end;
}

.likes-emojis div span:first-child {
  cursor: pointer;
  opacity: 0.6;
  &:hover,
  &.clicked {
    opacity: 1;
  }
}

.likes-emojis div span:last-child {
  text-align: center;
  font-size: 0.6em;
  font-family: 'Rubik', sans-serif;
}
</style>


<template>
    <section v-if = "user" class="main-user-container">
        <div class="top-user-container flex column">
        <label>
            upload pictures
            <imgUpload :single="true" @imgsUploaded="saveURLs"></imgUpload>
        </label>
        <div class="img-container"><img class="user-img" :src="user.imgUrl"/></div>
        <H1>{{user.username}}</H1>
        <div class="toggle-btns"><button :disabled="!toggleStatus" @click="toggleContent">User Reports</button>
        <button :disabled="toggleStatus" @click="toggleContent">User Comments</button></div>
        </div>
        <div class="user-info flex">
        <transition-group   name="slide-left" class="transition-content" >
        <div class="issue-container flex" @click="routeToIssue(issue._id)" v-if ="!toggleStatus" v-for="issue in issues" :key="issue._id">
            <div class="issue-img-container" :style="{backgroundImage: `url('${issue.imgUrls[0]}')`}"></div>
            <div class="issue-content flex column"><H3>{{issue.title}}</H3>
            <div>{{issue.desc}}</div></div>
        </div>
        </transition-group>
        <transition-group  name="slide-right" class="transition-content comment-content">
        <div class="comment-container" v-if ="toggleStatus" v-for="comment in comments" :key="comment._id">
            <h3>{{comment.txt}}</h3>
        </div>
        </transition-group>
        </div>
        
        
    </section>
</template>

<script>
// import { GET_ISSUE_BY_ID } from '@/store/issueModule.js';
import { LOAD_ISSUES } from "@/store/issueModule.js";
import { USER } from "@/store/userModule.js";
import { GET_COMMENTS } from "@/store/commentModule.js";
import { UPDATE_USER } from "@/store/userModule.js";
import imgUpload from "@/components/generalCmps/uploadImgCmp.vue";
// import { Carousel, Slide } from 'vue-carousel';

export default {
  data() {
    return {
      // toggleIssues:false,
      // toggleComments:true,
      toggleStatus: false,
      user: null,
      issues: null,
      comments: null
    };
  },

  computed: {},

  created() {
    this.user = this.$store.getters[USER];
    this.getIssues();
    this.getComments();
  },

  methods: {
    issuesBtn() {
      this.toggleComments = false;
      this.toggleIssues = true;
      // this.toggleComments = false;
      // setTimeout(()=>{
      //     this.toggleIssues = true;
      // },500)
    },
    commentsBtn() {
      this.toggleIssues = false;
      this.toggleComments = true;
      // this.toggleIssues = false;
      // setTimeout(()=>{
      //     this.toggleComments = true;
      // },500)
    },

    toggleContent() {
      this.toggleStatus = !this.toggleStatus;
    },
    getIssues() {
      this.$store
        .dispatch({ type: LOAD_ISSUES, getBy: { reportedBy: this.user._id } })
        .then(issues => {
          this.issues = issues;
        })
        .catch(err => console.warn(err));
    },

    getComments() {
      this.$store
        .dispatch({ type: GET_COMMENTS, getBy: { commenterId: this.user._id } })
        .then(comments => {
          this.comments = comments;
        })
        .catch(err => console.warn(err));
    },

    saveURLs(URLs) {
      this.user.imgUrl = URLs;
      this.$store
        .dispatch({ type: UPDATE_USER, user: this.user })
        .then(user => {
          this.user = this.$store.getters[GET_USER];
        })
        .catch(err => console.warn(err));
    },
    routeToIssue(issueId) {
      this.$router.push(`/issue/${issueId}`);
    }
  },

  directives: {},

  components: { imgUpload }
};
</script>

<style lang="scss" scoped>
.main-user-container {
  max-width: 500px;
  background: #fee575;
  margin: 0 auto;
  margin-top: 100px;
  .top-user-container {
    align-items: center;
    .img-container {
      text-align: center;
      .user-img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        margin: 20px;
        object-fit: cover;
      }
    }
    .toggle-btns {
      width: 100%;
      text-align: center;
      button {
        width: 50%;
      }
    }
  }

  .slide-left-leave-active,
  .slide-left-enter-active {
    transition: 1s ease-in-out;
  }
  .slide-left-enter {
    transform: translate(-100%, 0);
    opacity: 0;
  }
  .slide-left-leave-to {
    transform: translate(-100%, 0);
    opacity: 0;
  }

  .slide-right-leave-active,
  .slide-right-enter-active {
    transition: all 1s ease-in-out;
  }
  .slide-right-enter {
    transform: translate(100%, 0);
    opacity: 0;
  }
  .slide-right-leave-to {
    transform: translate(100%, 0);
    opacity: 0;
  }

  .user-info {
    position: relative;
    .transition-content {
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      position: absolute;
    }
    .issue-container {
      border: 1px solid gray;
      margin-bottom: 3px;
      cursor: pointer;
      .issue-img-container {
        background-position: center center;
        background-size: cover;
        background-repeat: no-repeat;
        min-width: 20%;
      }
      .issue-content {
        padding: 0 7px;
      }
    }
    .comment-container {
      border: 1px solid gray;
    }
  }
}
</style>

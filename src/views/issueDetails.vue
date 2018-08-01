
<template>
    <section v-if = "issue" class="issue-details container flex column" >
        <div class="issue-header flex space-between align-center">
            <h1 class="issue-title">{{issue.title}}</h1>
            <button @click= "resolveIssue">
              <font-awesome-icon icon="check" />
              Resolve
            </button>
        </div>
        <div class="issue-info">
            <p>{{issue.desc}}</p>
            <h5>
              Category: <label>{{issue.category}}</label>
            </h5>
            <h5>
              Status: <label>{{issue.status}}</label>
            </h5>
            <h5>
              Reported <label>{{issue.createdAt | relativeTime}}</label> 
            </h5>
        </div>

        <div class="issue-imgs">
            <img v-for="(imgUrl,idx) in issue.imgUrls" :key="idx" :src="imgUrl" :title="issue.title" :alt="issue.title">
        </div>

        <!-- <carousel
          :perPage="1"
          :autoplay="true"
          :autoplayTimeout="2000"
          :paginationActiveColor="'#413e3e'"
          :paginationPadding="5"
          :loop="true"
        >
          <slide v-for="(imgUrl,idx) in issue.imgUrls" :key="idx">
            <div
              class="issue-img"
              :title="issue.title"
              :style="{backgroundImage: `url('${imgUrl}')`}"
            >
            </div>
          </slide>
        </carousel> -->

        <GmapMap v-if = "issue.loc" :center="issue.loc" :zoom="17" map-type-id="terrain">
            <GmapMarker
              :position="issue.loc"
              :clickable="false"
              :icon="`img/map-icons/${issue.category}-${issue.status}.png`"
              />
        </GmapMap>

        <div class="issue-comments">
            <h2>Comments</h2>
            <button class="add-btn" @click = "toggleModal">Add</button>
            <div class="comments-container" v-for ='comment in comments' :key="comment._id">
                <div class="comment-container flex">
                    <img :src = "comment.commenter.imgUrl">
                    <p>{{comment.txt}}</p>
                </div>
            </div>
            
            <div v-if="openModal" class="reply-box flex" >
              <div class="reply">comment:
                <button @click="toggleModal">X</button>
                <div contenteditable="true" ref="commentContent" v-focus = true></div>
                <button @click="addComment">Add Comment</button>
              </div>
            </div>
        </div>
    </section>
</template>

<script>
import utilsService from '@/services/utilsService.js'
import { GET_ISSUE_BY_ID } from "@/store/issueModule.js";
import { UPDATE_ISSUE } from "@/store/issueModule.js";
import { DELETE_ISSUE } from "@/store/issueModule.js";
import { GET_COMMENTS } from "@/store/commentModule.js";
import { LOAD_COMMENTS } from "@/store/commentModule.js";
import { DELETE_COMMENTS } from "@/store/commentModule.js";
import { USER } from "@/store/userModule.js";
import { CURRLOC } from "@/store/userModule.js";
import { ADD_COMMENT } from "@/store/commentModule.js";
import { Carousel, Slide } from "vue-carousel";

export default {
  data() {
    return {
      issue: {},
      comments: [],
      openModal: false,
      user:{},
    };
  },

  created() {
    let issueId = this.$route.params.issueId;
    this.getIssue(issueId);
    this.getComments(issueId);
    this.user = this.$store.getters[USER];
  },

  methods: {
    getIssue(issueId) {
      this.$store
        .dispatch({ type: GET_ISSUE_BY_ID, issueId })
        .then(issue => {
          this.issue = issue;
        })
        .catch(err => console.warn(err));
    },

    getComments(issueId) {
      this.$store
        .dispatch({ type: GET_COMMENTS, getBy: { issueId: issueId } })
        .then(comments => {
          this.comments = comments;
        })
        .catch(err => console.warn(err));
    },

    addComment() {
      var txt = this.$refs.commentContent.innerText;
      this.$store
        .dispatch({
          type: ADD_COMMENT,
          payload: {
            comment: {
              issueId: this.issue._id,
              commenterId: this.user._id,
              txt,
              createdAt: Date.now()
            },
            commenter: this.user,
          }
        })
        .then(comment => {
          this.notify('Your comment was added', 'success','Comment Status')
        })
        .catch(err => console.warn(err));
      this.toggleModal();
    },

    toggleModal() {
      this.openModal = this.openModal ? false : true;
    },

    resolveIssue() {
      if(this.issue.status === 'closed') {
        this.notify('Report already closed', 'warn');
        return;
      }  
      var userLoc = this.$store.getters[CURRLOC];
      var updatedIssue = JSON.parse(JSON.stringify(this.issue));
      var userDistance = utilsService.getDistanceFromLatLngInKm(updatedIssue.loc,userLoc);
      if(this.authorizedToClose(this.user, updatedIssue, userDistance)) {
        updatedIssue.status = 'closed';
        this.notify('The report is now closed', 'success','Report Status');
      } else if(userDistance <=0.5){
        updatedIssue.nonIssueReportCount++;
        this.notify('The report is now modified', 'success','Report Status');
      } else {
        this.notify('Failed to modify report', 'warn','Report Status');
        return;
      }  
      this.$store.dispatch({type:UPDATE_ISSUE, updatedIssue})
        .then(updatedIssue=> {
          this.issue = updatedIssue;
        })
        .catch(err=>console.warn(err));
    },

    authorizedToClose(user, updatedIssue, userDistance) {
      return user._id === updatedIssue.reportedBy||user.isAdmin||
      (updatedIssue.nonIssueReportCount === 2 && userDistance <=0.5);
    },

    notify(text, type, title) {
        this.$notify({
          group: 'foo',
          title: title,
          text: text,
          type: type,
          duration: 5000,
        });
    },
    deleteIssue() {
      this.$store.dispatch({type:DELETE_COMMENTS, deleteBy:{issueId:this.issue._id}})
        .then(() => {
          this.$store.dispatch({type:DELETE_ISSUE, issueId:this.issue._id})
            .then(() => {
              console.log('issue deleted');
              this.notify(this.issue.title +' '+'deleted', 'success', 'Report Delete');
              this.$router.push('/');
            }).catch(err => console.warn(err))
        })
        .catch(err => console.warn(err));
    },

    deleteComment(commentId) {
      this.$store.dispatch({type:DELETE_COMMENTS, deleteBy:{_id:commentId}})
        .then(()=> {
          this.comments = this.$store.getters[LOAD_COMMENTS];
        }).catch(err=> console.warn)
    }
  },  

  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  },

  components: {
    Carousel,
    Slide
  }
};
</script>

<style lang="scss" scoped>
.issue-details {
  padding-top: 10px;
  padding-bottom: 20px;
}

.issue-header {
  margin-bottom: 15px;
  button {
    color: #69c8a4;
    font-size: 0.7em;
    border-radius: 50%;
    border: 1.5px solid #69c8a4;
    background-color: white;
    height: 5em;
    transition: all 0.3s;
    &:hover {
      color: white;
      border-color: #4b9076;
      background-color: #69c8a4;
    }
  }
}

.issue-title {
  font-size: 2em;
  text-transform: capitalize;
}

svg {
  display: block;
  margin: 0 auto;
}

.issue-info {
  margin-bottom: 10px;
  p {
    font-style: italic;
    margin: 0 0 15px 0;
    &:first-letter {
      text-transform: capitalize;
    }
  }
}

h5 {
  color: rgb(175, 172, 172);
  font-size: 0.75em;
  font-weight: normal;
  height: fit-content;
  &:not(:last-of-type) {
    text-transform: capitalize;
  }
}

label {
  color: #439475;
}

.issue-imgs {
  img {
    width: 100%;
    margin-bottom: 10px;
  }
}

// .VueCarousel {
//   margin-bottom: 50px;
//   height: 60vh;
// }

// .issue-img {
//   background-position: center center;
//   background-size: cover;
//   background-repeat: no-repeat;
//   height: 100%;
//   width: 100%;
// }

.vue-map-container {
  width: 100%;
  height: 200px;
  margin-bottom: 20px;
}

.issue-comments {
  h2 {
    display: inline-block;
    margin-bottom: 15px;
  }

  button {
    border-radius: 8px;
    border: 1.5px solid #69c8a4;
    background-color: white;
    color: #69c8a4;
    font-size: 0.9em;
    float: right;
    padding: 5px 10px;
    transition: all 0.3s;
    &:hover {
      color: white;
      border-color: #4b9076;
      background-color: #69c8a4;
    }
  }
}

.comment-container {
  margin-bottom: 10px;
  
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  p {
    margin: 0;
    height: auto;
    background: #f9f8f7;
  }
}

.reply-box {
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: rgba(237, 237, 245, 0.596);
}

.reply {
  width: 300px;
  height: 200px;
  background: grey;
  opacity: 1;
}
</style>


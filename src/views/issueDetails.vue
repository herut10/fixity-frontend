
<template>
    <section v-if = "issue" class="details-container flex column" >
      <GmapMap v-if = "issue.loc" :center="issue.loc" :zoom="12" map-type-id="terrain" style="min-width: 500px; min-height: 200px">
        <GmapMarker :position="issue.loc"/>
      </GmapMap>

      <h1 class="title">{{issue.title}}</h1>
      <div class="issue-container flex space-between">
        <div>Description: {{issue.desc}}</div>
        <div>
          <div>Category: {{issue.category}}</div>
          <div>Status: {{issue.status}}</div>
          <button @click= "resolveIssue">Resolve Issue</button>
          <button v-if="user.isAdmin" @click = 'deleteIssue'>delete</button>
        </div>
      </div>


      <carousel :per-page="1" >
        <slide v-for="(img,idx) in issue.imgUrls" :key="idx">
          <img :src="img" >
        </slide>
        
      </carousel>


            <h2>Comments:</h2><button class="add-btn" @click = "toggleModal">Add Comment</button>
        <div class="comments-container" v-for ='comment in comments' :key="comment._id">
            <div class="card-container">
            <img :src = "comment.commenter.imgUrl"><div class="comment-box">{{comment.txt}}</div><button @click="deleteComment(comment._id)">delete comment</button>
            </div>
        </div>
        
            <div v-if="openModal" class="reply-box flex" >
              <div class="reply">comment:
              <button @click="toggleModal">X</button>
                <div contenteditable="true" ref="commentContent" v-focus = true></div>
                <button  @click="addComment">Add Comment</button>
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

  computed: {},

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
          type:type,
          duration:5000,
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
.details-container {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  outline: 1px solid gray;
  height: 100%;
  margin-top: 50px;
  margin-bottom: 100px;
  padding-bottom: 20px;
  .title {
    text-align: center;
    padding-top: 10px;
  }
  .issue-container {
    padding: 10px;
  }
  img {
    text-align: center;
  }
  // .VueCarousel {
  // }
  
  .add-btn {
    padding: 30px;
    width: 100px;
    margin: 0 auto;
    margin-bottom: 10px;
  }
  .comments-container {
    .comment-box {
      margin: 0 auto;
      width: 300px;
      height: auto;
      background: #e5e3df;
      box-shadow: 10px 10px 9px -1px rgba(0, 0, 0, 0.64);
    }
    .card-container {
      margin-bottom: 10px;
      img {
        width: 20px;
        height: 20px;
      }
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
}
</style>


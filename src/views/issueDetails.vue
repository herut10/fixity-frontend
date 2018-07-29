
<template>
    <section v-if = "issue" class="details-container flex column" >
      <GmapMap v-if = "issue.loc" :center="issue.loc" :zoom="12" map-type-id="terrain" style="min-width: 500px; min-height: 200px">
        <GmapMarker :position="issue.loc"/>
      </GmapMap>

      <h1>{{issue.title}}</h1>
      <div class="issue-container flex column">
      <div>Description: {{issue.desc}}</div>
      <div>Category: {{issue.category}}</div>
      <div>Status: {{issue.status}}</div>
      </div>


      <carousel :per-page="1" >
        <slide v-for="(img,idx) in issue.imgUrls" :key="idx">
          <img :src="img" >
        </slide>
        
      </carousel>


            <h2>Comments:</h2><button class="add-btn" @click = "toggleModal">Add Comment</button>
        <div class="comments-container" v-for ='comment in comments' :key="comment._id">
            <div class="card-container">
            <img :src = "comment.commenter.imgUrl"><div class="comment-box">{{comment.txt}}</div>
            </div>
        </div>
        
            <div v-if="openModal" class="reply-box flex" >
              <div class="reply"  >comment:
              <button @click="toggleModal">X</button>
                <div contenteditable="true" ref="commentContent" v-focus = true></div>
                <button  @click="addComment">Add Comment</button>
              </div>
            </div>


    </section>
</template>

<script>
import { GET_ISSUE_BY_ID } from '@/store/issueModule.js';
import { GET_COMMENTS } from '@/store/commentModule.js';
import { USER } from '@/store/userModule.js';
import { ADD_COMMENT } from '@/store/commentModule.js';
import { Carousel, Slide } from 'vue-carousel';

export default {

  data() {
    return {
      issue: {},
      comments:[],
      openModal :false,
    }
  },  

    computed:{
      
    },
  

  created() {
      let issueId = this.$route.params.issueId;
      console.log(issueId);
      
      this.getIssue(issueId);
      this.getComments(issueId);
    },


  methods: {
    getIssue(issueId) {
      this.$store.dispatch({ type: GET_ISSUE_BY_ID, issueId })
        .then(issue => {
          console.log(issue);
          
          this.issue = issue;
        }).catch(err => console.warn(err))
    },

    getComments(issueId) {
      this.$store.dispatch({ type: GET_COMMENTS, getBy:{issueId : issueId}})
        .then(comments=> {
          this.comments = comments;
        }).catch(err => console.warn(err))
    },

    addComment() {
      var txt = this.$refs.commentContent.innerText;
      var commenter = this.$store.getters[USER];
      this.$store.dispatch({type: ADD_COMMENT,payload:{comment:{issueId: this.issue._id, commenterId: commenter._id,
      txt, createdAt: Date.now()},commenter}})
        .then(comment=> console.log('comment added'))
        .catch(err=>console.warn(err))
        this.toggleModal();
    },

    toggleModal() {
      this.openModal = (this.openModal)? false : true;
    }
  },

  directives: {
  focus: {
    inserted: function (el) {
      el.focus()
    }
  }
},

    components: {
      Carousel,
      Slide,
    
    
    }
};
</script>

<style lang="scss" scoped>
  .details-container  {
    position: relative;
    width: 700px;
    margin: 0 auto;
    outline: 1px solid gray;
    height: 100%;
    .issue-container {
      float: left;
    }
      .add-btn{
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
        background: #E5E3DF;
        box-shadow: 10px 10px 9px -1px rgba(0,0,0,0.64);
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
          width:300px;
          height: 200px;
          background: grey;
          opacity: 1;

        }
          
  }
</style>


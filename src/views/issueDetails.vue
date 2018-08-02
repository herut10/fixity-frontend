
<template>
    <section v-if = "issue" class="issue-details container flex column" >
        <div class="issue-header flex space-between align-center">
            <h1 class="issue-title">{{issue.title}}</h1>
            <button @click= "resolveIssue">
              <font-awesome-icon icon="check" />
              Resolve
            </button>
        </div>

        <div class="issue-content">
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

            <carousel :perPage="1" :paginationEnabled="false" :navigationEnabled="issue.imgUrls.length>1">
              <slide v-for="(imgUrl,idx) in issue.imgUrls" :key="idx">
                <img :src="imgUrl" :title="issue.title" :alt="issue.title" />
              </slide>
            </carousel>

            <GmapMap v-if = "issue.loc" :center="issue.loc" :zoom="17" map-type-id="terrain">
                <GmapMarker
                  :position="issue.loc"
                  :clickable="false"
                  :icon="`img/map-icons/${issue.category}-${issue.status}.png`"
                  />
            </GmapMap>
        </div>

        <div class="issue-comments">
            <h2>Communicate</h2>
              <div class="new-message comment-container flex row">
                <div class="commenter">
                  <img v-if="user" :src = "user.imgUrl">
                  <img v-else src = "http://via.placeholder.com/150x150">

                  <h6 v-if="user">{{user.username}}</h6>
                  <h6 v-else>Unknown</h6>
                </div>
              <div class="add-comment">
                <form  class=" flex align-center space-between">
                  <input v-on:keyup.enter="addComment" class="user-input" placeholder="Care to contribute?" v-model="newMessage" type="text"/>
                  <button @click.prevent="addComment" class="btn send-btn"><font-awesome-icon icon="arrow-right" /></button>
                </form>
              </div>
            </div>
            <div class="comments-container">
                <div class="comment-container flex" v-for ='comment in reverseComments' :key="comment._id">
                    <div class="commenter">
                        <img :src = "comment.commenter.imgUrl">
                        <h6>{{comment.commenter.username}}</h6>
                    </div>
                    <div class="comment-content flex column space-between">
                        <p>{{comment.txt}}</p>
                        <p class="comment-time">{{comment.createdAt | relativeTime}}</p>
                    </div>
                </div>
            </div>

        </div>
    </section>
</template>

<script>
import utilsService from "@/services/utilsService.js";
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
      issue: null,
      comments: [],
      newMessage: ""
    };
  },

  created() {
    let issueId = this.$route.params.issueId;
    this.getIssue(issueId);
    this.getComments(issueId);
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
          console.log(this.comments);
        })
        .catch(err => console.warn(err));
    },

    addComment() {
      if (!this.user) {
        this.$modal.show("loginModal");
        return;
      }
      var comment = {
        comment: {
          issueId: this.issue._id,
          commenterId: this.user._id,
          txt: this.newMessage,
          createdAt: Date.now()
        },
        commenter: this.user
      };
      this.newMessage = "";
      this.notify("Your comment was added", "success", "Comment Status");
      this.$socket.emit("commentSent", comment);
    },

    resolveIssue() {
      if (this.issue.status === "closed") {
        this.notify("Report already closed", "warn");
        return;
      }
      if (!this.user) {
        this.$modal.show("loginModal");
        return;
      }
      var userLoc = this.$store.getters[CURRLOC];
      var updatedIssue = JSON.parse(JSON.stringify(this.issue));
      var userDistance = utilsService.getDistanceFromLatLngInKm(
        updatedIssue.loc,
        userLoc
      );
      if (this.authorizedToClose(this.user, updatedIssue, userDistance)) {
        updatedIssue.status = "closed";
        this.notify("The report is now closed", "success", "Report Status");
      } else if (userDistance <= 0.5) {
        updatedIssue.nonIssueReportCount++;
        this.notify("The report is now modified", "success", "Report Status");
      } else {
        this.notify("Failed to modify report", "warn", "Report Status");
        return;
      }
      this.$store
        .dispatch({ type: UPDATE_ISSUE, updatedIssue })
        .then(updatedIssue => {
          this.issue = updatedIssue;
        })
        .catch(err => console.warn(err));
    },

    authorizedToClose(user, updatedIssue, userDistance) {
      return (
        user._id === updatedIssue.reportedBy ||
        user.isAdmin ||
        (updatedIssue.nonIssueReportCount === 2 && userDistance <= 0.5)
      );
    },

    notify(text, type, title) {
      this.$notify({
        group: "foo",
        title: title,
        text: text,
        type: type,
        duration: 5000
      });
    },
    deleteIssue() {
      this.$store
        .dispatch({
          type: DELETE_COMMENTS,
          deleteBy: { issueId: this.issue._id }
        })
        .then(() => {
          this.$store
            .dispatch({ type: DELETE_ISSUE, issueId: this.issue._id })
            .then(() => {
              console.log("issue deleted");
              this.notify(
                this.issue.title + " " + "deleted",
                "success",
                "Report Delete"
              );
              this.$router.push("/");
            })
            .catch(err => console.warn(err));
        })
        .catch(err => console.warn(err));
    },

    deleteComment(commentId) {
      this.$store
        .dispatch({ type: DELETE_COMMENTS, deleteBy: { _id: commentId } })
        .then(() => {
          this.comments = this.$store.getters[LOAD_COMMENTS];
        })
        .catch(err => console.warn);
    }
  },
  computed: {
    user() {
      return this.$store.getters[USER];
    },
    reverseComments() {
      return this.comments.reverse();
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
.comments-container {
  max-height: 500px;
  overflow-y: auto;
  padding-right: 5px;
}

@media (min-width: 980px) {
  .issue-content {
    // display: grid;
    // grid-template-columns: 2fr 1fr;
  }

  // div.issue-info {
  //   grid-column-start: 1;
  //   grid-column-end: -1;
  // }

  div.issue-comments {
    margin: 0 auto;
    width: 450px;
  }

  div.vue-map-container {
    // grid-row-start: 1;
    // grid-column-start: 2;
    height: 200px;
  }
}
.user-input {
  width: 90%;
  color: #439475;
  border: 1px #c4c0c0 solid;
  box-shadow: brown;
  background-color: white;
  padding: 10px;
  margin-right: 5px;
}

.issue-details {
  padding-top: 10px;
  padding-bottom: 20px;
}

.issue-header {
  margin-bottom: 10px;
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
.btn.send-btn {
  width: 35px;
  height: 35px;
  border-radius: 50%;
}

label {
  color: #439475;
}

.VueCarousel {
  margin: 0 auto 20px;
  min-width: 245px;
  max-width: 500px;
  width: 100%;

  img {
    margin-bottom: 10px;
    min-width: 245px;
    max-width: 500px;
    width: 100%;
  }
}

.VueCarousel-navigation-button {
  padding: 8px 0 8px 8px;
}

.issue-img {
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  height: 100%;
  width: 100%;
}

.vue-map-container {
  width: 100%;
  max-width: 500px;
  height: 200px;
  margin: 0 auto 20px;
}

.issue-comments {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;

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

.add-comment {
  width: 100%;
}

.comment-container {
  margin-bottom: 10px;
}

.comment-content {
  background: #f6f6f6;
  width: 100%;
  padding: 5px;

  p {
    margin: 0;
  }
}

.comment-time {
  color: #c3bebe;
  font-size: 0.7em;
  align-self: flex-end;
}

.commenter {
  margin-right: 10px;

  img {
    border-radius: 50%;
    display: block;
    width: 50px;
    height: 50px;
  }

  h6 {
    font-weight: normal;
  }
}
</style>


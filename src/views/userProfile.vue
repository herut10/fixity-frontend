
<template>
    <section v-if = "user && issues && comments " class="userProfile main-user-container">
        <div class="top-user-container flex column">
            <H1>{{user.username}}</H1>
            <div class="img-container"><img :src="user.imgUrl"/>
            
            </div>
            <div class="upload-container flex align-center space-between">
                <button class="upload-btn" @click="uploadPic">Save</button>
                <imgUpload class="img-uploader" @imgsUploaded="saveURL"><span class="upload">Upload</span>
                <font-awesome-icon icon="camera" class="active"/></imgUpload>
            </div> 
        </div>
        <div  class="right-side flex column">
            <div class="toggle-btns flex">
                <button :disabled="!toggleStatus" :class="{ active:!toggleStatus }" @click="toggleContent">User Reports</button>
                <button :disabled="toggleStatus" :class="{active:toggleStatus}" @click="toggleContent">User Comments</button>
            </div>
        <div class="user-info flex" :class="{ commentsSlide: toggleStatus, issuesSlide:!toggleStatus }">
            <user-Issues class="issues-container" :userIssues="issues"></user-Issues>
            <user-comments class="comments-container" :userComments="comments"></user-comments>
        </div>
        </div>
    </section>
</template>

<script>
import userIssues from "@/components/issueCmps/userIssues.vue";
import userComments from "@/components/issueCmps/userComments.vue";
import { LOAD_ISSUES } from "@/store/issueModule.js";
import { USER } from "@/store/userModule.js";
import { GET_USER } from "@/store/userModule.js";
import { GET_COMMENTS } from "@/store/commentModule.js";
import { UPDATE_USER } from "@/store/userModule.js";
import imgUpload from "@/components/generalCmps/uploadImgCmp.vue";

export default {
  data() {
    return {
      toggleStatus: false,
      user: null,
      issues: null,
      comments: null
    };
  },

  created() {
    this.user = this.$store.getters[USER];
    this.getIssues();
    this.getComments();
  },

  methods: {
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

    saveURL(URL) {
      console.log(URL);

      this.user.imgUrl = URL;
    },

    uploadPic() {
      this.$store
        .dispatch({ type: UPDATE_USER, user: this.user })
        .then(user => console.log("user updated"))
        .catch(err => console.warn(err));
    }
  },

  components: {
    userIssues,
    userComments,
    imgUpload
  }
};
</script>

<style lang="scss" scoped>
.main-user-container {
  padding-top: 30px;
  padding-bottom: 15px;
  overflow: hidden;
  max-width: 100%;
  margin: 0 auto;
  h1 {
    font-family: "Roboto", sans-serif;
    font-size: 2.5em;
  }
}

.top-user-container {
  align-items: center;
  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin: 20px;
    object-fit: cover;
  }
}

.upload-container {
  width: 160px;
  span {
    margin-right: 10px;
  }
  .img-uploader {
    border-radius: 8px;
    border: 1.5px solid #69c8a4;
    color: #69c8a4;
    font-size: 0.9em;
    background-color: white;
    padding: 5px 10px;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
    margin-bottom: 20px;
    &:hover {
      color: white;
      border-color: #4b9076;
      background-color: #69c8a4;
    }
  }
}

.img-container {
  text-align: center;
}

.upload-btn {
  border-radius: 8px;
  border: 1.5px solid #69c8a4;
  color: #69c8a4;
  font-size: 0.9em;
  background-color: white;
  padding: 5px 10px;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  margin-bottom: 20px;
  &:hover {
    color: white;
    border-color: #4b9076;
    background-color: #69c8a4;
  }
}

.toggle-btns {
  width: 90%;
  text-align: center;
  margin-bottom: 10px;
  align-self: center;
  button {
    &:first-child {
      border-radius: 8px 0 0 8px;
    }
    &:last-child {
      border-radius: 0 8px 8px 0;
    }
    &:hover {
      color: white;
      background-color: #69c8a4b9;
    }
    font-size: 1.07em;
    width: 50%;
    background-color: white;
    color: #69c8a4;
    border: 1px solid #69c8a4;
    transition: all 0.3s;
  }
  .active {
    background-color: #69c8a4;
    color: white;
  }
}

.issues-container {
  max-height: 400px;
  overflow-y: auto;
}

.comments-container {
  max-height: 400px;
  overflow-y: auto;
}

.commentsSlide {
  transform: translate(-50%, 0);
  transition-timing-function: ease-in;
  transition-duration: 0.6s;
  opacity: 1;
}

.user-info {
  width: 200%;
  transition-timing-function: ease-in;
  transition-duration: 0.6s;
}

@media (min-width: 700px) {
  .main-user-container {
    display: flex;
    h1 {
      padding-top: 0;
      display: flex;
    }
  }
  .top-user-container {
    width: 50%;
  }
  .right-side {
    overflow: hidden;
  }
}

@media (min-width: 1000px) {
  .main-user-container {
    max-width: 80%;
  }
}
@media (min-width: 1200px) {
  .main-user-container {
    max-width: 70%;
  }
}
</style>

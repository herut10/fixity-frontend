
<template>
    <section v-if = "user && issues && comments " class="main-user-container">
        <div class="top-user-container flex column">
            <H1>{{user.username}}</H1>
            <div class="img-container"><img class="user-img" :src="user.imgUrl"/></div>
            <label>upload pictures
                <imgUpload @imgsUploaded="saveURL"></imgUpload>
            </label>
            <button @click="uploadPic">Upload Picture</button>
            <div class="toggle-btns">
                <button :disabled="!toggleStatus" @click="toggleContent">User Reports</button>
                <button :disabled="toggleStatus" @click="toggleContent">User Comments</button>
            </div>
        </div>
        <div class="user-info flex" v-bind:class="{ commentsSlide: toggleStatus, issuesSlide:!toggleStatus }">
            <user-Issues :userIssues="issues"></user-Issues>
            <user-comments :userComments="comments"></user-comments>
        </div>
    </section>
</template>

<script>
import userIssues from '@/components/issueCmps/userIssues.vue'
import userComments from '@/components/issueCmps/userComments.vue'
import { LOAD_ISSUES } from '@/store/issueModule.js';
import { USER } from '@/store/userModule.js';
import { GET_USER } from '@/store/userModule.js';
import { GET_COMMENTS } from '@/store/commentModule.js';
import { UPDATE_USER } from '@/store/userModule.js';
import imgUpload from "@/components/generalCmps/uploadImgCmp.vue";

export default {

    data() {
        return {
        toggleStatus:false,
        user:null,
        issues:null,
        comments:null,
        }
    },  

    created() {
        this.user = this.$store.getters[USER]
        this.getIssues();
        this.getComments();
    },

    methods: {
        toggleContent() {
            this.toggleStatus = !this.toggleStatus;
        },
        getIssues() {
            this.$store.dispatch({type:LOAD_ISSUES, getBy:{reportedBy : this.user._id}})
                .then(issues => {
                    this.issues = issues
                    })
                    .catch(err => console.warn(err));
        },

        getComments() {
            this.$store.dispatch({type:GET_COMMENTS, getBy:{commenterId : this.user._id}})
                .then(comments=> {
                    this.comments = comments;
                }).catch(err => console.warn(err));
        },

                saveURL(URL) {
                console.log(URL);
                
                this.user.imgUrl = URL;
            },

            uploadPic() {
                this.$store.dispatch({type:UPDATE_USER, user:this.user})
                    .then(user=> console.log('user updated'))                                                                
                    .catch(err=>console.warn(err))
            }
    },    

    components: {
        userIssues,
        userComments,
        imgUpload,
    },
};
</script>

<style lang="scss" scoped>
    .main-user-container {
        overflow: hidden;
        max-width: 100%;
        margin: 0 auto;
    }    

    .top-user-container {
        align-items: center;
    }    

    .img-container {
        text-align: center;
    }    

    .user-img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        margin: 20px;
        object-fit: cover;
    }
            
            .toggle-btns{
                width: 100%; 
                text-align: center;

                button {
                    width: 50%;
                    border: none
                }   
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
            
    
</style>

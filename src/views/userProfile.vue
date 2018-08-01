
<template>
    <section v-if = "user && issues && comments " class="main-user-container">
        <div class="top-user-container flex column">
            <button @click="openWidget" id="upload_widget_opener">Upload Picture</button>
            <div class="img-container"><img class="user-img" :src="user.imgUrl"/></div>
            <H1>{{user.username}}</H1>
            <div class="toggle-btns">
                <button :disabled="!toggleStatus" @click="toggleContent">User Reports</button>
                <button :disabled="toggleStatus" @click="toggleContent">User Comments</button>
            </div>
        </div>
        <div class="user-info flex" v-bind:class="{ commentsSlide: toggleStatus, issuesSlide:!toggleStatus }">
            <user-comments  :userComments="comments"></user-comments>
            <user-Issues    :userIssues="issues"></user-Issues>
        </div>
    </section>
</template>

<script>
import userIssues from '@/components/issueCmps/userIssues.vue'
import userComments from '@/components/issueCmps/userComments.vue'
import { LOAD_ISSUES } from '@/store/issueModule.js';
import { USER } from '@/store/userModule.js';
import { GET_COMMENTS } from '@/store/commentModule.js';
import { UPDATE_USER } from '@/store/userModule.js';

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

        openWidget() {
            new Promise((reject, resolve) => {
                cloudinary.openUploadWidget({
                    cloud_name: "djewvb6ty",
                    upload_preset: "qtz1qjeq",
                    sources: ["local"]
                },
                function(result, error) {
                    if (error) reject(error);
                    else resolve(result);
                }
                );
            })
                .then(image => {
                    this.user.imgUrl = image[0].secure_url;
                    this.$store.dispatch({type:UPDATE_USER, user:this.user})
                        .then(user=>{
                            this.user = this.$store.getters[GET_USER]
                        }).catch(err=>console.warn(err))
                })
                .catch(res => console.warn(err));
            },

            routeToIssue(issueId) {
                this.$router.push(`/issue/${issueId}`)
            },
    },    

    components: {
        userIssues,
        userComments,
    },
};
</script>

<style lang="scss" scoped>
    .main-user-container {
        max-width: 100%;
        background: #fee575;
        margin: 0 auto;
        margin-top:100px;

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
            .toggle-btns{
                width: 100%; 
                text-align: center;

                button {
                    width: 50%;
                    border: none
                }   
            }
        }
                
        .commentsSlide {
            transform: translate(-50%, 0);
            transition-timing-function: ease-in;
            transition-duration: 1.5s;
            opacity: 1;
        }

        .user-info {
            overflow: hidden;
            width: 200%;
            transition-timing-function: ease-in;
            transition-duration: 1.5s;
            
            
        }
            
    }
</style>

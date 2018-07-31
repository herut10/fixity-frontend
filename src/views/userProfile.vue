
<template>
    <section v-if = "user" class="main-user-container">
        <div class="top-user-container flex column">
            <button @click="openWidget" id="upload_widget_opener">Upload Picture</button>
            <div class="img-container"><img class="user-img" :src="user.imgUrl"/></div>
            <H1>{{user.username}}</H1>
            <div class="toggle-btns">
                <button :disabled="!toggleStatus" @click="toggleContent">User Reports</button>
                <button :disabled="toggleStatus" @click="toggleContent">User Comments</button>
            </div>
        </div>
        <div class="user-info flex">
            <transition-group name="slide-left" class="transition-content" >
                <user-Issues v-if="!toggleStatus" v-for="issue in issues"
                :key="issue._id" :issue="issue"
                @click.native="routeToIssue(issue._id)"></user-Issues>
            </transition-group>
            <transition-group  name="slide-right" class="transition-content">
                <user-comments v-if ="toggleStatus" v-for="comment in comments"
                :key="comment._id" :comment="comment"
                @click.native="routeToIssue(comment.issueId)"></user-comments>
            </transition-group>
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
                    this.issues = issues})
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
        max-width: 500px;
        height: 100vw;
        background: #fee575;
        margin: 0 auto;
        margin-top:100px;
        border: 1px solid black;

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
            transition: 1s ease-in-out;
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
                right:0;
            }
        }
            
    }
</style>

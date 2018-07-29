
<template>
    <section v-if = "user" class="main-user-container flex column">
        <button @click="openWidget" id="upload_widget_opener">Upload Picture</button>
        <div class="img-container"><img class="user-img" :src="user.imgUrl"/></div>
        <h1>{{user.username}}</h1>
        <div><button :disabled="toggleContent" @click="toggleBtn">User Reports</button>
        <button :disabled="toggleComment" @click="toggleBtn">User Comments</button></div>
        
        <div class="user-info flex">
        <transition-group v-if ="toggleContent" name="slide-left" class="transition-content flex column" >
        <div class="content "  v-for="issue in issues" :key="issue._id">
            <div class="box-content">
            <div>{{issue.title}}</div>
            </div>
        </div>
        </transition-group>
        <transition-group  v-if ="toggleComment" name="slide-right" class="transition-content righ-content">
        <div class="content" v-for="comment in comments" :key="comment._id">
           <div class="box-content">
            <div>{{comment.txt}}</div>
           </div>
        </div>
        </transition-group>
        </div>
        
        
    </section>
</template>

<script>
// import { GET_ISSUE_BY_ID } from '@/store/issueModule.js';
import { LOAD_ISSUES } from '@/store/issueModule.js';
import { GET_USER } from '@/store/userModule.js';
import { GET_COMMENTS } from '@/store/commentModule.js';
import { UPDATE_USER } from '@/store/userModule.js';
// import { Carousel, Slide } from 'vue-carousel';

export default {

    data() {
        return {
        toggleContent:false,
        toggleComment:true,
        user:null,
        issues:null,
        comments:null,
        }
    },  

    computed:{

    },


    created() {
        this.user = this.$store.getters[GET_USER]
        this.getIssues();
        this.getComments();
    },


    methods: {
        toggleBtn() {
            setTimeout(()=>{
                this.toggleComment = (this.toggleComment)? false : true;
            },100)

            setTimeout(()=>{
                this.toggleContent = (this.toggleComment)? false : true;
            },100)
            
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
                .catch(res => {
                console.log("catch", res);
                });
            },
    },    

    directives: {
    },

    components: {
    
    },
};
</script>

<style lang="scss" scoped>
    .main-user-container {
        max-width: 500px;
        max-height: 500px;
        background: #fee575;
        margin: 0 auto;
        margin-top:100px;

        .img-container {
            
            margin: 0 auto;

            .user-img {
                width: 150px;
                height: 150px;
                border-radius: 50%;
                margin: 20px;
                object-fit: cover;
            }
        }

        
        .slide-left-leave-active,
        .slide-left-enter-active {
            transition: all 1s ease;
        }
        .slide-left-enter {
            transform: translate(-200%, 0);
            opacity: 0;
        }
        .slide-left-leave-to {
            transform: translate(-200%, 0);
            opacity: 0;
        }

        
        .slide-right-leave-active,
        .slide-right-enter-active {
            transition: 1s;
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
            .transition-content {
                background-color: aqua;
                width: 100%;
                
            }
            .content {
                width: 100%;
                border: 1px solid gray;
            }
            
            
        }

    }


</style>

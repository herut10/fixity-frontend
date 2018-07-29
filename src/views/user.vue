
<template>
    <section v-if = "user" class="main-user-container flex column">
        <button @click="openWidget" id="upload_widget_opener">Upload Picture</button>
        <div class="img-container"><img class="user-img" :src="user.imgUrl"/></div>
        <h1>{{user.username}}</h1>
        <div><button :disabled="!toggle" @click="toggleBtn">User Reports</button>
        <button :disabled="toggle" @click="toggleBtn">User Comments</button></div>
        
        <div class="user-info flex">
        <transition name="slide-left" >
        <span   v-if ="toggle">reports content</span>
        </transition>
        <transition name="slide-right">
        <span   v-if ="!toggle">comments content</span>
        </transition>
        </div>
        
        
    </section>
</template>

<script>
// import { GET_ISSUE_BY_ID } from '@/store/issueModule.js';
import { LOAD_ISSUES } from '@/store/issueModule.js';
import { GET_USER } from '@/store/userModule.js';
import { GET_COMMENTS } from '@/store/commentModule.js';
// import { Carousel, Slide } from 'vue-carousel';

export default {

    data() {
        return {
        toggle:false,
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
            this.toggle = (this.toggle)? false : true;
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
            cloudinary.openUploadWidget({
                cloud_name: "djewvb6ty",
                upload_preset: "qtz1qjeq",
                sources: ["local"]
                },
                function(error, result) {
                console.log(error, result);
                }   
            );
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
        background: lightgreen;
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
                // object-position: center right;
            }
        }

        
        .slide-left-leave-active,
        .slide-left-enter-active {
            position: relative;
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
            position: relative;
            transition: 1s;
        }
        .slide-right-enter {
            transform: translate(200%, 0);
            opacity: 0;
        }
        .slide-right-leave-to {
            transform: translate(200%, 0);
            opacity: 0;
        }

        .user-info {
            justify-content: center;
        }

    }


</style>

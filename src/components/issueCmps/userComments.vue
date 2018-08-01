
<template>
    <section v-if="comments" style="width:100%">
        <div class="comment-container flex" v-for="comment in comments" :key="comment._id">
            <div class="issue-img-container"
            :style="{backgroundImage: `url('${comment.issue[0].imgUrls[0]}')`}"></div>
            <div class="issue-content flex column">
                <H3>{{comment.issue[0].title}}</H3>
                <div>{{comment.txt}}</div>
            </div>
        </div>
    </section>
</template>

<script>
import { GET_ISSUE_BY_ID } from "@/store/issueModule.js";
import { LOAD_ISSUES } from "@/store/issueModule.js";

export default {
    name: "userComments",
    props: ["userComments"],

    data() {
        return {
            comments:null,
        };
    },
    created() {
        this.$store.dispatch({type:LOAD_ISSUES, getBy:{}}) 
            .then(issues => {
                this.getComments(issues);
            }).catch(err=> console.warn(err));  
        
        
    },

    methods: {
        getComments(issues) {
            var comments = JSON.parse(JSON.stringify(this.userComments));
            this.comments = comments.map(comment => {
                var issue = issues.filter(issue=>issue._id === comment.issueId);
                if(issue) {
                    comment.issue = issue;
                    return comment;
                }    
            }); 
        }
    }
};
</script>

<style lang="scss" scoped>
    .comment-container {
        border: 1px solid gray;
        min-height: 45px;
        margin-bottom: 3px;
        cursor: pointer;

        .issue-img-container {
            background-position: center center;
            background-size: cover;
            background-repeat: no-repeat;
            min-width: 17%;
        }
        .issue-content {
            padding: 0 7px;
        }
    }
</style>


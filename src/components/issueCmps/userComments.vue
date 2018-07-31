
<template>
    <section v-if="issue">
        <div class="comment-container flex" >
            <div class="issue-img-container"
            :style="{backgroundImage: `url('${issue.imgUrls[0]}')`}"></div>
            <div class="issue-content flex column">
                <H3>{{issue.title}}</H3>
                <div>{{comment.txt}}</div>
            </div>
        </div>
    </section>
</template>

<script>
import { GET_ISSUE_BY_ID } from "@/store/issueModule.js";

export default {
    name: "userComments",
    props: ["comment"],

    data() {
        return {
            issue:null,
        };
    },
    created() {
        this.$store.dispatch({type:GET_ISSUE_BY_ID, issueId:this.comment.issueId})
            .then(issue=> {
                this.issue = issue;
            }).catch(err =>console.warn(err));
    },
};
</script>

<style lang="scss" scoped>
    .comment-container {
        border: 1px solid gray;
        margin-bottom: 3px;
        cursor: pointer;

        .issue-img-container {
            background-position: center center;
            background-size: cover;
            background-repeat: no-repeat;
            min-width: 20%;
        }
        .issue-content {
            padding: 0 7px;
        }
    }
</style>


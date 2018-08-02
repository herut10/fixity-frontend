
<template>
    <section v-if="userIssues" style="width:100%">
        <div class="issue-container flex" v-for="issue in userIssues" :key="issue._id"
        @click="routeToIssue(issue._id)">
            <div class="issue-img-container" 
            :style="{backgroundImage: `url('${issue.imgUrls[0]}')`}"></div>
            <div class="issue-content flex column">
                <H3>{{issue.title}}</H3>
                <div>{{issue.desc}}</div>
            </div>
        </div>
    </section>
</template>

<script>

export default {
    name: "userIssues",
    props: ["userIssues"],

    data() {
        return {
        };
    },
    created () {
    },
    methods: {
        routeToIssue(issueId) {
            this.$router.push(`/issue/${issueId}`);
        }  
    }
};
</script>

<style lang="scss" scoped>
    .issue-container {
        width: 90%;
        border: 1.5px solid #69c8a4;
        min-height: 70px;
        border-radius: 8px;
        margin: 0 5% 3px 5%;
        cursor: pointer;

        .issue-img-container {
            background-position: center center;
            background-size: cover;
            background-repeat: no-repeat;
            min-width: 17%;
            border-radius: 6px 0 0 8px;
        }
        .issue-content {
            padding: 7px 7px;
            font-size: 0.8em;
            h3 {
            font-size: 1em;
            text-transform: capitalize;
            }
        }
    }
</style>

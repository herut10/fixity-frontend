
<template>
    <section v-if="userIssues">
        <div class="issue-container flex" v-for="issue in userIssues" :key="issue._id">
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
    }
};
</script>

<style lang="scss" scoped>
    .issue-container {
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

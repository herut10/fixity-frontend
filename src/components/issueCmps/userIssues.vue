
<template>
    <section v-if="userIssues" style="width:100%">
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
        width: 100%;
        min-height: 45px;
        border: 1px solid gray;
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

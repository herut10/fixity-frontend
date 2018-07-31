
<template>
    <section v-if="issue">
        <div class="issue-container flex">
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
    props: ["issue"],

    data() {
        return {
        issues: null
        };
    },
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

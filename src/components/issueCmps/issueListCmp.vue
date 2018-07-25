<template>
    <section class="issue-list">
        <ul class="clean-list flex flex-wrap">
            <li v-for="issue in issues" :key="issue._id" class="issue">
                <issue-preview-cmp :issue="issue"></issue-preview-cmp>
            </li>
        </ul>
    </section>
</template>

<script>
import issuePreviewCmp from './issuePreviewCmp.vue';

export default {
    name: 'issueList',

    props: {
        issues: {
            type: Array
        }
    },

    components: {
        issuePreviewCmp
    }
}
</script>

<style scoped>

</style>

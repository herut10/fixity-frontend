<template>
    <section class="issue-list">
        <ul>
            <li v-for="issue in issues" :key="issue._id">
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

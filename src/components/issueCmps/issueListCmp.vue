<template>
    <section class="issue-list">
        <ul class="clean-list flex column align-center flex-wrap">
            <li v-for="issue in issues" :key="issue._id" class="issue">
                <issue-preview-cmp v-if="mapLoaded" :issue="issue"></issue-preview-cmp>
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
        },
        mapLoaded: null
    },

    components: {
        issuePreviewCmp
    }
}
</script>

<style scoped>

</style>

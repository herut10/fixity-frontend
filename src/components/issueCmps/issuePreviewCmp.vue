<template>
    <section class="issue-preview">
        {{issue}}
    </section>
</template>

<script>
export default {
    name: 'issuePreview',

    props: {
        issue: {
            type: Object
        }
    }
}
</script>

<style scoped>

</style>

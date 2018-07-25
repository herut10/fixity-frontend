<template>
    <section class="issue-preview">
        {{issue.title}}
        <carousel :perPage="1">
            <slide>
                <img :src="issue.imgUrls[0]" />
            </slide>
            <slide>
                <img :src="issue.imgUrls[0]" />
            </slide>
        </carousel>
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
};
</script>

<style scoped>
</style>

<template>
    <section class="issue-preview flex column space-between">
        <h2>{{issue.title}}</h2>
        <h4>{{issue.category}}</h4>

        <carousel :perPage="1" :autoplay="true" :autoplayTimeout="1500" :paginationEnabled="false">
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

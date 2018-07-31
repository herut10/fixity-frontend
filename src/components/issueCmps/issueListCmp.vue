<template>
    <section class="issue-list">
        <ul class="clean-list">
        <!-- <ul class="clean-list flex column align-center flex-wrap"> -->
            <li v-for="issue in issues" :key="issue._id" class="issue">
                <router-link :to="`/issue/${issue._id}`">
                    <issue-preview-cmp v-if="mapLoaded" :issue="issue"></issue-preview-cmp>
                </router-link>
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
};
</script>

<style lang="scss" scoped>
// @media (min-width: 547px) {
//   .issue-list {
//     ul {
//       flex-direction: row;
//       justify-content: space-evenly;
//     }

//     .issue {
//       width: 35vw;
//       min-width: 220px;
//       max-width: 355px;
//     }
//   }
// }

// @media (min-width: 589px) {
//   .issue-list {
//     li.issue {
//       margin: 0 20px 40px;
//     }
//   }
// }

ul {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 30px;
  margin-top: 0;
}

.issue {
  // background-color: #f8d843;
  // background-color: #f4efe2;
  // border: 7px solid #c5c0b5;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.4);
  // box-shadow: -2px 2px #7e7e7e;
  // width: 100%;
  height: 440px;
  // margin: 0 10px 30px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
}
</style>

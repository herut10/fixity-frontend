
<template>
    <section>
    
    </section>
</template>

<script>
// import helloWorld from '@/components/helloWorld.vue';
import { GET_ISSUE_BY_ID } from '@/store/issueModule.js';
// import issueListCmp from '@/components/issueCmps/issueListCmp.vue';

export default {
    name: 'home',

    data() {
        return {
            issue:null,
        }
    },    

    created () {
        let issueId = this.$route.params.issueId;
        this.issue = this.$store.dispatch({type:GET_ISSUE_BY_ID, issueId})
    },

    computed: {
        
    },

    components: {
    // helloWorld,
    // issueListCmp
    }
};
</script>

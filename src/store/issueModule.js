'use strict';

export default {
    state: {
        issues: [{ txt: 'issue1' }, { txt: 'issue2' }, { txt: 'issue3' }]
    },

    mutations: {
        setIssues(state, { issues }) {
            state.issues = issues;
        }
    },

    getters: {
        issuesToDisplay(state) {
            return state.issues;
        }
    },

    actions: {

    }
}
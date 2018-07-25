'use strict';

import issueService from '../services/issueService.js';

export const SET_ISSUES = 'issue/mutations/setIssues';
export const LOAD_ISSUES = 'issue/actions/loadIssues';
export const ISSUES_TO_DISPLAY = 'issue/getters/issuesToDisplay';
export const GET_ISSUE_BY_ID = 'issue/action/getIssueById';
export const MARKERS_TO_DISPLAY = 'issue/getters/markersToDisplay';

export default {
    state: {
        // issues: [{ txt: 'issue1' }, { txt: 'issue2' }, { txt: 'issue3' }]
        issues: []
    },

    mutations: {
        [SET_ISSUES](state, { issues }) {
            state.issues = issues;
        }
    },

    getters: {
        [ISSUES_TO_DISPLAY](state) {
            return state.issues;
        },
        [MARKERS_TO_DISPLAY](state) {
            console.log(state);
            
            return state.issues.map(state => {
                return {
                    position: { ...state.loc
                    }
                }
            })
        }
    },

    actions: {
        [LOAD_ISSUES](context, payload) {
            return issueService.query()
                .then(issues => {
                    context.commit({ type: SET_ISSUES, issues })
                })
        },

        [GET_ISSUE_BY_ID](context, issueId) {
                console.log(issueId);
                
        },
    }
}
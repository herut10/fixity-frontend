'use strict';

import issueService from '../services/issueService.js';

export const SET_ISSUES = 'issue/mutations/setIssues';

export const ISSUES_TO_DISPLAY = 'issue/getters/issuesToDisplay';
export const MARKERS_TO_DISPLAY = 'issue/getters/markersToDisplay';
export const ISSUES_VIEW = 'issue/getters/issuesView';

export const LOAD_ISSUES = 'issue/actions/loadIssues';
export const GET_ISSUE_BY_ID = 'issue/actions/getIssueById';
export const UPDATE_ISSUE = 'issue/actions/updateIssue';

export default {
    state: {
        issues: [],
        issuesView: 'list'
    },

    mutations: {
        [SET_ISSUES](state, { issues }) {
            state.issues = issues;
        },

        [UPDATE_ISSUE](state, { updatedIssue }) {
            var issueIdx = state.issues.findIndex(issue => issue._id === updatedIssue._id);
            state.issues.splice(issueIdx, 1, updatedIssue);
        },

        setIssuesView(state, payload) {
            state.issuesView = 'list';
        }
    },

    getters: {
        [ISSUES_TO_DISPLAY](state) {
            return state.issues;
        },
        
        [MARKERS_TO_DISPLAY](state) {
            // console.log(state);

            return state.issues.map(state => {
                return {
                    position: {
                        ...state.loc
                    }
                }
            })
        },
        
        [ISSUES_VIEW](state) {    
            return state.issuesView;
        }
    },

    actions: {
        [LOAD_ISSUES](context, {getBy}) {
            return issueService.query(getBy)
                .then(issues => {
                    context.commit({ type: SET_ISSUES, issues })
                    return issues;
                })
        },

        [GET_ISSUE_BY_ID](context, { issueId }) {
            return issueService.getIssueById(issueId)
                .then(issue => issue)
        },

        [UPDATE_ISSUE](context, { issueId, updatedIssue }) {
            return issueService.updateIssue(issueId, updatedIssue)
                .then(updatedIssue => {
                    context.commit({ type: UPDATE_ISSUE, updatedIssue })
                })
        }
    }
}
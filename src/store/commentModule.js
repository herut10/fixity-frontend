'use strict';

import commentService from '../services/commentService.js';

export const GET_COMMENTS = 'comments/action/getComments'
export const ADD_COMMENT = 'comment/action/addComment'
export const SET_COMMENTS = 'comments/mutations/setComments'
export const SET_COMMENT = 'comment/mutations/setComment'
export const LOAD_COMMENTS = 'comment/getters/loadComments'
export default {
    state: {
        comments: []
    },

    mutations: {
        [SET_COMMENTS](state, {comments}) {
            state.comments = comments;
        },
        [SET_COMMENT](state, {comment}) {
            state.comments.push(comment);
        },
    },

    getters: {
        [LOAD_COMMENTS](state) {
            return state.comments;
        }
    },

    actions: {
        [GET_COMMENTS](context, {issueId}) {
            return commentService.getComments(issueId)
                .then(comments => {
                    context.commit({ type: SET_COMMENTS, comments });
                    return comments
                })
                .catch((err) => {console.warn(err)
                });
        },

        [ADD_COMMENT](context, {comment}) {
            return commentService.addComment(comment)
                .then(comment => {
                    context.commit({ type: SET_COMMENT, comment });
                    return comment;
                }).catch(err=> console.warn(err))    
        }    
            

    }
}
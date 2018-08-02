'use strict';

import commentService from '../services/commentService.js';

export const GET_COMMENTS = 'comments/action/getComments'
export const ADD_COMMENT = 'message/action/addComment'
export const DELETE_COMMENTS = 'comments/action/deleteComments'
export const SET_COMMENTS = 'comments/mutations/setComments'
export const SET_COMMENT = 'message/mutations/setComment'
export const LOAD_COMMENTS = 'message/getters/loadComments'
export default {
    state: {
        comments: []
    },

    mutations: {
        [SET_COMMENTS](state, { comments }) {
            state.comments = comments;
        },
        [SET_COMMENT](state, { message }) {
            state.comments.push(message);
        },
    },

    getters: {
        [LOAD_COMMENTS](state) {
            return state.comments;
        }
    },

    actions: {
        [GET_COMMENTS](context, { getBy }) {
            return commentService.getComments(getBy)
                .then(comments => {
                    context.commit({ type: SET_COMMENTS, comments });
                    return comments
                })
                .catch((err) => {
                    console.warn(err)
                });
        },

        [ADD_COMMENT](context, { payload }) {
            return commentService.addComment(payload.message)
                .then(message => {
                    message.commenter = payload.commenter;
                    context.commit({ type: SET_COMMENT, message });
                    return message;
                }).catch(err => console.warn(err))
        },
        [DELETE_COMMENTS](context, {deleteBy}) {
            return commentService.deleteComments(deleteBy)
                .then(deleteBy => {
                    var comments = context.getters[LOAD_COMMENTS]; 
                    comments = (deleteBy._id)? 
                    comments.filter(comment => comment._id !== deleteBy._id):[];
                    context.commit({type:SET_COMMENTS, comments})  
                }).catch(err => console.warn(err))
        }
    }
}
'use strict';

import axios from 'axios';

const COMMENT_URL = (process.env.NODE_ENV !== 'development') ? '/comment' : 'http://localhost:3000/comment';

function getComments(getBy) {
    return axios.get(`${COMMENT_URL}`, {params:{getBy}})
        .then(res=> res.data)
        .catch(err=> console.warn(err))
};

function addComment(commentInfo) {
    return axios.post(`${COMMENT_URL}`,commentInfo)
        .then(res => res.data)
        .catch(err=>console.warn(err))
};

function deleteComments(deleteBy) {
    return axios.delete(`${COMMENT_URL}`,{params:{deleteBy}} )
        .then(()=> deleteBy)
        .catch(err => console.warn(err));
}

export default {
    addComment,
    getComments,
    deleteComments,
}
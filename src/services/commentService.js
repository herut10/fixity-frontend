'use strict';

import axios from 'axios';

const ISSUE_URL = (process.env.NODE_ENV !== 'development') ? '/issue' : 'http://localhost:3000/comment';

function getComments(getBy) {
    return axios.get(`${ISSUE_URL}`, {params:{getBy}})
        .then(res=> res.data)
        .catch(err=> console.warn(err))
};

function addComment(commentInfo) {
    return axios.post(`${ISSUE_URL}`,commentInfo)
        .then(res => res.data)
        .catch(err=>console.warn(err))
};

function deleteComments(deleteBy) {
    return axios.delete(`${ISSUE_URL}`,{params:{deleteBy}} )
        .then(()=> deleteBy)
        .catch(err => console.warn(err));
}

export default {
    addComment,
    getComments,
    deleteComments,
}
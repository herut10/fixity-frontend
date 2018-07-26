'use strict';

import axios from 'axios';

const ISSUE_URL = (process.env.NODE_ENV !== 'development') ? '/issue' : 'http://localhost:3000/comment';

function getComments(issueId) {
    return axios.get(`${ISSUE_URL}/${issueId}`)
        .then(res=> {
            console.log(res.data);
            return res.data
            
            

        } )
        .catch(err=> console.warn(err))
        
};

function addComment(commentInfo) {
    return axios.post(`${ISSUE_URL}`,commentInfo)
        .then(res => res.data)
        .catch(err=>console.warn(err))
}

export default {
    addComment,
    getComments,
}
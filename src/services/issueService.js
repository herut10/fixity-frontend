'use strict';

import axios from 'axios';
import { futimesSync } from 'fs';

const ISSUE_URL = (process.env.NODE_ENV !== 'development') ? '/issue' : 'http://localhost:3000/issue';

function query() {
    return axios.get(ISSUE_URL)
        .then(res => res.data)
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}

function getIssueById(issueId) {
    return axios.get(`${ISSUE_URL}/${issueId}`)
        .then(res => res.data)
        .catch(err => console.warn(err))
}

function updateIssue(issueId, updatedIssue) {
    return axios.put(`${ISSUE_URL}/${issueId}`, updatedIssue)
        .then(res => res.data)
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}

export default {
    query,
    getIssueById,
    updateIssue
}
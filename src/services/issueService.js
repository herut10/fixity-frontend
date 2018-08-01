'use strict';

import axios from 'axios';
import {
    futimesSync
} from 'fs';

const ISSUE_URL = (process.env.NODE_ENV !== 'development') ? '/issue' : 'http://localhost:3000/issue';


function addIssue(issue) {
    return axios.post(`${ISSUE_URL}`, issue)
        .then(res => res.data)
        .catch(err => console.warn(err))
}



function query(getBy) {
    return axios.get(ISSUE_URL, { params: { getBy } })
        .then(res => res.data)
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        });
}

function getIssueById(issueId) {
    return axios.get(`${ISSUE_URL}/${issueId}`)
        .then(res => res.data)
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        });
}

function updateIssue(issueId, updatedIssue) {
    return axios.put(`${ISSUE_URL}/${issueId}`, updatedIssue)
        .then(res => res.data)
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}

function deleteIssue(issueId) {
    return axios.delete(`${ISSUE_URL}/${issueId}`)
        .then(() => issueId)
        .catch(err => console.warn(err))
}

export default {
    query,
    getIssueById,
    updateIssue,
    addIssue,
    deleteIssue,
}
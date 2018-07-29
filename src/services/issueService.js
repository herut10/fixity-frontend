'use strict';

import axios from 'axios';
import { futimesSync } from 'fs';

const ISSUE_URL = (process.env.NODE_ENV !== 'development') ? '/issue' : 'http://localhost:3000/issue';

function query(getBy) {
    return axios.get(ISSUE_URL, { params: {getBy}})
        .then(res => res.data)
        .catch(err => console.warn(err));
}

function getIssueById(issueId) {
    return axios.get(`${ISSUE_URL}/${issueId}`)
        .then(res=> res.data)
        .catch(err=> console.warn(err))
}

export default {
    query,
    getIssueById,
}
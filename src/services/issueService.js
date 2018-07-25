'use strict';

import axios from 'axios';

const ISSUE_URL = (process.env.NODE_ENV !== 'development') ? '/issue' : 'http://localhost:3000/issue';

function query() {
    return axios.get(ISSUE_URL)
        .then(res => res.data)
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}

export default {
    query
}
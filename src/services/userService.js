'use strict';

import axios from 'axios';

const ISSUE_URL = (process.env.NODE_ENV !== 'development') ? '/user' : 'http://localhost:3000/issue';

function updateUser(user) {
    return axios.put(`${ISSUE_URL}/${user._id}`, user)
        .then(res=>res.data)
        .catch(err=>console.warn(err))
}

export default {
    updateUser,
}
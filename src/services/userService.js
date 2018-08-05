'use strict';

import axios from 'axios';

const USER_URL = (process.env.NODE_ENV !== 'development') ? '/user' : 'http://localhost:3000/user';

function updateUser(user) {
    return axios.put(`${USER_URL}/${user._id}`, user)
        .then(res => res.data)
        .catch(err => console.warn(err))
}

function login(user) {
    return axios.put(`${USER_URL}`, user)
        .then(res => res.data)
        .catch(err => console.warn(err))
}
function registerUser(user) {
    // console.log('now in user service');
    return axios.post(`${USER_URL}`, user)
        .then(res => res.data)
        .catch(err => console.warn(err))
}

export default {
    updateUser,
    registerUser,
    login,
}
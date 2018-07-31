'use strict';
import userService from '../services/userService.js';

export const SET_CURRLOC = 'user/mutations/setCurrLoc';
export const SET_USER = 'user/mutations/setUser';

export const USER = 'user/getters/getUser';
export const CURRLOC = 'user/getters/getCurrLoc';

export const LOAD_CURRLOC = 'user/actions/loadCurrLoc';
export const UPDATE_USER = 'user/action/getCurrLoc';

export default {
    state: {
        user: {
            "_id": "5b58233fcdbd016cc0b475f8",
            "username": "notAdmin",
            "password": "passworddd",
            "imgUrl": "http://images.maariv.co.il/image/upload/f_auto,fl_lossy/t_ArticleControlMaarivTransformaionFaceDetect/443871",
            "isAdmin": false,
            "likes": [
                {
                    "issueId": "5b586f5d375dd438bca4205b",
                    "likeType": "likeAngry"
                }
            ]
        },
        currLoc: null
    },

    mutations: {
        [SET_CURRLOC](state, {
            currLoc
        }) {
            state.currLoc = JSON.parse(JSON.stringify(currLoc))
        },
        [SET_USER](state, { user }) {
            state.user = user;
        }
    },

    getters: {
        [USER](state) {
            return state.user;
        },
        [CURRLOC](state) {
            return JSON.parse(JSON.stringify(state.currLoc))
        }

    },

    actions: {
        [LOAD_CURRLOC](context) {
            return new Promise((resolve, reject) => {
                navigator.geolocation.watchPosition(resolve, reject)
            })
                .then(res => {
                    var coords = res.coords;

                    context.commit({
                        type: SET_CURRLOC,
                        currLoc: {
                            lat: coords.latitude,
                            lng: coords.longitude
                        }
                    })
                    return coords;
                })
        },
        [UPDATE_USER](contex, { user }) {
            return userService.updateUser(user)
                .then(user => {
                    contex.commit({ type: SET_USER, user })
                })
                .catch(err => console.warn(err));
        },

    }
}
'use strict';
import userService from '../services/userService.js';

export const SET_CURRLOC = 'user/mutations/setCurrLoc';
export const SET_USER = 'user/mutations/setUser';
export const SET_HASBEENPROMPTED = 'user/mutations/setHasBeenPrompted';

export const USER = 'user/getters/getUser';
export const CURRLOC = 'user/getters/getCurrLoc';
export const HASBEENPROMPTED = 'user/getters/getHasBeenPrompted';

export const LOAD_CURRLOC = 'user/actions/loadCurrLoc';
export const UPDATE_USER = 'user/actions/getCurrLoc';
export const SIGNUP = 'user/actions/signup';
export const LOGIN = 'user/actions/login';


export default {
    state: {
        user: null,
        // {
        //     "_id": "5b58233fcdbd016cc0b475f8",
        //     "username": "notAdmin",
        //     "password": "passworddd",
        //     "imgUrl": "http://images.maariv.co.il/image/upload/f_auto,fl_lossy/t_ArticleControlMaarivTransformaionFaceDetect/443871",
        //     "isAdmin": true,
        //     "likes": [{
        //         "issueId": "5b586f5d375dd438bca4205b",
        //         "likeType": "likeAngry"
        //     }]
        // },
        currLoc: null,
        hasBeenPrompted: false
    },

    mutations: {
        [SET_CURRLOC](state, {
            currLoc
        }) {
            state.currLoc = JSON.parse(JSON.stringify(currLoc))
        },
        [SET_USER](state, {
            user
        }) {
            state.user = user;
        },
        [SET_HASBEENPROMPTED](state) {
            state.hasBeenPrompted = !state.hasBeenPrompted
        }
    },

    getters: {
        [HASBEENPROMPTED](state) {
            return state.hasBeenPrompted
        },
        [USER](state) {
            return state.user;
        },
        [CURRLOC](state) {
            return JSON.parse(JSON.stringify(state.currLoc))
        },


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
        [UPDATE_USER](context, {
            user
        }) {

            return userService.updateUser(user)
                .then(user => {
                    user.imgUrl = user.imgUrl[0];
                    context.commit({
                        type: SET_USER,
                        user
                    })
                })
                .catch(err => console.warn(err));
        },
        [SIGNUP](context, {
            user
        }) {
            // console.log('now in actions');

            user.imgUrl = 'http://via.placeholder.com/150x150'
            user.isAdmin = false
            user.likes = []
            return userService.registerUser(user)
                .then(user => {
                    context.commit({
                        type: SET_USER,
                        user
                    })
                })
                .catch(err => console.warn(err));
        },

    }
}
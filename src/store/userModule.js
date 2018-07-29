'use strict';
import userService from '../services/userService.js';

export const GET_USER = 'user/getters/getUser';
export const LOAD_CURRLOC = 'user/actions/loadCurrLoc';
export const SET_CURRLOC = 'user/mutations/setCurrLoc';
export const GET_CURRLOC = 'user/getters/getCurrLoc';



export default {
    state: {
        user:{
            "_id" : "5b58233fcdbd016cc0b475f8",
            "username" : "notAdmin",
            "password" : "passworddd",
            "imgUrl" : "http://images.maariv.co.il/image/upload/f_auto,fl_lossy/t_ArticleControlMaarivTransformaionFaceDetect/443871",
            "isAdmin" : false
        }
    },

    mutations: {
        [SET_CURRLOC](state, {
            currLoc
        }) {
            
            state.currLoc = currLoc
            console.log(state.currLoc);

        }
    },

    getters: {
        [GET_USER](state) {
            return state.user;
        },
        [GET_CURRLOC](state) {
            return state.currLoc
        }
    },

    actions: {
        [LOAD_CURRLOC](context) {
            return new Promise((resolve, reject) => {
                    navigator.geolocation.watchPosition(resolve, reject)
                })
                .then(res => {
                    context.commit({
                        type: SET_CURRLOC,
                        currLoc: {
                            lat: res.coords.latitude,
                            lng: res.coords.longitude
                        }
                    })
                })
        }

    }
}
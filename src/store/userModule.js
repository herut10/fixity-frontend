'use strict';
import userService from '../services/userService.js';

export const GET_USER = 'user/getters/getUser';


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

    },

    getters: {
        [GET_USER](state) {
            return state.user;
        }
    },

    actions: {

    }
}
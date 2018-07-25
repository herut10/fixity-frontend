'use strict';


export const MARKERS_TO_DISPLAY = 'issue/getters/issuesToDisplay';

export default {

    getters: {
        [MARKERS_TO_DISPLAY](state) {
            return state.issues.map(state => {
                return {
                    position: { ...state.loc}
                }
            })


        }
    },
}
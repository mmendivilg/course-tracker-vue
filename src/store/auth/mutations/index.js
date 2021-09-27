import {Mutation} from "../types";

export default {
    [Mutation.LOGIN](state, payload) {
        state.status = 'success'
        state.user = payload.user.user
        state.user_name = payload.user.name
        state.token = payload.token
    },
    [Mutation.LOGOUT](state) {
        state.status = ''
        state.user = ''
        state.user_name = ''
        state.token = ''
    },
    [Mutation.AUTH_REQUEST](state) {
        state.status = 'loading'
    },
    [Mutation.AUTH_ERROR](state) {
        state.status = 'error'
    }
}
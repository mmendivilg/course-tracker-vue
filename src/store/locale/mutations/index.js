import {Mutation} from "../types";

export default {
    [Mutation.LOCALE](state, locale) {
        state.locale = locale
    }
}
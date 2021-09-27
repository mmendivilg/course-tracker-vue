import {Mutation} from "../types";

export default {
    [Mutation.DRAWER](state, drawer) {
        state.drawer = drawer
    },
    [Mutation.SETTINGS_DRAWER](state, settings_drawer) {
        state.settings_drawer = settings_drawer
    },
}
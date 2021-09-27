import {Mutation} from "../types";

export default {
    [Mutation.DC3_DIALOG](state, dc3_dialog) {
        state.dc3_dialog = dc3_dialog
    }
}
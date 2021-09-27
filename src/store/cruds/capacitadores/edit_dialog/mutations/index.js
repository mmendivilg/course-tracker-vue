import {Mutation} from "../types";

export default {
    [Mutation.CAPACITADORES_EDIT_DIALOG](state, edit_dialog) {
        state.capacitadores_edit_dialog = edit_dialog
    }
}
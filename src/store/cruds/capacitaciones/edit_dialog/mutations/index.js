import {Mutation} from "../types";

export default {
    [Mutation.CAPACITACIONES_EDIT_DIALOG](state, edit_dialog) {
        state.capacitaciones_edit_dialog = edit_dialog
    }
}
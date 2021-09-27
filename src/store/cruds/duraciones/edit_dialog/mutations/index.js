import {Mutation} from "../types";

export default {
    [Mutation.DURACIONES_EDIT_DIALOG](state, edit_dialog) {
        state.duraciones_edit_dialog = edit_dialog
    }
}
import {Mutation} from "../types";

export default {
    [Mutation.CURSOS_EDIT_DIALOG](state, edit_dialog) {
        state.cursos_edit_dialog = edit_dialog
    }
}
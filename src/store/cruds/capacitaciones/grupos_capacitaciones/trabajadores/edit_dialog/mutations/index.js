import {Mutation} from "../types";

export default {
  [Mutation.TRABAJADORES_EDIT_DIALOG](state, edit_dialog) {
    state.trabajadores_edit_dialog = edit_dialog
  },
  [Mutation.GRUPOS_IMPORT_DIALOG](state, edit_dialog) {
    state.grupos_import_dialog = edit_dialog
  }
}
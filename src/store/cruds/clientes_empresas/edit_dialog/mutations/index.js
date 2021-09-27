import {Mutation} from "../types";

export default {
    [Mutation.CLIENTES_EMPRESAS_EDIT_DIALOG](state, edit_dialog) {
        state.clientes_empresas_edit_dialog = edit_dialog
    }
}
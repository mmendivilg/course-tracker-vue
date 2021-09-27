import {Mutation} from "../types";

export default {
    [Mutation.CERTIFICADO_DIALOG](state, dialog) {
        state.certificado_dialog = dialog
    }
}
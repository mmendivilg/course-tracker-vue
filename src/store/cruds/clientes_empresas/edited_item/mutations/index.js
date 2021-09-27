import {Mutation} from "../types";

export default {
    [Mutation.CLIENTES_EMPRESAS_EDITED_ITEM](state, edited_item) {
        state.clientes_empresas_edited_item = edited_item
    },
    [Mutation.CLIENTES_EMPRESAS_IS_NEW_ITEM](state, new_item) {
        state.clientes_empresas_is_new_item = new_item
    }
}
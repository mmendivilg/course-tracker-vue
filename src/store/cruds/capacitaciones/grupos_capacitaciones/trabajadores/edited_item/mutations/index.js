import {Mutation} from "../types";

export default {
    [Mutation.TRABAJADORES_EDITED_ITEM](state, edited_item) {
        state.trabajadores_edited_item = edited_item
    },
    [Mutation.TRABAJADORES_IS_NEW_ITEM](state, new_item) {
        state.trabajadores_is_new_item = new_item
    }
}
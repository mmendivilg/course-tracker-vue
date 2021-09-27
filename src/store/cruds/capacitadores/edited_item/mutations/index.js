import {Mutation} from "../types";

export default {
    [Mutation.CAPACITADORES_EDITED_ITEM](state, edited_item) {
        state.capacitadores_edited_item = edited_item
    },
    [Mutation.CAPACITADORES_IS_NEW_ITEM](state, new_item) {
        state.capacitadores_is_new_item = new_item
    }
}
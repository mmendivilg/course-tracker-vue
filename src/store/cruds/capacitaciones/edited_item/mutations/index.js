import {Mutation} from "../types";

export default {
    [Mutation.CAPACITACIONES_EDITED_ITEM](state, edited_item) {
        state.capacitaciones_edited_item = edited_item
    },
    [Mutation.CAPACITACIONES_IS_NEW_ITEM](state, new_item) {
        state.capacitaciones_is_new_item = new_item
    }
}
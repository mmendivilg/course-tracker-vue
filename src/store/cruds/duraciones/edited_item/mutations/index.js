import {Mutation} from "../types";

export default {
    [Mutation.DURACIONES_EDITED_ITEM](state, edited_item) {
        state.duraciones_edited_item = edited_item
    },
    [Mutation.DURACIONES_IS_NEW_ITEM](state, new_item) {
        state.duraciones_is_new_item = new_item
    }
}
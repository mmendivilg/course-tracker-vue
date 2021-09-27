import {Mutation} from "../types";

export default {
    [Mutation.CURSOS_EDITED_ITEM](state, edited_item) {
        state.cursos_edited_item = edited_item
    },
    [Mutation.CURSOS_IS_NEW_ITEM](state, new_item) {
        state.cursos_is_new_item = new_item
    }
}
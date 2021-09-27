import {Action, Mutation} from '../types'

export default {
  [Action.CURSOS_EDITED_ITEM]({commit}, edited_item) {
    commit(`${[Mutation.CURSOS_EDITED_ITEM]}`, edited_item)
  },
  [Action.CURSOS_IS_NEW_ITEM]({commit}, is_new_item) {
    commit(`${[Mutation.CURSOS_IS_NEW_ITEM]}`, is_new_item)
  },
}
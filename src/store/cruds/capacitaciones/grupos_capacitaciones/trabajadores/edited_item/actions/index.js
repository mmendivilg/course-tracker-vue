import {Action, Mutation} from '../types'

export default {
  [Action.TRABAJADORES_EDITED_ITEM]({commit}, edited_item) {
    commit(`${[Mutation.TRABAJADORES_EDITED_ITEM]}`, edited_item)
  },
  [Action.TRABAJADORES_IS_NEW_ITEM]({commit}, is_new_item) {
    commit(`${[Mutation.TRABAJADORES_IS_NEW_ITEM]}`, is_new_item)
  },
}
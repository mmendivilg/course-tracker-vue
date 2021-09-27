import {Action, Mutation} from '../types'

export default {
  [Action.DURACIONES_EDITED_ITEM]({commit}, edited_item) {
    commit(`${[Mutation.DURACIONES_EDITED_ITEM]}`, edited_item)
  },
  [Action.DURACIONES_IS_NEW_ITEM]({commit}, is_new_item) {
    commit(`${[Mutation.DURACIONES_IS_NEW_ITEM]}`, is_new_item)
  },
}
import {Action, Mutation} from '../types'

export default {
  [Action.CAPACITADORES_EDITED_ITEM]({commit}, edited_item) {
    commit(`${[Mutation.CAPACITADORES_EDITED_ITEM]}`, edited_item)
  },
  [Action.CAPACITADORES_IS_NEW_ITEM]({commit}, is_new_item) {
    commit(`${[Mutation.CAPACITADORES_IS_NEW_ITEM]}`, is_new_item)
  },
}
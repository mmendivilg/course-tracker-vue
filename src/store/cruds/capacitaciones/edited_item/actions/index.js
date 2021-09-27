import {Action, Mutation} from '../types'

export default {
  [Action.CAPACITACIONES_EDITED_ITEM]({commit}, edited_item) {
    commit(`${[Mutation.CAPACITACIONES_EDITED_ITEM]}`, edited_item)
  },
  [Action.CAPACITACIONES_IS_NEW_ITEM]({commit}, is_new_item) {
    commit(`${[Mutation.CAPACITACIONES_IS_NEW_ITEM]}`, is_new_item)
  },
}
import {Action, Mutation} from '../types'

export default {
  [Action.CAPACITACIONES_EDIT_DIALOG]({commit}, edit_dialog) {
    commit(`${[Mutation.CAPACITACIONES_EDIT_DIALOG]}`, edit_dialog)
  },
}
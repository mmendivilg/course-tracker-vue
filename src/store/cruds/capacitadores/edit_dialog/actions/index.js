import {Action, Mutation} from '../types'

export default {
  [Action.CAPACITADORES_EDIT_DIALOG]({commit}, edit_dialog) {
    commit(`${[Mutation.CAPACITADORES_EDIT_DIALOG]}`, edit_dialog)
  },
}
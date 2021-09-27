import {Action, Mutation} from '../types'

export default {
  [Action.DURACIONES_EDIT_DIALOG]({commit}, edit_dialog) {
    commit(`${[Mutation.DURACIONES_EDIT_DIALOG]}`, edit_dialog)
  },
}
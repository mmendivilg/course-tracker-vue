import {Action, Mutation} from '../types'

export default {
  [Action.TRABAJADORES_EDIT_DIALOG]({commit}, edit_dialog) {
    commit(`${[Mutation.TRABAJADORES_EDIT_DIALOG]}`, edit_dialog)
  },
  [Action.GRUPOS_IMPORT_DIALOG]({commit}, edit_dialog) {
    commit(`${[Mutation.GRUPOS_IMPORT_DIALOG]}`, edit_dialog)
  },
}